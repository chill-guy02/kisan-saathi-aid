/**
 * DEMO DATA — single source of mock data for the prototype.
 *
 * Replace each export below with a real API call later:
 *  - farmerProfile  -> user/profile endpoint (or Lovable Cloud table)
 *  - weatherDemo    -> IMD / OpenWeather forecast API
 *  - marketDemo     -> Agmarknet / eNAM mandi price API
 *  - cropCosts      -> agri-cost dataset / backend config table
 */

export type Crop = "Wheat" | "Rice" | "Soybean";

export const farmerProfile = {
  name: "Ramesh",
  nameHi: "रमेश",
  location: "Raipur",
  locationHi: "रायपुर",
  crop: "Wheat" as Crop,
  cropHi: "गेहूं",
  landAcres: 3,
};

export const weatherDemo = {
  temperatureC: 31,
  rainProbability: 72,
  rainfallMm: 18,
  humidity: 78,
  interpretationHi: "कल बारिश की संभावना अधिक है।",
};

/** Locations the farmer can choose (used for live weather + mandi). */
export type LocationId = "raipur" | "bhopal" | "nagpur" | "lucknow" | "ludhiana";

export const locations: { id: LocationId; en: string; hi: string; lat: number; lon: number }[] = [
  { id: "raipur", en: "Raipur", hi: "रायपुर", lat: 21.2514, lon: 81.6296 },
  { id: "bhopal", en: "Bhopal", hi: "भोपाल", lat: 23.2599, lon: 77.4126 },
  { id: "nagpur", en: "Nagpur", hi: "नागपुर", lat: 21.1458, lon: 79.0882 },
  { id: "lucknow", en: "Lucknow", hi: "लखनऊ", lat: 26.8467, lon: 80.9462 },
  { id: "ludhiana", en: "Ludhiana", hi: "लुधियाना", lat: 30.901, lon: 75.8573 },
];

export const getLocation = (id: LocationId) =>
  locations.find((l) => l.id === id) ?? locations[0]!;

/** Per-crop demo mandi prices (₹ / quintal) */
export const marketPrices: Record<Crop, { min: number; max: number; modal: number }> = {
  Wheat: { min: 2250, max: 2400, modal: 2350 },
  Rice: { min: 1950, max: 2200, modal: 2100 },
  Soybean: { min: 4200, max: 4800, modal: 4550 },
};

export const marketDemo = {
  crop: "Wheat",
  cropHi: "गेहूं",
  mandi: "Raipur",
  mandiHi: "रायपुर",
  min: 2250,
  max: 2400,
  modal: 2350,
  unit: "quintal",
};

export const cropLabels: Record<Crop, string> = {
  Wheat: "गेहूं",
  Rice: "धान",
  Soybean: "सोयाबीन",
};

export type CostHead = "seed" | "fertilizer" | "pesticide" | "labour" | "irrigation" | "other";

export const costHeadLabels: Record<CostHead, { hi: string; en: string }> = {
  seed: { hi: "बीज", en: "Seed" },
  fertilizer: { hi: "खाद", en: "Fertilizer" },
  pesticide: { hi: "कीटनाशक", en: "Pesticide" },
  labour: { hi: "मजदूरी", en: "Labour" },
  irrigation: { hi: "सिंचाई", en: "Irrigation" },
  other: { hi: "अन्य", en: "Other" },
};

/** Per-acre demo costs in ₹ */
export const cropCosts: Record<Crop, Record<CostHead, number>> = {
  Wheat: { seed: 1500, fertilizer: 2000, pesticide: 800, labour: 3000, irrigation: 1000, other: 500 },
  Rice: { seed: 1200, fertilizer: 2400, pesticide: 1000, labour: 4000, irrigation: 2000, other: 600 },
  Soybean: { seed: 2500, fertilizer: 1800, pesticide: 1200, labour: 2500, irrigation: 800, other: 500 },
};

export function calculateCost(crop: Crop, acres: number) {
  const per = cropCosts[crop];
  const heads = (Object.keys(per) as CostHead[]).map((h) => ({
    head: h,
    perAcre: per[h],
    total: per[h] * acres,
  }));
  return { heads, total: heads.reduce((s, h) => s + h.total, 0) };
}

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
