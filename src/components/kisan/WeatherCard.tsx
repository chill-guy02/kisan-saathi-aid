import { useQuery } from "@tanstack/react-query";
import { CloudRain, Droplets, Thermometer, Umbrella } from "lucide-react";
import { weatherDemo } from "@/data/demoData";
import { fetchWeather } from "@/lib/weather";

export function WeatherCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", "raipur"],
    queryFn: fetchWeather,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  const w = data ?? { ...weatherDemo, live: false };

  const stats = [
    { icon: Thermometer, label: "तापमान", value: `${w.temperatureC}°C` },
    { icon: Umbrella, label: "बारिश की संभावना", value: `${w.rainProbability}%` },
    { icon: CloudRain, label: "अनुमानित वर्षा", value: `${w.rainfallMm} मिमी` },
    { icon: Droplets, label: "नमी", value: `${w.humidity}%` },
  ];

  return (
    <section id="weather" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">🌦️ मौसम — रायपुर</h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          {isLoading ? "लोड हो रहा है…" : w.live ? "लाइव डेटा" : "Demo data"}
        </span>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl bg-sky-soft px-3 py-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-4 w-4 text-sky" />
              {label}
            </div>
            <div className="mt-1 text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-2xl bg-leaf-soft px-4 py-3 text-lg font-semibold text-secondary-foreground">
        {w.interpretationHi}
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        {isError
          ? "लाइव मौसम नहीं मिल सका — डेमो डेटा दिखाया जा रहा है।"
          : "स्रोत: Open-Meteo (कल का पूर्वानुमान)"}
      </p>
    </section>
  );
}
