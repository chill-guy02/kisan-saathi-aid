import { Link } from "@tanstack/react-router";
import { FarmerProfile } from "./FarmerProfile";
import { WeatherCard } from "./WeatherCard";
import { MarketPriceCard } from "./MarketPriceCard";
import { CostCalculator } from "./CostCalculator";
import { ChatAssistant } from "./ChatAssistant";
import { CollectiveHighlight } from "./CollectiveHighlight";
import { useLang, pick } from "@/lib/i18n";

export function Dashboard() {
  const { lang } = useLang();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const quickActions = [
    { label: pick(lang, "🌦️ मौसम", "🌦️ Weather"), target: "weather" },
    { label: pick(lang, "🌾 मंडी भाव", "🌾 Mandi Price"), target: "market" },
    { label: pick(lang, "💰 खेती की लागत", "💰 Farm Cost"), target: "cost" },
    { label: pick(lang, "💬 सवाल पूछें", "💬 Ask a Question"), target: "chat" },
    { label: pick(lang, "🤝 किसान समूह", "🤝 Kisan Collective"), target: "collective" },
    { label: pick(lang, "👨‍🌾 मेरा खेत", "👨‍🌾 My Farm"), target: "profile" },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-16">
      <div id="profile">
        <FarmerProfile />
      </div>

      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {quickActions.map((a) => (
          <button
            key={a.target}
            onClick={() => scrollTo(a.target)}
            className="rounded-2xl border bg-card px-3 py-3 text-base font-semibold shadow-[var(--shadow-card)] transition-colors hover:bg-muted"
          >
            {a.label}
          </button>
        ))}
      </nav>

      <p className="mt-3 text-center text-sm text-muted-foreground">
        {pick(lang, "पहले सही जानकारी → फिर सही फैसला →", "Right info first → then right decision →")}{" "}
        <Link to="/collective" className="font-semibold text-primary underline">
          {pick(lang, "फिर मिलकर बेहतर सौदा", "then a better deal together")}
        </Link>
      </p>

      <div className="mt-4 space-y-4">
        <CollectiveHighlight />
        <WeatherCard />
        <MarketPriceCard />
        <CostCalculator />
        <ChatAssistant />
      </div>
    </main>
  );
}
