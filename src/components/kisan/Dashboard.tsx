import { Link } from "@tanstack/react-router";
import { FarmerProfile } from "./FarmerProfile";
import { WeatherCard } from "./WeatherCard";
import { MarketPriceCard } from "./MarketPriceCard";
import { CostCalculator } from "./CostCalculator";
import { ChatAssistant } from "./ChatAssistant";
import { CollectiveHighlight } from "./CollectiveHighlight";

const quickActions = [
  { label: "🌦️ मौसम", target: "weather" },
  { label: "🌾 मंडी भाव", target: "market" },
  { label: "💰 खेती की लागत", target: "cost" },
  { label: "💬 सवाल पूछें", target: "chat" },
  { label: "🤝 किसान समूह", target: "collective" },
  { label: "👨‍🌾 मेरा खेत", target: "profile" },
];

export function Dashboard() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-4">
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
        पहले सही जानकारी → फिर सही फैसला →{" "}
        <Link to="/collective" className="font-semibold text-primary underline">
          फिर मिलकर बेहतर सौदा
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
