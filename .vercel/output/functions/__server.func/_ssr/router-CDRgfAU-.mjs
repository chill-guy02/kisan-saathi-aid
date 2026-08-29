import { i as __toESM } from "../_runtime.mjs";
import { a as streamText, i as isStepCount, o as require_jsx_runtime, r as convertToModelMessages, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { a as collectiveSales, c as extraRealization, f as marketPrices, g as useLang, h as storageSummary, i as calculateCost, l as farmerProfile, m as storageOptions, n as ProfileProvider, r as bulkProcurement, s as cropLabels, t as LanguageProvider, u as formatINR } from "./collectiveData-CbgFn1e8.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Languages } from "../_libs/lucide-react.mjs";
import { t as RAIPUR } from "./weather-xTWzjgY3.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { pt as tool } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as createGoogle } from "../_libs/ai-sdk__google.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CDRgfAU-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-i_N2fov8.css";
function LanguageToggle() {
	const { lang, setLang } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setLang(lang === "hi" ? "en" : "hi"),
		className: "fixed right-4 top-4 z-50 flex h-10 items-center gap-1.5 rounded-full border bg-card/95 px-3.5 text-sm font-bold shadow-md backdrop-blur transition-colors hover:bg-muted",
		"aria-label": lang === "hi" ? "Switch to English" : "हिंदी में बदलें",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4" }), lang === "hi" ? "EN" : "हिं"]
	});
}
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LanguageProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }) })
	});
}
var $$splitComponentImporter$1 = () => import("./routes-BXYVqpUW.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "किसान साथी — खेती का डिजिटल साथी | Kisan Saathi" },
		{
			name: "description",
			content: "किसान साथी: मौसम, मंडी भाव और खेती की लागत की जानकारी एक जगह, हिंदी में। डेमो प्रोटोटाइप।"
		},
		{
			property: "og:title",
			content: "किसान साथी — Kisan Saathi"
		},
		{
			property: "og:description",
			content: "आपकी खेती का आसान डिजिटल साथी — मौसम, मंडी भाव, लागत कैलकुलेटर और चैट सहायक।"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./collective-D-rxCnh5.mjs");
var Route$1 = createFileRoute("/collective")({
	head: () => ({ meta: [
		{ title: "किसान समूह — मिलकर खरीदें, बेचें, भंडारण करें | Kisan Collective" },
		{
			name: "description",
			content: "किसान समूह: सामूहिक बिक्री, सामूहिक खरीद और सामूहिक भंडारण के अवसर — बेहतर भाव और कम लागत के लिए। डेमो डेटा।"
		},
		{
			property: "og:title",
			content: "किसान समूह — Kisan Collective"
		},
		{
			property: "og:description",
			content: "मिलकर बेचें, मिलकर खरीदें और मिलकर भंडारण करें — छोटे किसानों की बड़ी सौदेबाज़ी।"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
/** Direct Google Gemini provider — server-only. */
function createGeminiProvider(apiKey) {
	return createGoogle({ apiKey });
}
var cropEnum = enumType([
	"Wheat",
	"Rice",
	"Soybean"
]);
async function getForecast(days, lat, lon) {
	const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FKolkata&forecast_days=${days}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error("weather fetch failed");
	const json = await res.json();
	return json.daily.time.map((date, i) => ({
		date,
		maxTempC: json.daily.temperature_2m_max[i],
		minTempC: json.daily.temperature_2m_min[i],
		rainProbabilityPct: json.daily.precipitation_probability_max[i] ?? 0,
		rainfallMm: json.daily.precipitation_sum[i] ?? 0,
		windKph: json.daily.wind_speed_10m_max[i]
	}));
}
var Route = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const { messages, profile } = await request.json();
	if (!Array.isArray(messages)) return new Response("Messages are required", { status: 400 });
	const key = process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
	if (!key) return new Response("Missing GOOGLE_GENERATIVE_AI_API_KEY", { status: 500 });
	const google = createGeminiProvider(key);
	const farmer = {
		name: profile?.name || farmerProfile.nameHi,
		crop: profile?.crop ?? farmerProfile.crop,
		acres: profile?.acres ?? farmerProfile.landAcres,
		locationHi: profile?.locationHi || farmerProfile.locationHi,
		lat: profile?.lat ?? RAIPUR.lat,
		lon: profile?.lon ?? RAIPUR.lon
	};
	const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
	const system = `आप "किसान साथी" हैं — भारतीय किसानों के लिए एक व्यावहारिक कृषि सलाहकार।

नियम:
- हमेशा सरल, बोलचाल की हिंदी में उत्तर दें (जब तक किसान अंग्रेज़ी/अन्य भाषा में न पूछे, तब उसी भाषा में)।
- छोटे उत्तर दें: 2–5 पंक्तियाँ या छोटे bullet points। अंक और ₹ स्पष्ट लिखें।
- मौसम, मंडी भाव या लागत से जुड़ा कोई भी सवाल हो तो पहले उपलब्ध tool चलाएँ, अनुमान न लगाएँ।
- सलाह देते समय कारण बताएँ (जैसे "कल 70% बारिश है, इसलिए आज यूरिया न डालें")।
- अगर जानकारी उपलब्ध न हो तो साफ़ कहें और नज़दीकी कृषि विज्ञान केंद्र से संपर्क करने को कहें।
- कीटनाशक/दवा की सटीक मात्रा बताते समय चेतावनी दें कि लेबल पढ़ें।
- सामूहिक बिक्री / सामूहिक खरीद / सामूहिक भंडारण (किसान समूह) के सवालों पर getCollectiveSale, getCollectiveBuy या getCollectiveStorage tool चलाएँ। किसानों की संख्या, मात्रा, भाव या बचत के आंकड़े कभी खुद से न बनाएँ — केवल tool से मिले आंकड़े इस्तेमाल करें।
- "अभी बेचूं या रुकूं/store करूं" जैसे सवाल पर मंडी भाव, सामूहिक भाव और भंडारण खर्च की तुलना करके आसान सलाह दें।

किसान की जानकारी: नाम ${farmer.name}, स्थान ${farmer.locationHi}, मुख्य फसल ${cropLabels[farmer.crop]}, ज़मीन ${farmer.acres} एकड़।
अगर किसान फसल या एकड़ न बताए तो यही जानकारी इस्तेमाल करें।
आज की तारीख: ${today} (IST)।`;
	return streamText({
		model: google("gemini-2.5-flash"),
		system,
		messages: await convertToModelMessages(messages),
		stopWhen: isStepCount(50),
		tools: {
			getWeather: tool({
				description: `${farmer.locationHi} का असली मौसम पूर्वानुमान (Open-Meteo). आज और आने वाले दिनों का तापमान, बारिश की संभावना, वर्षा और हवा।`,
				inputSchema: objectType({ days: numberType().describe("कितने दिन का पूर्वानुमान चाहिए (1-7)") }),
				execute: async ({ days }) => {
					const d = Math.min(7, Math.max(1, Math.round(days || 2)));
					return {
						location: farmer.locationHi,
						daily: await getForecast(d, farmer.lat, farmer.lon)
					};
				}
			}),
			getMandiPrice: tool({
				description: "नज़दीकी मंडी में फसल का भाव (प्रति क्विंटल). अभी डेमो डेटा।",
				inputSchema: objectType({ crop: cropEnum }),
				execute: async ({ crop }) => {
					const p = marketPrices[crop];
					return {
						crop: cropLabels[crop],
						mandi: farmer.locationHi,
						minPerQuintal: p.min,
						maxPerQuintal: p.max,
						modalPerQuintal: p.modal,
						note: "डेमो डेटा (Agmarknet/eNAM API से बदला जाएगा)"
					};
				}
			}),
			getCollectiveSale: tool({
				description: "किसान समूह की सामूहिक बिक्री की जानकारी: कितने किसान तैयार हैं, कुल मात्रा, अभी का मंडी भाव और संभावित सामूहिक भाव (डेमो डेटा)।",
				inputSchema: objectType({ crop: cropEnum }),
				execute: async ({ crop }) => {
					const s = collectiveSales[crop];
					const myQuintals = Math.round(farmer.acres * 7);
					return {
						crop: s.cropHi,
						farmerCount: s.farmerCount,
						combinedLandAcres: s.combinedLandAcres,
						quantityQuintals: s.quantityQuintals,
						targetQuintals: s.targetQuintals,
						currentMarketPricePerQuintal: s.currentMarketPrice,
						potentialCollectivePricePerQuintal: s.potentialCollectivePrice,
						yourEstimatedQuintals: myQuintals,
						yourEstimatedExtraEarning: extraRealization(crop, myQuintals),
						note: "डेमो/अनुमानित आंकड़े"
					};
				}
			}),
			getCollectiveBuy: tool({
				description: "सामूहिक खरीद (bulk procurement) की जानकारी: खाद/बीज की कुल ज़रूरत, अकेले का भाव, bulk भाव और अनुमानित बचत (डेमो डेटा)।",
				inputSchema: objectType({}),
				execute: async () => ({
					items: bulkProcurement.map((b) => ({
						input: b.inputHi,
						farmerCount: b.farmerCount,
						quantityBags: b.quantityBags,
						individualPricePerBag: b.individualPrice,
						estimatedBulkPricePerBag: b.estimatedBulkPrice,
						savingPerBag: b.individualPrice - b.estimatedBulkPrice
					})),
					note: "Demo estimate — final price depends on supplier quotation."
				})
			}),
			getCollectiveStorage: tool({
				description: "सामूहिक भंडारण की जानकारी: उपलब्ध क्षमता, समूह की ज़रूरत, भंडारण खर्च और भंडार विकल्प (डेमो डेटा)।",
				inputSchema: objectType({}),
				execute: async () => ({
					availableCapacityQuintals: storageSummary.availableCapacityQuintals,
					groupRequirementQuintals: storageSummary.groupRequirementQuintals,
					costPerQuintalPerMonth: storageSummary.estimatedCostPerQuintalMonth,
					utilizationPct: storageSummary.utilizationPct,
					options: storageOptions.map((s) => ({
						name: s.nameHi,
						capacityQuintals: s.capacityQuintals,
						distanceKm: s.distanceKm,
						costPerQuintalPerMonth: s.estimatedCostPerQuintalMonth
					})),
					note: "डेमो डेटा"
				})
			}),
			calculateFarmCost: tool({
				description: "फसल और एकड़ के हिसाब से खेती की अनुमानित लागत (बीज, खाद, मजदूरी आदि)।",
				inputSchema: objectType({
					crop: cropEnum,
					acres: numberType()
				}),
				execute: async ({ crop, acres }) => {
					const a = Math.min(50, Math.max(.5, acres || farmer.acres));
					const { heads, total } = calculateCost(crop, a);
					return {
						crop: cropLabels[crop],
						acres: a,
						breakdown: heads,
						total,
						totalFormatted: formatINR(total)
					};
				}
			})
		}
	}).toUIMessageStreamResponse({
		originalMessages: messages,
		onError: (error) => {
			console.error("chat error", error);
			return "क्षमा करें, अभी उत्तर नहीं मिल पाया। कृपया दोबारा कोशिश करें।";
		}
	});
} } } });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	CollectiveRoute: Route$1.update({
		id: "/collective",
		path: "/collective",
		getParentRoute: () => Route$3
	}),
	ApiChatRoute: Route.update({
		id: "/api/chat",
		path: "/api/chat",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
