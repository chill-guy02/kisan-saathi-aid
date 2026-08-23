import { CloudRain, Droplets, Thermometer, Umbrella } from "lucide-react";
import { weatherDemo } from "@/data/demoData";

export function WeatherCard() {
  const stats = [
    { icon: Thermometer, label: "तापमान", value: `${weatherDemo.temperatureC}°C` },
    { icon: Umbrella, label: "बारिश की संभावना", value: `${weatherDemo.rainProbability}%` },
    { icon: CloudRain, label: "अनुमानित वर्षा", value: `${weatherDemo.rainfallMm} मिमी` },
    { icon: Droplets, label: "नमी", value: `${weatherDemo.humidity}%` },
  ];

  return (
    <section id="weather" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">🌦️ मौसम</h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          Demo data
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
        {weatherDemo.interpretationHi}
      </p>
    </section>
  );
}
