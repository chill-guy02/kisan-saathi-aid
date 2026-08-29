import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Handshake, PackageOpen, ShoppingCart, Warehouse, Users, MapPin, Package } from "lucide-react";
import {
  bulkProcurement,
  collectiveSales,
  extraRealization,
  QUINTALS_PER_ACRE,
  storageOptions,
  storageSummary,
} from "@/data/collectiveData";
import { formatINR } from "@/data/demoData";
import { useProfile } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

function DemoTag({ text }: { text?: string }) {
  const { lang } = useLang();
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {text ?? pick(lang, "डेमो", "Demo")}
    </span>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Users; value: string; label: string }) {
  return (
    <div className="rounded-lg border bg-background px-2 py-2.5 text-center">
      <Icon className="mx-auto h-4 w-4 text-primary" />
      <div className="mt-1 text-lg font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${
        highlight ? "border-primary/20 bg-primary/5" : "bg-background"
      }`}
    >
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="shrink-0 text-base font-bold">{value}</span>
    </div>
  );
}

export function CollectivePage() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const sale = collectiveSales[profile.crop];
  const myQuintals = Math.round(profile.acres * QUINTALS_PER_ACRE);
  const [tab, setTab] = useState<"sell" | "buy" | "store">("sell");
  const [joined, setJoined] = useState(false);
  const [quoted, setQuoted] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  const fert = bulkProcurement[0]!;

  const tabs = [
    { id: "sell" as const, icon: PackageOpen, label: pick(lang, "बिक्री", "Sell") },
    { id: "buy" as const, icon: ShoppingCart, label: pick(lang, "खरीद", "Buy") },
    { id: "store" as const, icon: Warehouse, label: pick(lang, "भंडारण", "Store") },
  ];

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-4 pt-16">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> {pick(lang, "डैशबोर्ड", "Dashboard")}
      </Link>

      <header className="mt-3">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Handshake className="h-6 w-6 text-primary" /> {pick(lang, "किसान समूह", "Kisan Collective")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {pick(lang, "मिलकर खरीदें, बेचें और भंडारण करें।", "Buy, sell, and store together.")}
        </p>
      </header>

      {/* Tab bar */}
      <nav className="mt-4 flex gap-1 rounded-xl border bg-card p-1 shadow-sm">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              tab === id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <div className="mt-4 flex-1">
        {tab === "sell" && (
          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-base font-bold">
                <PackageOpen className="h-5 w-5 text-primary" />
                {pick(lang, "सामूहिक बिक्री", "Collective Sale")}
              </h2>
              <DemoTag />
            </header>
            <p className="mt-2 text-sm">
              {lang === "hi"
                ? `${sale.farmerCount} किसान ${sale.cropHi} बेचने के लिए तैयार हैं।`
                : `${sale.farmerCount} farmers are ready to sell ${sale.crop}.`}
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat icon={Users} value={String(sale.farmerCount)} label={pick(lang, "किसान", "Farmers")} />
              <Stat icon={MapPin} value={String(sale.combinedLandAcres)} label={pick(lang, "एकड़", "Acres")} />
              <Stat icon={Package} value={String(sale.quantityQuintals)} label={pick(lang, "क्विंटल", "Qt")} />
            </div>

            <div className="mt-3 space-y-1.5">
              <Row
                label={pick(lang, "अभी मंडी भाव (अकेले)", "Current price (alone)")}
                value={`${formatINR(sale.currentMarketPrice)}${pick(lang, "/क्विंटल", "/qt")}`}
              />
              <Row
                label={pick(lang, "संभावित सामूहिक भाव", "Potential collective price")}
                value={`${formatINR(sale.potentialCollectivePrice)}${pick(lang, "/क्विंटल", "/qt")}`}
                highlight
              />
              <Row
                label={pick(lang, `आपकी अतिरिक्त कमाई (${myQuintals} क्विंटल)`, `Your extra earning (${myQuintals} qt)`)}
                value={formatINR(extraRealization(profile.crop, myQuintals))}
                highlight
              />
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{pick(lang, "लक्ष्य की ओर", "Towards target")}</span>
                <span>
                  {sale.quantityQuintals} / {sale.targetQuintals} {pick(lang, "क्विंटल", "qt")}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(sale.quantityQuintals / sale.targetQuintals) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setJoined(true)}
              disabled={joined}
              className="mt-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pick(lang, "सामूहिक बिक्री में शामिल हों", "Join collective sale")}
            </button>
            {joined && (
              <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                {pick(lang, "✅ आप सामूहिक बिक्री में शामिल हो गए।", "✅ You joined the collective sale.")}
              </p>
            )}
          </section>
        )}

        {tab === "buy" && (
          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-base font-bold">
                <ShoppingCart className="h-5 w-5 text-primary" />
                {pick(lang, "सामूहिक खरीद", "Collective Buy")}
              </h2>
              <DemoTag />
            </header>
            <p className="mt-2 text-sm text-muted-foreground">
              {pick(lang, "मिलकर खरीदें, बेहतर भाव पाएं।", "Buy together, get better prices.")}
            </p>

            {bulkProcurement.map((b) => (
              <div key={b.input} className="mt-3 rounded-lg border bg-background p-3">
                <p className="text-sm font-semibold">{pick(lang, b.inputHi, b.input)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lang === "hi"
                    ? `${b.farmerCount} किसानों को ${b.quantityBags} बोरी चाहिए।`
                    : `${b.farmerCount} farmers need ${b.quantityBags} bags.`}
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Stat icon={Package} value={formatINR(b.individualPrice)} label={pick(lang, "अकेले/बोरी", "Indiv/bag")} />
                  <Stat icon={Package} value={formatINR(b.estimatedBulkPrice)} label={pick(lang, "bulk/बोरी", "Bulk/bag")} />
                  <Stat icon={Package} value={formatINR(b.individualPrice - b.estimatedBulkPrice)} label={pick(lang, "बचत/बोरी", "Save/bag")} />
                </div>
              </div>
            ))}

            <p className="mt-2 text-xs text-muted-foreground">
              {pick(lang, "डेमो अनुमान — अंतिम भाव quotation पर निर्भर।", "Demo estimate — final price depends on quotation.")}
            </p>

            <button
              onClick={() => setQuoted(true)}
              disabled={quoted}
              className="mt-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pick(lang, "Bulk quotation मांगें", "Request bulk quotation")}
            </button>
            {quoted && (
              <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                {lang === "hi"
                  ? `✅ Bulk request created. (${fert.inputHi} — ${fert.quantityBags} बोरी)`
                  : `✅ Bulk request created. (${fert.input} — ${fert.quantityBags} bags)`}
              </p>
            )}
          </section>
        )}

        {tab === "store" && (
          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <header className="flex items-center justify-between">
              <h2 className="flex items-center gap-1.5 text-base font-bold">
                <Warehouse className="h-5 w-5 text-primary" />
                {pick(lang, "सामूहिक भंडारण", "Collective Storage")}
              </h2>
              <DemoTag />
            </header>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat icon={Package} value={String(storageSummary.availableCapacityQuintals)} label={pick(lang, "क्षमता", "Capacity")} />
              <Stat icon={Users} value={String(storageSummary.groupRequirementQuintals)} label={pick(lang, "ज़रूरत", "Need")} />
              <Stat icon={Warehouse} value={`${storageSummary.utilizationPct}%`} label={pick(lang, "उपयोग", "Usage")} />
            </div>

            <div className="mt-3">
              <Row
                label={pick(lang, "भंडारण खर्च", "Storage cost")}
                value={`${formatINR(storageSummary.estimatedCostPerQuintalMonth)}${pick(lang, "/क्विंटल/माह", "/qt/mo")}`}
              />
            </div>

            <button
              onClick={() => setShowStorage((s) => !s)}
              className="mt-3 h-11 w-full rounded-xl border border-primary/30 bg-primary/5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {pick(lang, "भंडारण विकल्प देखें", "View storage options")}
            </button>

            {showStorage && (
              <div className="mt-2 space-y-2">
                {storageOptions.map((s) => (
                  <div key={s.name} className="rounded-lg border bg-background p-3">
                    <p className="text-sm font-semibold">
                      {pick(lang, s.nameHi, s.name)}{" "}
                      <span className="text-xs text-muted-foreground">({s.name})</span>
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <Stat icon={Package} value={String(s.capacityQuintals)} label={pick(lang, "क्षमता", "Cap")} />
                      <Stat icon={MapPin} value={`${s.distanceKm} km`} label={pick(lang, "दूरी", "Dist")} />
                      <Stat icon={Warehouse} value={formatINR(s.estimatedCostPerQuintalMonth)} label={pick(lang, "/क्विंटल/माह", "/qt/mo")} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {pick(lang, "सभी आंकड़े डेमो हैं। कोई असली सौदा नहीं।", "All figures are demo. No real transactions.")}
      </p>
    </main>
  );
}
