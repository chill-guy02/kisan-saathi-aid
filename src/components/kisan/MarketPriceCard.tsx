import { formatINR, marketDemo } from "@/data/demoData";

export function MarketPriceCard() {
  const rows = [
    { label: "न्यूनतम", value: marketDemo.min, tone: "bg-muted" },
    { label: "अधिकतम", value: marketDemo.max, tone: "bg-muted" },
    { label: "मॉडल भाव", value: marketDemo.modal, tone: "bg-gold-soft" },
  ];

  return (
    <section id="market" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">🌾 मंडी भाव</h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          Demo data
        </span>
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        फसल: {marketDemo.cropHi} · मंडी: {marketDemo.mandiHi}
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
              <span className="text-sm font-normal text-muted-foreground">/क्विंटल</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
