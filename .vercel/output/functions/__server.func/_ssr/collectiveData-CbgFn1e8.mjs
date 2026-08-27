import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collectiveData-CbgFn1e8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var farmerProfile = {
	name: "Ramesh",
	nameHi: "रमेश",
	location: "Raipur",
	locationHi: "रायपुर",
	crop: "Wheat",
	cropHi: "गेहूं",
	landAcres: 3
};
var weatherDemo = {
	temperatureC: 31,
	rainProbability: 72,
	rainfallMm: 18,
	humidity: 78,
	interpretationHi: "कल बारिश की संभावना अधिक है।"
};
var locations = [
	{
		id: "raipur",
		en: "Raipur",
		hi: "रायपुर",
		lat: 21.2514,
		lon: 81.6296
	},
	{
		id: "bhopal",
		en: "Bhopal",
		hi: "भोपाल",
		lat: 23.2599,
		lon: 77.4126
	},
	{
		id: "nagpur",
		en: "Nagpur",
		hi: "नागपुर",
		lat: 21.1458,
		lon: 79.0882
	},
	{
		id: "lucknow",
		en: "Lucknow",
		hi: "लखनऊ",
		lat: 26.8467,
		lon: 80.9462
	},
	{
		id: "ludhiana",
		en: "Ludhiana",
		hi: "लुधियाना",
		lat: 30.901,
		lon: 75.8573
	}
];
var getLocation = (id) => locations.find((l) => l.id === id) ?? locations[0];
/** Per-crop demo mandi prices (₹ / quintal) */
var marketPrices = {
	Wheat: {
		min: 2250,
		max: 2400,
		modal: 2350
	},
	Rice: {
		min: 1950,
		max: 2200,
		modal: 2100
	},
	Soybean: {
		min: 4200,
		max: 4800,
		modal: 4550
	}
};
var cropLabels = {
	Wheat: "गेहूं",
	Rice: "धान",
	Soybean: "सोयाबीन"
};
var costHeadLabels = {
	seed: {
		hi: "बीज",
		en: "Seed"
	},
	fertilizer: {
		hi: "खाद",
		en: "Fertilizer"
	},
	pesticide: {
		hi: "कीटनाशक",
		en: "Pesticide"
	},
	labour: {
		hi: "मजदूरी",
		en: "Labour"
	},
	irrigation: {
		hi: "सिंचाई",
		en: "Irrigation"
	},
	other: {
		hi: "अन्य",
		en: "Other"
	}
};
/** Per-acre demo costs in ₹ */
var cropCosts = {
	Wheat: {
		seed: 1500,
		fertilizer: 2e3,
		pesticide: 800,
		labour: 3e3,
		irrigation: 1e3,
		other: 500
	},
	Rice: {
		seed: 1200,
		fertilizer: 2400,
		pesticide: 1e3,
		labour: 4e3,
		irrigation: 2e3,
		other: 600
	},
	Soybean: {
		seed: 2500,
		fertilizer: 1800,
		pesticide: 1200,
		labour: 2500,
		irrigation: 800,
		other: 500
	}
};
function calculateCost(crop, acres) {
	const per = cropCosts[crop];
	const heads = Object.keys(per).map((h) => ({
		head: h,
		perAcre: per[h],
		total: per[h] * acres
	}));
	return {
		heads,
		total: heads.reduce((s, h) => s + h.total, 0)
	};
}
var formatINR = (n) => "₹" + n.toLocaleString("en-IN");
var DEFAULT_PROFILE = {
	name: farmerProfile.nameHi,
	locationId: "raipur",
	crop: farmerProfile.crop,
	acres: farmerProfile.landAcres
};
var STORAGE_KEY$1 = "kisan-saathi-profile";
var ProfileContext = (0, import_react.createContext)(null);
function ProfileProvider({ children }) {
	const [profile, setProfile] = (0, import_react.useState)(DEFAULT_PROFILE);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY$1);
			if (raw) setProfile({
				...DEFAULT_PROFILE,
				...JSON.parse(raw)
			});
		} catch {}
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		profile,
		updateProfile: (patch) => setProfile((p) => {
			const next = {
				...p,
				...patch
			};
			try {
				localStorage.setItem(STORAGE_KEY$1, JSON.stringify(next));
			} catch {}
			return next;
		}),
		resetProfile: () => {
			try {
				localStorage.removeItem(STORAGE_KEY$1);
			} catch {}
			setProfile(DEFAULT_PROFILE);
		}
	}), [profile]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileContext.Provider, {
		value,
		children
	});
}
function useProfile() {
	const ctx = (0, import_react.useContext)(ProfileContext);
	if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
	return ctx;
}
var useProfileLocation = () => getLocation(useProfile().profile.locationId);
var STORAGE_KEY = "kisan-saathi-lang";
/** Shell + page copy. Add new keys here; content cards fall back to Hindi. */
var dict = {
	appName: {
		hi: "किसान साथी",
		en: "Kisan Saathi"
	},
	tagline: {
		hi: "खेती का डिजिटल साथी",
		en: "Your digital farming partner"
	},
	navHome: {
		hi: "डैशबोर्ड",
		en: "Dashboard"
	},
	navAsk: {
		hi: "किसान साथी से पूछें",
		en: "Ask Kisan Saathi"
	},
	navMarket: {
		hi: "मंडी",
		en: "Market"
	},
	navWeather: {
		hi: "मौसम व चेतावनी",
		en: "Weather & Alerts"
	},
	navCollective: {
		hi: "किसान समूह",
		en: "Kisan Collective"
	},
	navSchemes: {
		hi: "सरकारी योजनाएँ",
		en: "Government Schemes"
	},
	navSaved: {
		hi: "सहेजी सलाह",
		en: "Saved Advice"
	},
	navSettings: {
		hi: "सेटिंग्स",
		en: "Settings"
	},
	greetingMorning: {
		hi: "सुप्रभात",
		en: "Good morning"
	},
	greetingAfternoon: {
		hi: "नमस्ते",
		en: "Good afternoon"
	},
	greetingEvening: {
		hi: "शुभ संध्या",
		en: "Good evening"
	},
	today: {
		hi: "आज",
		en: "Today"
	},
	weatherSummary: {
		hi: "मौसम",
		en: "Weather"
	},
	cropSummary: {
		hi: "आपकी फसल",
		en: "Your crop"
	},
	marketSummary: {
		hi: "मंडी भाव",
		en: "Mandi price"
	},
	alerts: {
		hi: "ज़रूरी चेतावनी",
		en: "Important alerts"
	},
	recommendations: {
		hi: "आज की सिफ़ारिशें",
		en: "Today's recommendations"
	},
	askPlaceholder: {
		hi: "अपना सवाल लिखें…",
		en: "Type your question…"
	},
	askCta: {
		hi: "किसान साथी से पूछें",
		en: "Ask Kisan Saathi"
	},
	viewAll: {
		hi: "सब देखें",
		en: "View all"
	},
	demoData: {
		hi: "डेमो डेटा",
		en: "Demo data"
	},
	liveData: {
		hi: "लाइव डेटा",
		en: "Live data"
	},
	save: {
		hi: "सहेजें",
		en: "Save"
	},
	saved: {
		hi: "सहेजा गया",
		en: "Saved"
	},
	remove: {
		hi: "हटाएँ",
		en: "Remove"
	},
	noSaved: {
		hi: "अभी कोई सलाह सहेजी नहीं गई है। चैट के जवाब पर “सहेजें” दबाएँ।",
		en: "No saved advice yet. Tap “Save” on any assistant reply."
	},
	profile: {
		hi: "किसान प्रोफ़ाइल",
		en: "Farmer profile"
	},
	language: {
		hi: "भाषा",
		en: "Language"
	},
	costTitle: {
		hi: "खेती की लागत",
		en: "Farm cost"
	},
	perQuintal: {
		hi: "/क्विंटल",
		en: "/quintal"
	},
	acres: {
		hi: "एकड़",
		en: "acres"
	},
	schemesIntro: {
		hi: "आपकी प्रोफ़ाइल के अनुसार उपयोगी सरकारी योजनाएँ (डेमो जानकारी)।",
		en: "Government schemes relevant to your profile (demo information)."
	}
};
var LangContext = (0, import_react.createContext)(null);
function LanguageProvider({ children }) {
	const [lang, setLangState] = (0, import_react.useState)("hi");
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw === "hi" || raw === "en") setLangState(raw);
		} catch {}
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		lang,
		setLang: (l) => {
			setLangState(l);
			try {
				localStorage.setItem(STORAGE_KEY, l);
			} catch {}
		},
		t: (k) => dict[k][lang]
	}), [lang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangContext.Provider, {
		value,
		children
	});
}
function useLang() {
	const ctx = (0, import_react.useContext)(LangContext);
	if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
	return ctx;
}
/** Pick a bilingual string without the dictionary. */
var pick = (lang, hi, en) => lang === "hi" ? hi : en;
var collectiveSales = {
	Wheat: {
		crop: "Wheat",
		cropHi: "गेहूं",
		farmerCount: 27,
		combinedLandAcres: 84,
		quantityQuintals: 210,
		targetQuintals: 300,
		currentMarketPrice: 2350,
		potentialCollectivePrice: 2425,
		status: "open"
	},
	Rice: {
		crop: "Rice",
		cropHi: "धान",
		farmerCount: 22,
		combinedLandAcres: 71,
		quantityQuintals: 185,
		targetQuintals: 280,
		currentMarketPrice: 2100,
		potentialCollectivePrice: 2175,
		status: "open"
	},
	Soybean: {
		crop: "Soybean",
		cropHi: "सोयाबीन",
		farmerCount: 18,
		combinedLandAcres: 56,
		quantityQuintals: 140,
		targetQuintals: 220,
		currentMarketPrice: 4550,
		potentialCollectivePrice: 4680,
		status: "open"
	}
};
var bulkProcurement = [{
	input: "Fertilizer (Urea/DAP)",
	inputHi: "खाद (यूरिया/डीएपी)",
	farmerCount: 27,
	quantityBags: 80,
	individualPrice: 1350,
	estimatedBulkPrice: 1280
}, {
	input: "Certified Seed",
	inputHi: "प्रमाणित बीज",
	farmerCount: 19,
	quantityBags: 45,
	individualPrice: 1600,
	estimatedBulkPrice: 1495
}];
var storageOptions = [{
	name: "Storage A",
	nameHi: "भंडार A",
	capacityQuintals: 200,
	distanceKm: 8,
	estimatedCostPerQuintalMonth: 40
}, {
	name: "Storage B",
	nameHi: "भंडार B",
	capacityQuintals: 150,
	distanceKm: 14,
	estimatedCostPerQuintalMonth: 35
}];
var storageSummary = {
	availableCapacityQuintals: 300,
	groupRequirementQuintals: 210,
	estimatedCostPerQuintalMonth: 40,
	utilizationPct: 70
};
/** Extra realization for a farmer selling `quintals` at the collective price. */
function extraRealization(crop, quintals) {
	const s = collectiveSales[crop];
	return Math.round((s.potentialCollectivePrice - s.currentMarketPrice) * quintals);
}
//#endregion
export { useProfile as _, collectiveSales as a, extraRealization as c, locations as d, marketPrices as f, useLang as g, storageSummary as h, calculateCost as i, farmerProfile as l, storageOptions as m, ProfileProvider as n, costHeadLabels as o, pick as p, bulkProcurement as r, cropLabels as s, LanguageProvider as t, formatINR as u, useProfileLocation as v, weatherDemo as y };
