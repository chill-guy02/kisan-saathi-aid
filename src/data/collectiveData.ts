/**
 * DEMO DATA — Kisan Collective (सामूहिक कार्य) module.
 *
 * All numbers below are DEMO / ESTIMATED values for the prototype.
 * Replace later with:
 *  - collectiveSales   -> FPO / aggregation backend table
 *  - bulkProcurement   -> input supplier quotation API
 *  - storageOptions    -> warehouse (WDRA / private godown) API
 */

import type { Crop } from "./demoData";

export type CollectiveSale = {
  crop: Crop;
  cropHi: string;
  farmerCount: number;
  combinedLandAcres: number;
  quantityQuintals: number;
  targetQuintals: number;
  currentMarketPrice: number;
  potentialCollectivePrice: number;
  status: "open" | "closed";
};

export const collectiveSales: Record<Crop, CollectiveSale> = {
  Wheat: {
    crop: "Wheat",
    cropHi: "गेहूं",
    farmerCount: 27,
    combinedLandAcres: 84,
    quantityQuintals: 210,
    targetQuintals: 300,
    currentMarketPrice: 2350,
    potentialCollectivePrice: 2425,
    status: "open",
  },
  Rice: {
    crop: "Rice",
    cropHi: "धान",
    farmerCount: 22,
    combinedLandAcres: 71,
    quantityQuintals: 185,
    targetQuintals: 280,
    currentMarketPrice: 2100,
    potentialCollectivePrice: 2175,
    status: "open",
  },
  Soybean: {
    crop: "Soybean",
    cropHi: "सोयाबीन",
    farmerCount: 18,
    combinedLandAcres: 56,
    quantityQuintals: 140,
    targetQuintals: 220,
    currentMarketPrice: 4550,
    potentialCollectivePrice: 4680,
    status: "open",
  },
};

export type BulkProcurement = {
  input: string;
  inputHi: string;
  farmerCount: number;
  quantityBags: number;
  individualPrice: number;
  estimatedBulkPrice: number;
};

export const bulkProcurement: BulkProcurement[] = [
  {
    input: "Fertilizer (Urea/DAP)",
    inputHi: "खाद (यूरिया/डीएपी)",
    farmerCount: 27,
    quantityBags: 80,
    individualPrice: 1350,
    estimatedBulkPrice: 1280,
  },
  {
    input: "Certified Seed",
    inputHi: "प्रमाणित बीज",
    farmerCount: 19,
    quantityBags: 45,
    individualPrice: 1600,
    estimatedBulkPrice: 1495,
  },
];

export type StorageOption = {
  name: string;
  nameHi: string;
  capacityQuintals: number;
  distanceKm: number;
  estimatedCostPerQuintalMonth: number;
};

export const storageOptions: StorageOption[] = [
  {
    name: "Storage A",
    nameHi: "भंडार A",
    capacityQuintals: 200,
    distanceKm: 8,
    estimatedCostPerQuintalMonth: 40,
  },
  {
    name: "Storage B",
    nameHi: "भंडार B",
    capacityQuintals: 150,
    distanceKm: 14,
    estimatedCostPerQuintalMonth: 35,
  },
];

export const storageSummary = {
  availableCapacityQuintals: 300,
  groupRequirementQuintals: 210,
  estimatedCostPerQuintalMonth: 40,
  utilizationPct: 70,
};

/** Extra realization for a farmer selling `quintals` at the collective price. */
export function extraRealization(crop: Crop, quintals: number) {
  const s = collectiveSales[crop];
  return Math.round((s.potentialCollectivePrice - s.currentMarketPrice) * quintals);
}

/** Rough produce estimate: ~7 quintals per acre (demo assumption). */
export const QUINTALS_PER_ACRE = 7;
