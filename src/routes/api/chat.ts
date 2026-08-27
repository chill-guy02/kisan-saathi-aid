import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import {
  calculateCost,
  cropLabels,
  farmerProfile,
  formatINR,
  marketPrices,
  type Crop,
} from "@/data/demoData";
import { RAIPUR } from "@/lib/weather";
import {
  bulkProcurement,
  collectiveSales,
  extraRealization,
  QUINTALS_PER_ACRE,
  storageOptions,
  storageSummary,
} from "@/data/collectiveData";

type ChatProfile = {
  name?: string;
  crop?: Crop;
  acres?: number;
  locationHi?: string;
  lat?: number;
  lon?: number;
};

type ChatRequestBody = { messages?: unknown; profile?: ChatProfile };

const cropEnum = z.enum(["Wheat", "Rice", "Soybean"]);

async function getForecast(days: number, lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
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
        const { messages, profile } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);

        const farmer = {
          name: profile?.name || farmerProfile.nameHi,
          crop: (profile?.crop ?? farmerProfile.crop) as Crop,
          acres: profile?.acres ?? farmerProfile.landAcres,
          locationHi: profile?.locationHi || farmerProfile.locationHi,
          lat: profile?.lat ?? RAIPUR.lat,
          lon: profile?.lon ?? RAIPUR.lon,
        };

        const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

        const system = `आप "किसान साथी" हैं — भारतीय किसानों के लिए एक व्यावहारिक कृषि सलाहकार।

नियम:
- हमेशा सरल, बोलचाल की हिंदी में उत्तर दें (जब तक किसान अंग्रेज़ी/अन्य भाषा में न पूछे, तब उसी भाषा में)।
- छोटे उत्तर दें: 2–5 पंक्तियाँ या छोटे bullet points। अंक और ₹ स्पष्ट लिखें।
- मौसम, मंडी भाव या लागत से जुड़ा कोई भी सवाल हो तो पहले उपलब्ध tool चलाएँ, अनुमान न लगाएँ।
- सलाह देते समय कारण बताएँ (जैसे "कल 70% बारिश है, इसलिए आज यूरिया न डालें")।
- अगर जानकारी उपलब्ध न हो तो साफ़ कहें और नज़दीकी कृषि विज्ञान केंद्र से संपर्क करने को कहें।
- कीटनाशक/दवा की सटीक मात्रा बताते समय चेतावनी दें कि लेबल पढ़ें।
- सामूहिक बिक्री / सामूहिक खरीद / सामूहिक भंडारण (किसान समूह) के सवालों पर getCollectiveSale, getCollectiveBuy या getCollectiveStorage tool चलाएँ। किसानों की संख्या, मात्रा, भाव या बचत के आंकड़े कभी खुद से न बनाएँ — केवल tool से मिले आंकड़े इस्तेमाल करें।
- "अभी बेचूं या रुकूं/store करूं" जैसे सवाल पर मंडी भाव, सामूहिक भाव और भंडारण खर्च की तुलना करके आसान सलाह दें।

किसान की जानकारी: नाम ${farmer.name}, स्थान ${farmer.locationHi}, मुख्य फसल ${cropLabels[farmer.crop]}, ज़मीन ${farmer.acres} एकड़।
अगर किसान फसल या एकड़ न बताए तो यही जानकारी इस्तेमाल करें।
आज की तारीख: ${today} (IST)।`;

        const result = streamText({
          model: gateway("google/gemini-3.7-flash"),
          system,
          messages: await convertToModelMessages(messages as UIMessage[]),
          stopWhen: stepCountIs(50),
          tools: {
            getWeather: tool({
              description: `${farmer.locationHi} का असली मौसम पूर्वानुमान (Open-Meteo). आज और आने वाले दिनों का तापमान, बारिश की संभावना, वर्षा और हवा।`,
              inputSchema: z.object({
                days: z.number().describe("कितने दिन का पूर्वानुमान चाहिए (1-7)"),
              }),
              execute: async ({ days }) => {
                const d = Math.min(7, Math.max(1, Math.round(days || 2)));
                return {
                  location: farmer.locationHi,
                  daily: await getForecast(d, farmer.lat, farmer.lon),
                };
              },
            }),
            getMandiPrice: tool({
              description: "नज़दीकी मंडी में फसल का भाव (प्रति क्विंटल). अभी डेमो डेटा।",
              inputSchema: z.object({ crop: cropEnum }),
              execute: async ({ crop }) => {
                const p = marketPrices[crop as Crop];
                return {
                  crop: cropLabels[crop as Crop],
                  mandi: farmer.locationHi,
                  minPerQuintal: p.min,
                  maxPerQuintal: p.max,
                  modalPerQuintal: p.modal,
                  note: "डेमो डेटा (Agmarknet/eNAM API से बदला जाएगा)",
                };
              },
            }),
            getCollectiveSale: tool({
              description:
                "किसान समूह की सामूहिक बिक्री की जानकारी: कितने किसान तैयार हैं, कुल मात्रा, अभी का मंडी भाव और संभावित सामूहिक भाव (डेमो डेटा)।",
              inputSchema: z.object({ crop: cropEnum }),
              execute: async ({ crop }) => {
                const s = collectiveSales[crop as Crop];
                const myQuintals = Math.round(farmer.acres * QUINTALS_PER_ACRE);
                return {
                  crop: s.cropHi,
                  farmerCount: s.farmerCount,
                  combinedLandAcres: s.combinedLandAcres,
                  quantityQuintals: s.quantityQuintals,
                  targetQuintals: s.targetQuintals,
                  currentMarketPricePerQuintal: s.currentMarketPrice,
                  potentialCollectivePricePerQuintal: s.potentialCollectivePrice,
                  yourEstimatedQuintals: myQuintals,
                  yourEstimatedExtraEarning: extraRealization(crop as Crop, myQuintals),
                  note: "डेमो/अनुमानित आंकड़े",
                };
              },
            }),
            getCollectiveBuy: tool({
              description:
                "सामूहिक खरीद (bulk procurement) की जानकारी: खाद/बीज की कुल ज़रूरत, अकेले का भाव, bulk भाव और अनुमानित बचत (डेमो डेटा)।",
              inputSchema: z.object({}),
              execute: async () => ({
                items: bulkProcurement.map((b) => ({
                  input: b.inputHi,
                  farmerCount: b.farmerCount,
                  quantityBags: b.quantityBags,
                  individualPricePerBag: b.individualPrice,
                  estimatedBulkPricePerBag: b.estimatedBulkPrice,
                  savingPerBag: b.individualPrice - b.estimatedBulkPrice,
                })),
                note: "Demo estimate — final price depends on supplier quotation.",
              }),
            }),
            getCollectiveStorage: tool({
              description:
                "सामूहिक भंडारण की जानकारी: उपलब्ध क्षमता, समूह की ज़रूरत, भंडारण खर्च और भंडार विकल्प (डेमो डेटा)।",
              inputSchema: z.object({}),
              execute: async () => ({
                availableCapacityQuintals: storageSummary.availableCapacityQuintals,
                groupRequirementQuintals: storageSummary.groupRequirementQuintals,
                costPerQuintalPerMonth: storageSummary.estimatedCostPerQuintalMonth,
                utilizationPct: storageSummary.utilizationPct,
                options: storageOptions.map((s) => ({
                  name: s.nameHi,
                  capacityQuintals: s.capacityQuintals,
                  distanceKm: s.distanceKm,
                  costPerQuintalPerMonth: s.estimatedCostPerQuintalMonth,
                })),
                note: "डेमो डेटा",
              }),
            }),
            calculateFarmCost: tool({
              description: "फसल और एकड़ के हिसाब से खेती की अनुमानित लागत (बीज, खाद, मजदूरी आदि)।",
              inputSchema: z.object({ crop: cropEnum, acres: z.number() }),
              execute: async ({ crop, acres }) => {
                const a = Math.min(50, Math.max(0.5, acres || farmer.acres));
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
