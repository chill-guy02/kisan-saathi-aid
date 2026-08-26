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
import { Stat } from "./CollectiveHighlight";

const DemoTag = ({ text = "Demo / Estimated" }: { text?: string }) => (
  <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{text}</span>
);

export function CollectivePage() {
  const { profile } = useProfile();
  const sale = collectiveSales[profile.crop];
  const myQuintals = Math.round(profile.acres * QUINTALS_PER_ACRE);
  const [joined, setJoined] = useState(false);
  const [quoted, setQuoted] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  const fert = bulkProcurement[0]!;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-4">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> डैशबोर्ड
      </Link>

      <header className="mt-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Handshake className="h-7 w-7 text-primary" /> किसान समूह
        </h1>
        <p className="mt-1 text-base text-muted-foreground">
          मिलकर खरीदें, बेचें और भंडारण करें। <span className="text-sm">(Kisan Collective)</span>
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
            <div className="mt-1 text-lg font-bold">{c.hi}</div>
            <div className="text-xs text-muted-foreground">{c.en}</div>
          </a>
        ))}
      </div>

      {/* A. सामूहिक बिक्री */}
      <section id="sell" className="mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <PackageOpen className="h-5 w-5 text-primary" /> सामूहिक बिक्री
          </h2>
          <DemoTag />
        </header>
        <p className="mt-2 text-base">
          {sale.farmerCount} किसान {sale.cropHi} बेचने के लिए तैयार हैं।
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat value={String(sale.farmerCount)} label="किसान" />
          <Stat value={String(sale.combinedLandAcres)} label="एकड़" />
          <Stat value={String(sale.quantityQuintals)} label="क्विंटल" />
        </div>

        <div className="mt-4 space-y-2">
          <Row label="अभी मंडी भाव (अकेले)" value={`${formatINR(sale.currentMarketPrice)}/क्विंटल`} />
          <Row
            label="संभावित सामूहिक भाव"
            value={`${formatINR(sale.potentialCollectivePrice)}/क्विंटल`}
            highlight
          />
          <Row
            label={`आपकी अनुमानित उपज (${myQuintals} क्विंटल) पर संभावित अतिरिक्त कमाई`}
            value={formatINR(extraRealization(profile.crop, myQuintals))}
            highlight
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>लक्ष्य की ओर</span>
            <span>
              {sale.quantityQuintals} / {sale.targetQuintals} क्विंटल
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
          सामूहिक बिक्री में शामिल हों
        </button>
        {joined && (
          <p className="mt-3 rounded-2xl bg-leaf-soft px-4 py-3 text-base">
            ✅ आप सामूहिक बिक्री सूची में शामिल हो गए हैं।
          </p>
        )}
      </section>

      {/* B. सामूहिक खरीद */}
      <section id="buy" className="mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="h-5 w-5 text-primary" /> सामूहिक खरीद
          </h2>
          <DemoTag />
        </header>
        <p className="mt-2 text-base text-muted-foreground">
          मिलकर खरीदें और बेहतर bulk price पाने की कोशिश करें।
        </p>

        {bulkProcurement.map((b) => (
          <div key={b.input} className="mt-4 rounded-2xl bg-muted/50 p-4">
            <p className="text-base font-semibold">{b.inputHi}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {b.farmerCount} किसानों को कुल लगभग {b.quantityBags} बोरी की ज़रूरत।
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Stat value={formatINR(b.individualPrice)} label="अकेले भाव/बोरी" />
              <Stat value={formatINR(b.estimatedBulkPrice)} label="bulk भाव/बोरी" />
              <Stat value={formatINR(b.individualPrice - b.estimatedBulkPrice)} label="बचत/बोरी" />
            </div>
          </div>
        ))}

        <p className="mt-3 text-xs text-muted-foreground">
          Demo estimate — final price depends on supplier quotation.
        </p>

        <button
          onClick={() => setQuoted(true)}
          disabled={quoted}
          className="mt-3 h-12 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60"
        >
          Bulk quotation मांगें
        </button>
        {quoted && (
          <p className="mt-3 rounded-2xl bg-leaf-soft px-4 py-3 text-base">
            ✅ Bulk procurement request created. ({fert.inputHi} — {fert.quantityBags} बोरी)
          </p>
        )}
      </section>

      {/* C. सामूहिक भंडारण */}
      <section id="store" className="mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
        <header className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Warehouse className="h-5 w-5 text-primary" /> सामूहिक भंडारण
          </h2>
          <DemoTag text="DEMO DATA" />
        </header>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat value={String(storageSummary.availableCapacityQuintals)} label="क्विंटल क्षमता" />
          <Stat value={String(storageSummary.groupRequirementQuintals)} label="समूह की ज़रूरत" />
          <Stat value={`${storageSummary.utilizationPct}%`} label="उपयोग" />
        </div>

        <div className="mt-3">
          <Row
            label="अनुमानित भंडारण खर्च"
            value={`${formatINR(storageSummary.estimatedCostPerQuintalMonth)}/क्विंटल/माह`}
          />
        </div>

        <button
          onClick={() => setShowStorage((s) => !s)}
          className="mt-4 h-12 w-full rounded-2xl border border-primary/40 bg-leaf-soft text-base font-semibold text-secondary-foreground"
        >
          भंडारण विकल्प देखें
        </button>

        {showStorage && (
          <div className="mt-3 space-y-2">
            {storageOptions.map((s) => (
              <div key={s.name} className="rounded-2xl bg-muted/50 p-4">
                <p className="text-base font-semibold">
                  {s.nameHi} <span className="text-sm text-muted-foreground">({s.name})</span>
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Stat value={String(s.capacityQuintals)} label="क्विंटल क्षमता" />
                  <Stat value={`${s.distanceKm} km`} label="दूरी" />
                  <Stat
                    value={formatINR(s.estimatedCostPerQuintalMonth)}
                    label="प्रति क्विंटल/माह"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="mt-4 text-xs text-muted-foreground">
        सभी आंकड़े डेमो/अनुमानित हैं। यहाँ कोई असली सौदा, भुगतान या अनुबंध नहीं होता।
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
