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
