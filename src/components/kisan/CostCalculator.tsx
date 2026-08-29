import { useEffect, useState } from "react";
import { Calculator, Sprout } from "lucide-react";
import {
  calculateCost,
  costHeadLabels,
  cropLabels,
  formatINR,
  type Crop,
} from "@/data/demoData";
import { useProfile } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

const crops: Crop[] = ["Wheat", "Rice", "Soybean"];

export function CostCalculator() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const [crop, setCrop] = useState<Crop>(profile.crop);
  const [acres, setAcres] = useState(profile.acres);

  useEffect(() => {
    setCrop(profile.crop);
    setAcres(profile.acres);
  }, [profile.crop, profile.acres]);

  const { heads, total } = calculateCost(crop, acres);

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <Calculator className="h-5 w-5 text-primary" />
          {pick(lang, "खेती की लागत", "Farm Cost")}
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          Demo
        </span>
      </header>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {crops.map((c) => (
          <button
            key={c}
            onClick={() => setCrop(c)}
            className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-sm font-semibold transition-all ${
              crop === c
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "bg-background hover:bg-muted"
            }`}
          >
            <Sprout className="h-3.5 w-3.5" />
            {pick(lang, cropLabels[c], c)}
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-lg border bg-background px-3 py-2.5">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-muted-foreground">{pick(lang, "ज़मीन", "Land area")}</span>
          <span className="font-bold text-primary">
            {acres} {pick(lang, "एकड़", "acres")}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={acres}
          onChange={(e) => setAcres(Number(e.target.value))}
          aria-label={pick(lang, "ज़मीन का क्षेत्रफल", "Land area")}
          className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
      </div>

      <div className="mt-3 space-y-1">
        {heads.map((h) => (
          <div
            key={h.head}
            className="flex items-center justify-between rounded-lg px-3 py-1.5 odd:bg-muted/40"
          >
            <span className="text-sm">
              {costHeadLabels[h.head][lang]}{" "}
              <span className="text-xs text-muted-foreground">
                ({formatINR(h.perAcre)}/{pick(lang, "एकड़", "ac")})
              </span>
            </span>
            <span className="text-sm font-semibold">{formatINR(h.total)}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-primary-foreground">
        <span className="text-sm font-semibold">
          {pick(lang, "कुल लागत", "Total cost")}
        </span>
        <span className="text-xl font-bold">{formatINR(total)}</span>
      </div>
    </section>
  );
}
