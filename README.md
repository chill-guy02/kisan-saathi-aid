# Kisan Saathi Dashboard

Build a competition-ready MVP web app called Kisan Saathi, a Hindi-first agricultural decision-support assistant for Indian farmers.

IMPORTANT: Optimize for minimum implementation complexity and minimum iterations. Do not build unnecessary production features.

Build ONLY the following core features:

Farmer Profile

Weather dashboard

Mandi price dashboard

Farm cost calculator

Simple AI-style chat interface

TECH STACK

Use React + TypeScript + Tailwind.

Use local/mock data initially. DO NOT integrate external APIs, authentication, payments, voice, or complex database functionality yet.

The application must be structured so these can be added later.

DESIGN

Create a polished, mobile-first farmer-friendly UI.

Brand:
Kisan Saathi

Tagline:
“आपकी खेती का आसान डिजिटल साथी”

Use a clean agricultural visual style with green accents, large readable text, rounded cards, simple icons and minimal navigation.

MAIN DASHBOARD

Show:

Farmer:
Ramesh

Location:
Raipur

Crop:
Wheat

Land:
3 acres

Create three large cards.

WEATHER CARD

Show:

Temperature: 31°C
Rain probability: 72%
Expected rainfall: 18 mm
Humidity: 78%

Display an interpretation:

“कल बारिश की संभावना अधिक है।”

MARKET CARD

Show:

Crop: Wheat
Mandi: Raipur
Minimum: ₹2250/quintal
Maximum: ₹2400/quintal
Modal price: ₹2350/quintal

Clearly label:
“Demo data”

COST CALCULATOR

Allow the user to select:

Crop:
Wheat / Rice / Soybean

Land area:
1–20 acres

Use local demo cost data.

For wheat use:

Seed: ₹1500/acre
Fertilizer: ₹2000/acre
Pesticide: ₹800/acre
Labour: ₹3000/acre
Irrigation: ₹1000/acre
Other: ₹500/acre

Calculate the total deterministically.

Example:

3 acres Wheat

Seed = ₹4500
Fertilizer = ₹6000
Pesticide = ₹2400
Labour = ₹9000
Irrigation = ₹3000
Other = ₹1500

Total = ₹26,400

CHAT INTERFACE

Create a prominent chat interface titled:

“किसान साथी से पूछें”

Placeholder:

“अपना सवाल लिखें…”

Suggested questions:

“कल बारिश होगी क्या?”
“आज गेहूं का भाव क्या है?”
“3 एकड़ गेहूं की लागत कितनी होगी?”
“बारिश आने वाली है, खाद डालूं?”

The chat should provide demo responses based on the user's question.

Implement simple keyword-based intent recognition initially.

Recognize:

weather
market price
cost
fertilizer/advisory

Examples:

If the user asks about rain/weather:
Return the demo weather information.

If the user asks about wheat price:
Return the demo wheat mandi price.

If the user asks about cultivation cost:
Calculate based on land area.

If the user asks:
“बारिश आने वाली है, खाद डालूं?”

Return:

“कल बारिश की संभावना 72% है। इसलिए आज यूरिया डालने के बजाय बारिश के बाद डालना बेहतर रहेगा।”

Do not pretend this is a professional agricultural recommendation. Present it as a prototype advisory.

FARMER-FRIENDLY UX

Add quick-action buttons:

🌦️ मौसम
🌾 मंडी भाव
💰 खेती की लागत
💬 सवाल पूछें

Make the dashboard responsive and optimized for mobile screens.

ARCHITECTURE

Keep the code modular.

Create separate files/components for:

WeatherCard

MarketPriceCard

CostCalculator

ChatAssistant

FarmerProfile

Dashboard

Keep demo data in a separate data/config file so it can later be replaced by APIs.

Do NOT implement authentication, payment, admin dashboard, real-time APIs, voice or external database yet.

The goal is to create a visually polished and fully functional prototype using local demo data in the fewest possible iterations.

After building it, give me a concise explanation of which files contain the demo data and where external APIs can later be connected.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kisan-saathi-aid.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c2b220be-545c-4429-80ee-6499aa570233).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
