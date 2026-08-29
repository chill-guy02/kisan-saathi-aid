import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CloudSun, Wheat, Calculator, MessageSquare, Handshake, CircleUser as UserCircle } from "lucide-react";
import { FarmerProfile } from "./FarmerProfile";
import { WeatherCard } from "./WeatherCard";
import { MarketPriceCard } from "./MarketPriceCard";
import { CostCalculator } from "./CostCalculator";
import { ChatAssistant } from "./ChatAssistant";
import { CollectiveHighlight } from "./CollectiveHighlight";
import { useLang, pick } from "@/lib/i18n";

type TabId = "weather" | "market" | "cost" | "chat" | "collective" | "profile";

export function Dashboard() {
  const { lang } = useLang();
  const [tab, setTab] = useState<TabId>("weather");

  const tabs: { id: TabId; icon: typeof CloudSun; label: string }[] = [
    { id: "weather", icon: CloudSun, label: pick(lang, "मौसम", "Weather") },
    { id: "market", icon: Wheat, label: pick(lang, "मंडी भाव", "Market") },
    { id: "cost", icon: Calculator, label: pick(lang, "लागत", "Cost") },
    { id: "chat", icon: MessageSquare, label: pick(lang, "सवाल पूछें", "Ask") },
    { id: "collective", icon: Handshake, label: pick(lang, "समूह", "Collective") },
    { id: "profile", icon: UserCircle, label: pick(lang, "मेरा खेत", "Profile") },
  ];

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-4 pt-16">
      <FarmerProfile />

      <nav className="sticky top-16 z-30 mt-4 flex gap-1 overflow-x-auto rounded-xl border bg-card/95 p-1 shadow-sm backdrop-blur">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex min-w-[4.5rem] flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition-all ${
              tab === id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-4 flex-1">
        {tab === "weather" && <WeatherCard />}
        {tab === "market" && <MarketPriceCard />}
        {tab === "cost" && <CostCalculator />}
        {tab === "chat" && <ChatAssistant />}
        {tab === "collective" && <CollectiveHighlight />}
        {tab === "profile" && (
          <div className="space-y-4">
            <FarmerProfile full />
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {pick(lang, "पहले सही जानकारी → फिर सही फैसला →", "Right info first → then right decision →")}{" "}
        <Link to="/collective" className="font-semibold text-primary underline">
          {pick(lang, "फिर मिलकर बेहतर सौदा", "then a better deal together")}
        </Link>
      </p>
    </main>
  );
}
