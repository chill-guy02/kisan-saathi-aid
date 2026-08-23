import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import {
  calculateCost,
  cropLabels,
  farmerProfile,
  formatINR,
  marketDemo,
  type Crop,
} from "@/data/demoData";
import { RAIPUR } from "@/lib/weather";

type ChatRequestBody = { messages?: unknown };

const cropEnum = z.enum(["Wheat", "Rice", "Soybean"]);

async function getForecast(days: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${RAIPUR.lat}&longitude=${RAIPUR.lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max` +
    `&timezone=Asia%2FKolkata&forecast_days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("weather fetch failed");
  const json = (await res.json()) as {
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max: (number | null)[];
      precipitation_sum: number[];
      wind_speed_10m_max: number[];
    };
  };
  return json.daily.time.map((date, i) => ({
    date,
    maxTempC: json.daily.temperature_2m_max[i],
    minTempC: json.daily.temperature_2m_min[i],
    rainProbabilityPct: json.daily.precipitation_probability_max[i] ?? 0,
    rainfallMm: json.daily.precipitation_sum[i] ?? 0,
    windKph: json.daily.wind_speed_10m_max[i],
  }));
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);

        const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

        const system = `आप "किसान साथी" हैं — भारतीय किसानों के लिए एक व्यावहारिक कृषि सलाहकार।

नियम:
- हमेशा सरल, बोलचाल की हिंदी में उत्तर दें (जब तक किसान अंग्रेज़ी/अन्य भाषा में न पूछे, तब उसी भाषा में)।
- छोटे उत्तर दें: 2–5 पंक्तियाँ या छोटे bullet points। अंक और ₹ स्पष्ट लिखें।
- मौसम, मंडी भाव या लागत से जुड़ा कोई भी सवाल हो तो पहले उपलब्ध tool चलाएँ, अनुमान न लगाएँ।
- सलाह देते समय कारण बताएँ (जैसे "कल 70% बारिश है, इसलिए आज यूरिया न डालें")।
- अगर जानकारी उपलब्ध न हो तो साफ़ कहें और नज़दीकी कृषि विज्ञान केंद्र से संपर्क करने को कहें।
- कीटनाशक/दवा की सटीक मात्रा बताते समय चेतावनी दें कि लेबल पढ़ें।

किसान की जानकारी: नाम ${farmerProfile.nameHi}, स्थान ${farmerProfile.locationHi}, मुख्य फसल ${farmerProfile.cropHi}, ज़मीन ${farmerProfile.landAcres} एकड़।
आज की तारीख: ${today} (IST)।`;

        const result = streamText({
          model: gateway("google/gemini-3.7-flash"),
          system,
          messages: await convertToModelMessages(messages as UIMessage[]),
          stopWhen: stepCountIs(50),
          tools: {
            getWeather: tool({
              description:
                "रायपुर का असली मौसम पूर्वानुमान (Open-Meteo). आज और आने वाले दिनों का तापमान, बारिश की संभावना, वर्षा और हवा।",
              inputSchema: z.object({
                days: z.number().describe("कितने दिन का पूर्वानुमान चाहिए (1-7)"),
              }),
              execute: async ({ days }) => {
                const d = Math.min(7, Math.max(1, Math.round(days || 2)));
                return { location: farmerProfile.locationHi, daily: await getForecast(d) };
              },
            }),
            getMandiPrice: tool({
              description: "नज़दीकी मंडी में फसल का भाव (प्रति क्विंटल). अभी डेमो डेटा।",
              inputSchema: z.object({ crop: cropEnum }),
              execute: async ({ crop }) => ({
                crop: cropLabels[crop as Crop],
                mandi: marketDemo.mandiHi,
                minPerQuintal: marketDemo.min,
                maxPerQuintal: marketDemo.max,
                modalPerQuintal: marketDemo.modal,
                note: "डेमो डेटा (Agmarknet/eNAM API से बदला जाएगा)",
              }),
            }),
            calculateFarmCost: tool({
              description: "फसल और एकड़ के हिसाब से खेती की अनुमानित लागत (बीज, खाद, मजदूरी आदि)।",
              inputSchema: z.object({ crop: cropEnum, acres: z.number() }),
              execute: async ({ crop, acres }) => {
                const a = Math.min(50, Math.max(0.5, acres || farmerProfile.landAcres));
                const { heads, total } = calculateCost(crop as Crop, a);
                return {
                  crop: cropLabels[crop as Crop],
                  acres: a,
                  breakdown: heads,
                  total,
                  totalFormatted: formatINR(total),
                };
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (error) => {
            console.error("chat error", error);
            return "क्षमा करें, अभी उत्तर नहीं मिल पाया। कृपया दोबारा कोशिश करें।";
          },
        });
      },
    },
  },
});
