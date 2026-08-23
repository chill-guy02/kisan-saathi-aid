/**
 * Real weather via Open-Meteo (free, no API key).
 * Coordinates come from the farmer profile location (Raipur by default).
 */
import { weatherDemo } from "@/data/demoData";

export type Weather = {
  temperatureC: number;
  rainProbability: number;
  rainfallMm: number;
  humidity: number;
  interpretationHi: string;
  live: boolean;
};

export const RAIPUR = { lat: 21.2514, lon: 81.6296 };

/** Last known weather — used by the chat engine so answers match the card. */
export let currentWeather: Weather = { ...weatherDemo, live: false };

function interpret(rainProb: number, rainMm: number): string {
  if (rainProb >= 60) return "कल बारिश की संभावना अधिक है।";
  if (rainProb >= 30 || rainMm > 1) return "कल हल्की बारिश हो सकती है।";
  return "कल मौसम साफ रहने की संभावना है।";
}

export async function fetchWeather(): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${RAIPUR.lat}&longitude=${RAIPUR.lon}` +
    `&daily=temperature_2m_max,precipitation_probability_max,precipitation_sum` +
    `&hourly=relative_humidity_2m&timezone=Asia%2FKolkata&forecast_days=2`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("weather fetch failed");
  const json = (await res.json()) as {
    daily: {
      temperature_2m_max: number[];
      precipitation_probability_max: (number | null)[];
      precipitation_sum: number[];
    };
    hourly: { relative_humidity_2m: number[] };
  };

  // index 1 = tomorrow
  const temp = Math.round(json.daily.temperature_2m_max[1] ?? json.daily.temperature_2m_max[0]!);
  const prob = Math.round(json.daily.precipitation_probability_max[1] ?? 0);
  const mm = Math.round((json.daily.precipitation_sum[1] ?? 0) * 10) / 10;
  const humidityDay = json.hourly.relative_humidity_2m.slice(24, 48);
  const humidity = humidityDay.length
    ? Math.round(humidityDay.reduce((s, h) => s + h, 0) / humidityDay.length)
    : weatherDemo.humidity;

  const weather: Weather = {
    temperatureC: temp,
    rainProbability: prob,
    rainfallMm: mm,
    humidity,
    interpretationHi: interpret(prob, mm),
    live: true,
  };
  currentWeather = weather;
  return weather;
}
