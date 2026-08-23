import { useState } from "react";
import {
  calculateCost,
  costHeadLabels,
  cropLabels,
  farmerProfile,
  formatINR,
  type Crop,
} from "@/data/demoData";

const crops: Crop[] = ["Wheat", "Rice", "Soybean"];

export function CostCalculator() {
  const [crop, setCrop] = useState<Crop>(farmerProfile.crop);
  const [acres, setAcres] = useState(farmerProfile.landAcres);
  const { heads, total } = calculateCost(crop, acres);

  return (
    <section id="cost" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">💰 खेती की लागत</h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          Demo data
        </span>
      </header>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {crops.map((c) => (
          <button
            key={c}
            onClick={() => setCrop(c)}
            className={`rounded-2xl border px-2 py-3 text-base font-semibold transition-colors ${
              crop === c
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            {cropLabels[c]}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-base font-medium">
          <span>ज़मीन का क्षेत्रफल</span>
          <span className="font-bold text-primary">{acres} एकड़</span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={acres}
          onChange={(e) => setAcres(Number(e.target.value))}
          aria-label="ज़मीन का क्षेत्रफल (एकड़)"
          className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
      </div>

      <div className="mt-5 space-y-1.5">
        {heads.map((h) => (
          <div key={h.head} className="flex items-center justify-between rounded-xl px-3 py-2 odd:bg-muted/60">
            <span className="text-base">
              {costHeadLabels[h.head].hi}{" "}
              <span className="text-xs text-muted-foreground">({formatINR(h.perAcre)}/एकड़)</span>
            </span>
            <span className="text-base font-semibold">{formatINR(h.total)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-primary px-4 py-4 text-primary-foreground">
        <span className="text-lg font-semibold">कुल अनुमानित लागत</span>
        <span className="text-2xl font-bold">{formatINR(total)}</span>
      </div>
    </section>
  );
}
