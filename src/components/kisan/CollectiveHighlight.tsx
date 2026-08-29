import { Link } from "@tanstack/react-router";
import { Handshake, Users, MapPin, Package } from "lucide-react";
import { collectiveSales } from "@/data/collectiveData";
import { formatINR } from "@/data/demoData";
import { useProfile } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

export function CollectiveHighlight() {
  const { lang } = useLang();
  const { profile } = useProfile();
  const sale = collectiveSales[profile.crop];

  return (
    <section className="rounded-xl border border-primary/20 bg-card p-4 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <Handshake className="h-5 w-5 text-primary" />
          {pick(lang, "किसान समूह", "Kisan Collective")}
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          Demo
        </span>
      </header>

      <p className="mt-2 text-sm text-muted-foreground">
        {pick(
          lang,
          "आसपास के किसान मिलकर बेहतर कीमत पा सकते हैं।",
          "Nearby farmers can get better prices together.",
        )}
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat icon={Users} value={String(sale.farmerCount)} label={pick(lang, "किसान", "Farmers")} />
        <Stat icon={MapPin} value={`${sale.combinedLandAcres}`} label={pick(lang, "एकड़", "Acres")} />
        <Stat icon={Package} value={`${sale.quantityQuintals}`} label={pick(lang, "क्विंटल", "Qt")} />
      </div>

      <div className="mt-3 rounded-lg bg-primary/5 p-3">
        <p className="text-xs font-semibold text-muted-foreground">
          {pick(lang, "आज का अवसर", "Today's opportunity")}
        </p>
        <p className="mt-1 text-sm">
          {lang === "hi" ? (
            <>
              {sale.farmerCount} किसान मिलकर बेचें तो <strong>{formatINR(sale.potentialCollectivePrice)}/क्विंटल</strong> संभव (अभी {formatINR(sale.currentMarketPrice)})।
            </>
          ) : (
            <>
              {sale.farmerCount} farmers selling together could get <strong>{formatINR(sale.potentialCollectivePrice)}/qt</strong> (now {formatINR(sale.currentMarketPrice)}).
            </>
          )}
        </p>
      </div>

      <Link
        to="/collective"
        className="mt-3 flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {pick(lang, "सामूहिक अवसर देखें", "View opportunities")}
      </Link>
    </section>
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
