import { FarmerProfile } from "./FarmerProfile";
import { WeatherCard } from "./WeatherCard";
import { MarketPriceCard } from "./MarketPriceCard";
import { CostCalculator } from "./CostCalculator";
import { ChatAssistant } from "./ChatAssistant";

const quickActions = [
  { label: "🌦️ मौसम", target: "weather" },
  { label: "🌾 मंडी भाव", target: "market" },
  { label: "💰 खेती की लागत", target: "cost" },
  { label: "💬 सवाल पूछें", target: "chat" },
];

export function Dashboard() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-12 pt-4">
      <FarmerProfile />

      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
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

      <div className="mt-4 space-y-4">
        <WeatherCard />
        <MarketPriceCard />
        <CostCalculator />
        <ChatAssistant />
      </div>
    </main>
  );
}
