import { cropLabels, formatINR, marketPrices } from "@/data/demoData";
import { useProfile, useProfileLocation } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

export function MarketPriceCard() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const loc = useProfileLocation();
  const price = marketPrices[profile.crop];

  const rows = [
    { label: pick(lang, "न्यूनतम", "Minimum"), value: price.min, tone: "bg-muted" },
    { label: pick(lang, "अधिकतम", "Maximum"), value: price.max, tone: "bg-muted" },
    { label: pick(lang, "मॉडल भाव", "Modal price"), value: price.modal, tone: "bg-gold-soft" },
  ];

  return (
    <section id="market" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          🌾 {pick(lang, "मंडी भाव", "Mandi Price")}
        </h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">Demo data</span>
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        {pick(lang, "फसल", "Crop")}: {pick(lang, cropLabels[profile.crop], profile.crop)} ·{" "}
        {pick(lang, "मंडी", "Mandi")}: {pick(lang, loc.hi, loc.en)}
      </p>

      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-center justify-between rounded-2xl ${r.tone} px-4 py-3`}
          >
            <span className="text-base font-medium">{r.label}</span>
            <span className="text-xl font-bold">
              {formatINR(r.value)}
              <span className="text-sm font-normal text-muted-foreground">
                {pick(lang, "/क्विंटल", "/quintal")}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
