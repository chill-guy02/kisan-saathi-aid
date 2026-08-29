import { useQuery } from "@tanstack/react-query";
import { CloudRain, Droplets, Thermometer, Umbrella } from "lucide-react";
import { weatherDemo } from "@/data/demoData";
import { fetchWeather } from "@/lib/weather";
import { useProfileLocation } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

export function WeatherCard() {
  const { lang } = useLang();
  const loc = useProfileLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", loc.id],
    queryFn: () => fetchWeather({ lat: loc.lat, lon: loc.lon }),
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  const w = data ?? { ...weatherDemo, live: false };

  const stats = [
    { icon: Thermometer, label: pick(lang, "तापमान", "Temperature"), value: `${w.temperatureC}°C` },
    { icon: Umbrella, label: pick(lang, "बारिश की संभावना", "Rain probability"), value: `${w.rainProbability}%` },
    { icon: CloudRain, label: pick(lang, "अनुमानित वर्षा", "Expected rainfall"), value: `${w.rainfallMm} mm` },
    { icon: Droplets, label: pick(lang, "नमी", "Humidity"), value: `${w.humidity}%` },
  ];

  const interpretationEn =
    w.rainProbability >= 60
      ? "High chance of rain tomorrow."
      : w.rainProbability >= 30 || w.rainfallMm > 1
        ? "Light rain possible tomorrow."
        : "Likely clear weather tomorrow.";
  const interpretation = lang === "hi" ? w.interpretationHi : interpretationEn;

  return (
    <section id="weather" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          🌦️ {pick(lang, "मौसम", "Weather")} — {pick(lang, loc.hi, loc.en)}
        </h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          {isLoading
            ? pick(lang, "लोड हो रहा है…", "Loading…")
            : w.live
              ? pick(lang, "लाइव डेटा", "Live data")
              : "Demo data"}
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
        {interpretation}
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        {isError
          ? pick(
              lang,
              "लाइव मौसम नहीं मिल सका — डेमो डेटा दिखाया जा रहा है।",
              "Live weather unavailable — showing demo data.",
            )
          : pick(lang, "स्रोत: Open-Meteo (आज का पूर्वानुमान)", "Source: Open-Meteo (today's forecast)")}
      </p>
    </section>
  );
}
