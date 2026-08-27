import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Handshake, PackageOpen, ShoppingCart, Warehouse } from "lucide-react";
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
import { Stat } from "./CollectiveHighlight";

function DemoTag({ text }: { text?: string }) {
  const { lang } = useLang();
  return (
    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
      {text ?? pick(lang, "डेमो / अनुमानित", "Demo / Estimated")}
    </span>
  );
}

export function CollectivePage() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const sale = collectiveSales[profile.crop];
  const myQuintals = Math.round(profile.acres * QUINTALS_PER_ACRE);
  const [joined, setJoined] = useState(false);
  const [quoted, setQuoted] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  const fert = bulkProcurement[0]!;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-16">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> {pick(lang, "डैशबोर्ड", "Dashboard")}
      </Link>

      <header className="mt-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Handshake className="h-7 w-7 text-primary" /> {pick(lang, "किसान समूह", "Kisan Collective")}
        </h1>
        <p className="mt-1 text-base text-muted-foreground">
          {pick(lang, "मिलकर खरीदें, बेचें और भंडारण करें।", "Buy, sell, and store together.")}
        </p>
      </header>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { icon: "🌾", hi: "सामूहिक बिक्री", en: "Sell Together", href: "#sell" },
          { icon: "🛒", hi: "सामूहिक खरीद", en: "Buy Together", href: "#buy" },
          { icon: "🏬", hi: "सामूहिक भंडारण", en: "Store Together", href: "#store" },
        ].map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="rounded-3xl border bg-card p-4 shadow-[var(--shadow-card)] transition-colors hover:bg-muted"
          >
            <div className="text-2xl">{c.icon}</div>
            <div className="mt-1 text-lg font-bold">{pick(lang, c.hi, c.en)}</div>
            <div className="text-xs text-muted-foreground">{c.en}</div>
          </a>
        ))}
      </div>

      {/* A. Collective Sale */}
      <section id="sell" className="mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <PackageOpen className="h-5 w-5 text-primary" />{" "}
            {pick(lang, "सामूहिक बिक्री", "Collective Sale")}
          </h2>
          <DemoTag />
        </header>
        <p className="mt-2 text-base">
          {lang === "hi"
            ? `${sale.farmerCount} किसान ${sale.cropHi} बेचने के लिए तैयार हैं।`
            : `${sale.farmerCount} farmers are ready to sell ${sale.crop}.`}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat value={String(sale.farmerCount)} label={pick(lang, "किसान", "Farmers")} />
          <Stat value={String(sale.combinedLandAcres)} label={pick(lang, "एकड़", "Acres")} />
          <Stat value={String(sale.quantityQuintals)} label={pick(lang, "क्विंटल", "Quintals")} />
        </div>

        <div className="mt-4 space-y-2">
          <Row
            label={pick(lang, "अभी मंडी भाव (अकेले)", "Current mandi price (alone)")}
            value={`${formatINR(sale.currentMarketPrice)}${pick(lang, "/क्विंटल", "/quintal")}`}
          />
          <Row
            label={pick(lang, "संभावित सामूहिक भाव", "Potential collective price")}
            value={`${formatINR(sale.potentialCollectivePrice)}${pick(lang, "/क्विंटल", "/quintal")}`}
            highlight
          />
          <Row
            label={pick(
              lang,
              `आपकी अनुमानित उपज (${myQuintals} क्विंटल) पर संभावित अतिरिक्त कमाई`,
              `Estimated extra earning (${myQuintals} quintals)`,
            )}
            value={formatINR(extraRealization(profile.crop, myQuintals))}
            highlight
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{pick(lang, "लक्ष्य की ओर", "Towards target")}</span>
            <span>
              {sale.quantityQuintals} / {sale.targetQuintals} {pick(lang, "क्विंटल", "quintals")}
            </span>
          </div>
          <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(sale.quantityQuintals / sale.targetQuintals) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setJoined(true)}
          disabled={joined}
          className="mt-4 h-12 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60"
        >
          {pick(lang, "सामूहिक बिक्री में शामिल हों", "Join collective sale")}
        </button>
        {joined && (
          <p className="mt-3 rounded-2xl bg-leaf-soft px-4 py-3 text-base">
            {pick(
              lang,
              "✅ आप सामूहिक बिक्री सूची में शामिल हो गए हैं।",
              "✅ You have joined the collective sale list.",
            )}
          </p>
        )}
      </section>

      {/* B. Collective Buy */}
      <section id="buy" className="mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="h-5 w-5 text-primary" />{" "}
            {pick(lang, "सामूहिक खरीद", "Collective Buy")}
          </h2>
          <DemoTag />
        </header>
        <p className="mt-2 text-base text-muted-foreground">
          {pick(
            lang,
            "मिलकर खरीदें और बेहतर bulk price पाने की कोशिश करें।",
            "Buy together and try to get a better bulk price.",
          )}
        </p>

        {bulkProcurement.map((b) => (
          <div key={b.input} className="mt-4 rounded-2xl bg-muted/50 p-4">
            <p className="text-base font-semibold">{pick(lang, b.inputHi, b.input)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {lang === "hi"
                ? `${b.farmerCount} किसानों को कुल लगभग ${b.quantityBags} बोरी की ज़रूरत।`
                : `${b.farmerCount} farmers need about ${b.quantityBags} bags total.`}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat
                value={formatINR(b.individualPrice)}
                label={pick(lang, "अकेले भाव/बोरी", "Individual/bag")}
              />
              <Stat
                value={formatINR(b.estimatedBulkPrice)}
                label={pick(lang, "bulk भाव/बोरी", "Bulk price/bag")}
              />
              <Stat
                value={formatINR(b.individualPrice - b.estimatedBulkPrice)}
                label={pick(lang, "बचत/बोरी", "Saving/bag")}
              />
            </div>
          </div>
        ))}

        <p className="mt-3 text-xs text-muted-foreground">
          {pick(
            lang,
            "डेमो अनुमान — अंतिम भाव आपूर्तिकर्ता के quotation पर निर्भर है।",
            "Demo estimate — final price depends on supplier quotation.",
          )}
        </p>

        <button
          onClick={() => setQuoted(true)}
          disabled={quoted}
          className="mt-3 h-12 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60"
        >
          {pick(lang, "Bulk quotation मांगें", "Request bulk quotation")}
        </button>
        {quoted && (
          <p className="mt-3 rounded-2xl bg-leaf-soft px-4 py-3 text-base">
            {lang === "hi"
              ? `✅ Bulk procurement request created. (${fert.inputHi} — ${fert.quantityBags} बोरी)`
              : `✅ Bulk procurement request created. (${fert.input} — ${fert.quantityBags} bags)`}
          </p>
        )}
      </section>

      {/* C. Collective Storage */}
      <section id="store" className="mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Warehouse className="h-5 w-5 text-primary" />{" "}
            {pick(lang, "सामूहिक भंडारण", "Collective Storage")}
          </h2>
          <DemoTag text="DEMO DATA" />
        </header>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat
            value={String(storageSummary.availableCapacityQuintals)}
            label={pick(lang, "क्विंटल क्षमता", "Quintal capacity")}
          />
          <Stat
            value={String(storageSummary.groupRequirementQuintals)}
            label={pick(lang, "समूह की ज़रूरत", "Group need")}
          />
          <Stat value={`${storageSummary.utilizationPct}%`} label={pick(lang, "उपयोग", "Usage")} />
        </div>

        <div className="mt-3">
          <Row
            label={pick(lang, "अनुमानित भंडारण खर्च", "Estimated storage cost")}
            value={`${formatINR(storageSummary.estimatedCostPerQuintalMonth)}${pick(lang, "/क्विंटल/माह", "/quintal/month")}`}
          />
        </div>

        <button
          onClick={() => setShowStorage((s) => !s)}
          className="mt-4 h-12 w-full rounded-2xl border border-primary/40 bg-leaf-soft text-base font-semibold text-secondary-foreground"
        >
          {pick(lang, "भंडारण विकल्प देखें", "View storage options")}
        </button>

        {showStorage && (
          <div className="mt-3 space-y-2">
            {storageOptions.map((s) => (
              <div key={s.name} className="rounded-2xl bg-muted/50 p-4">
                <p className="text-base font-semibold">
                  {pick(lang, s.nameHi, s.name)}{" "}
                  <span className="text-sm text-muted-foreground">({s.name})</span>
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Stat
                    value={String(s.capacityQuintals)}
                    label={pick(lang, "क्विंटल क्षमता", "Quintal capacity")}
                  />
                  <Stat value={`${s.distanceKm} km`} label={pick(lang, "दूरी", "Distance")} />
                  <Stat
                    value={formatINR(s.estimatedCostPerQuintalMonth)}
                    label={pick(lang, "प्रति क्विंटल/माह", "Per quintal/month")}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="mt-4 text-xs text-muted-foreground">
        {pick(
          lang,
          "सभी आंकड़े डेमो/अनुमानित हैं। यहाँ कोई असली सौदा, भुगतान या अनुबंध नहीं होता।",
          "All figures are demo/estimated. No real transaction, payment, or contract happens here.",
        )}
      </p>
    </main>
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
      className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ${
        highlight ? "bg-gold-soft" : "bg-muted"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="shrink-0 text-lg font-bold">{value}</span>
    </div>
  );
}
