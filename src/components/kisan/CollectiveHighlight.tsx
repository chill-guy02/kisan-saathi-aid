import { Link } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { collectiveSales } from "@/data/collectiveData";
import { formatINR } from "@/data/demoData";
import { useProfile } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

/** Dashboard entry point for the Kisan Collective module. */
export function CollectiveHighlight() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const sale = collectiveSales[profile.crop];

  return (
    <section
      id="collective"
      className="rounded-3xl border border-primary/30 bg-leaf-soft p-5 shadow-[var(--shadow-card)]"
    >
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Handshake className="h-6 w-6 text-primary" /> {pick(lang, "किसान समूह", "Kisan Collective")}
        </h2>
        <span className="rounded-full bg-card px-2.5 py-1 text-xs text-muted-foreground">
          {pick(lang, "किसान समूह · डेमो", "Kisan Collective · Demo")}
        </span>
      </header>

      <p className="mt-2 text-base text-foreground">
        {pick(
          lang,
          "आपके आसपास के किसान मिलकर बेहतर कीमत और कम लागत पा सकते हैं।",
          "Nearby farmers can get better prices and lower costs together.",
        )}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat value={String(sale.farmerCount)} label={pick(lang, "किसान", "Farmers")} />
        <Stat value={`${sale.combinedLandAcres}`} label={pick(lang, "एकड़ ज़मीन", "Acres")} />
        <Stat value={`${sale.quantityQuintals}`} label={pick(lang, "क्विंटल उपलब्ध", "Quintals")} />
      </div>

      <div className="mt-4 rounded-2xl bg-card p-4">
        <p className="text-sm font-semibold text-muted-foreground">
          {pick(lang, "आज का किसान अवसर", "Today's farmer opportunity")}
        </p>
        <p className="mt-1 text-base">
          {lang === "hi" ? (
            <>
              {sale.farmerCount} किसान {sale.cropHi} बेचने के लिए तैयार हैं। सभी मिलकर बेचें तो लगभग{" "}
              <strong>{sale.quantityQuintals} क्विंटल</strong> की collective lot बन सकती है — संभावित
              भाव <strong>{formatINR(sale.potentialCollectivePrice)}/क्विंटल</strong> (अभी{" "}
              {formatINR(sale.currentMarketPrice)})।
            </>
          ) : (
            <>
              {sale.farmerCount} farmers are ready to sell {sale.crop}. Selling together could form
              a collective lot of <strong>{sale.quantityQuintals} quintals</strong> — potential price{" "}
              <strong>{formatINR(sale.potentialCollectivePrice)}/quintal</strong> (now{" "}
              {formatINR(sale.currentMarketPrice)}).
            </>
          )}
        </p>
      </div>

      <Link
        to="/collective"
        className="mt-4 flex h-12 items-center justify-center rounded-2xl bg-primary px-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {pick(lang, "सामूहिक अवसर देखें", "View collective opportunities")}
      </Link>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card px-2 py-3 text-center">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
