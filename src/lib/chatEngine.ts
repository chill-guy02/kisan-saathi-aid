/**
 * Simple keyword-based intent recognition (prototype).
 * Swap `getAnswer` for an LLM / backend call later — the interface stays the same.
 */
import {
  calculateCost,
  farmerProfile,
  formatINR,
  marketDemo,
  type Crop,
} from "@/data/demoData";
import { currentWeather as weatherDemo } from "@/lib/weather";

export type Intent = "advisory" | "weather" | "market" | "cost" | "unknown";

const has = (t: string, words: string[]) => words.some((w) => t.includes(w));

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  const rain = has(t, ["बारिश", "मौसम", "rain", "weather", "पानी बरस"]);
  const fert = has(t, ["खाद", "यूरिया", "urea", "fertilizer", "डालूं", "डालू"]);
  if (fert && rain) return "advisory";
  if (has(t, ["लागत", "खर्च", "cost", "एकड़", "acre"])) return "cost";
  if (has(t, ["भाव", "दाम", "कीमत", "मंडी", "price", "mandi", "rate"])) return "market";
  if (rain) return "weather";
  if (fert) return "advisory";
  return "unknown";
}

function detectCrop(t: string): Crop {
  if (has(t, ["धान", "चावल", "rice"])) return "Rice";
  if (has(t, ["सोयाबीन", "soybean", "soya"])) return "Soybean";
  return "Wheat";
}

function detectAcres(t: string): number {
  const m = t.match(/(\d+(\.\d+)?)\s*(एकड़|acre)/) ?? t.match(/(\d+(\.\d+)?)/);
  const n = m ? parseFloat(m[1] as string) : farmerProfile.landAcres;
  return Math.min(20, Math.max(1, n));
}

export function getAnswer(question: string): { intent: Intent; text: string } {
  const t = question.toLowerCase();
  const intent = detectIntent(t);

  switch (intent) {
    case "weather":
      return {
        intent,
        text: `कल का मौसम: तापमान ${weatherDemo.temperatureC}°C, बारिश की संभावना ${weatherDemo.rainProbability}%, अनुमानित वर्षा ${weatherDemo.rainfallMm} मिमी, नमी ${weatherDemo.humidity}%. ${weatherDemo.interpretationHi}`,
      };
    case "market":
      return {
        intent,
        text: `${marketDemo.mandiHi} मंडी में ${marketDemo.cropHi} का भाव — न्यूनतम ${formatINR(marketDemo.min)}, अधिकतम ${formatINR(marketDemo.max)}, मॉडल भाव ${formatINR(marketDemo.modal)} प्रति क्विंटल। (डेमो डेटा)`,
      };
    case "cost": {
      const crop = detectCrop(t);
      const acres = detectAcres(t);
      const { total } = calculateCost(crop, acres);
      return {
        intent,
        text: `${acres} एकड़ ${crop === "Wheat" ? "गेहूं" : crop === "Rice" ? "धान" : "सोयाबीन"} की अनुमानित कुल लागत लगभग ${formatINR(total)} होगी। विस्तार से देखने के लिए “खेती की लागत” कार्ड खोलें।`,
      };
    }
    case "advisory":
      return {
        intent,
        text: `कल बारिश की संभावना ${weatherDemo.rainProbability}% है। इसलिए आज यूरिया डालने के बजाय बारिश के बाद डालना बेहतर रहेगा।`,
      };
    default:
      return {
        intent,
        text: "मैं अभी मौसम, मंडी भाव, खेती की लागत और खाद से जुड़े सवालों के जवाब दे सकता हूँ। कृपया इनमें से कुछ पूछें।",
      };
  }
}

export const suggestedQuestionsHi = [
  "कल बारिश होगी क्या?",
  "आज गेहूं का भाव क्या है?",
  "3 एकड़ गेहूं की लागत कितनी होगी?",
  "बारिश आने वाली है, खाद डालूं?",
  "मेरे गांव में और कौन गेहूं बेच रहा है?",
  "खाद सस्ती कैसे मिलेगी?",
  "फसल अभी बेचूं या store करूं?",
];

export const suggestedQuestionsEn = [
  "Will it rain tomorrow?",
  "What is the wheat price today?",
  "What will 3 acres of wheat cost?",
  "Rain is coming — should I apply fertilizer?",
  "Who else is selling wheat nearby?",
  "How can I get cheaper fertilizer?",
  "Should I sell now or store my crop?",
];
