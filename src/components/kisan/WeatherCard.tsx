import { useQuery } from "@tanstack/react-query";
import { CloudRain, Droplets, Thermometer, Umbrella, MapPin, CloudSun } from "lucide-react";
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
    { icon: Thermometer, label: pick(lang, "तापमान", "Temperature"), value: `${w.temperatureC}°C`, color: "text-orange-500" },
    { icon: Umbrella, label: pick(lang, "बारिश संभावना", "Rain chance"), value: `${w.rainProbability}%`, color: "text-blue-500" },
    { icon: CloudRain, label: pick(lang, "वर्षा", "Rainfall"), value: `${w.rainfallMm} mm`, color: "text-sky-500" },
    { icon: Droplets, label: pick(lang, "नमी", "Humidity"), value: `${w.humidity}%`, color: "text-cyan-500" },
  ];

  const interpretationEn =
    w.rainProbability >= 60
      ? "High chance of rain tomorrow."
      : w.rainProbability >= 30 || w.rainfallMm > 1
        ? "Light rain possible tomorrow."
        : "Likely clear weather tomorrow.";
  const interpretation = lang === "hi" ? w.interpretationHi : interpretationEn;

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <CloudSun className="h-5 w-5 text-primary" />
          {pick(lang, "मौसम", "Weather")}
        </h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {pick(lang, loc.hi, loc.en)}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${w.live ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
            {isLoading ? "…" : w.live ? pick(lang, "लाइव", "Live") : "Demo"}
          </span>
        </div>
      </header>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-lg border bg-background px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className={`h-3.5 w-3.5 ${color}`} />
              {label}
            </div>
            <div className="mt-0.5 text-xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2.5">
        <span className="text-base">💡</span>
        <p className="text-sm font-medium text-foreground">{interpretation}</p>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {isError
          ? pick(lang, "लाइव मौसम नहीं मिल सका।", "Live weather unavailable.")
          : pick(lang, "स्रोत: Open-Meteo", "Source: Open-Meteo")}
      </p>
    </section>
  );
}
