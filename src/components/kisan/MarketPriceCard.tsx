import { TrendingUp, Wheat } from "lucide-react";
import { cropLabels, formatINR, marketPrices } from "@/data/demoData";
import { useProfile, useProfileLocation } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

export function MarketPriceCard() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const loc = useProfileLocation();
  const price = marketPrices[profile.crop];

  const rows = [
    { label: pick(lang, "न्यूनतम", "Minimum"), value: price.min, tone: "text-muted-foreground" },
    { label: pick(lang, "अधिकतम", "Maximum"), value: price.max, tone: "text-muted-foreground" },
    { label: pick(lang, "मॉडल भाव", "Modal price"), value: price.modal, tone: "text-primary" },
  ];

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <Wheat className="h-5 w-5 text-primary" />
          {pick(lang, "मंडी भाव", "Mandi Price")}
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          Demo
        </span>
      </header>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="font-semibold">{pick(lang, cropLabels[profile.crop], profile.crop)}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{pick(lang, loc.hi, loc.en)}</span>
      </div>

      <div className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-lg border bg-background px-3 py-2.5"
          >
            <span className="text-sm font-medium text-muted-foreground">{r.label}</span>
            <span className={`text-lg font-bold ${r.tone}`}>
              {formatINR(r.value)}
              <span className="text-xs font-normal text-muted-foreground">
                {pick(lang, "/क्विंटल", "/qt")}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2.5">
        <TrendingUp className="h-4 w-4 text-primary" />
        <p className="text-xs text-muted-foreground">
          {pick(
            lang,
            "डेमो डेटा — Agmarknet/eNAM API से बदला जाएगा",
            "Demo data — will be replaced with Agmarknet/eNAM API",
          )}
        </p>
      </div>
    </section>
  );
}
