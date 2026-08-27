import { y as weatherDemo } from "./collectiveData-CbgFn1e8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather-xTWzjgY3.js
/**
* Real weather via Open-Meteo (free, no API key).
* Coordinates come from the farmer profile location (Raipur by default).
*/
var RAIPUR = {
	lat: 21.2514,
	lon: 81.6296
};
({ ...weatherDemo });
function interpret(rainProb, rainMm) {
	if (rainProb >= 60) return "आज बारिश की संभावना अधिक है।";
	if (rainProb >= 30 || rainMm > 1) return "आज हल्की बारिश हो सकती है।";
	return "आज मौसम साफ रहने की संभावना है।";
}
async function fetchWeather(coords = RAIPUR) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,precipitation_probability_max,precipitation_sum&hourly=relative_humidity_2m&timezone=Asia%2FKolkata&forecast_days=2`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("weather fetch failed");
	const json = await res.json();
	const temp = Math.round(json.daily.temperature_2m_max[0]);
	const prob = Math.round(json.daily.precipitation_probability_max[0] ?? 0);
	const mm = Math.round((json.daily.precipitation_sum[0] ?? 0) * 10) / 10;
	const humidityDay = json.hourly.relative_humidity_2m.slice(0, 24);
	return {
		temperatureC: temp,
		rainProbability: prob,
		rainfallMm: mm,
		humidity: humidityDay.length ? Math.round(humidityDay.reduce((s, h) => s + h, 0) / humidityDay.length) : weatherDemo.humidity,
		interpretationHi: interpret(prob, mm),
		live: true
	};
}
//#endregion
export { fetchWeather as n, RAIPUR as t };
