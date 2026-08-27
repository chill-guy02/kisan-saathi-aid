import { i as __toESM } from "../_runtime.mjs";
import { n as DefaultChatTransport, o as require_jsx_runtime, s as require_react, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { _ as useProfile, d as locations, f as marketPrices, g as useLang, i as calculateCost, o as costHeadLabels, p as pick, s as cropLabels, u as formatINR, v as useProfileLocation, y as weatherDemo } from "./collectiveData-CbgFn1e8.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sprout, c as Ruler, d as MapPin, g as Check, h as CloudRain, i as Thermometer, l as Pencil, m as Droplets, n as User, r as Umbrella, s as Send } from "../_libs/lucide-react.mjs";
import { t as CollectiveHighlight } from "./CollectiveHighlight-Kr34VKgE.mjs";
import { n as fetchWeather } from "./weather-xTWzjgY3.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DzYB3Q2M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var crops$1 = [
	"Wheat",
	"Rice",
	"Soybean"
];
function FarmerProfile() {
	const { lang } = useLang();
	const { profile, updateProfile } = useProfile();
	const loc = useProfileLocation();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const items = [
		{
			icon: User,
			label: pick(lang, "किसान", "Farmer"),
			value: profile.name
		},
		{
			icon: MapPin,
			label: pick(lang, "स्थान", "Location"),
			value: pick(lang, loc.hi, loc.en)
		},
		{
			icon: Sprout,
			label: pick(lang, "फसल", "Crop"),
			value: pick(lang, cropLabels[profile.crop], profile.crop)
		},
		{
			icon: Ruler,
			label: pick(lang, "ज़मीन", "Land"),
			value: `${profile.acres} ${pick(lang, "एकड़", "acres")}`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl p-5 text-primary-foreground shadow-[var(--shadow-card)]",
		style: { backgroundImage: "var(--gradient-hero)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/20 text-2xl",
					children: "🌾"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold leading-tight",
						children: pick(lang, "किसान साथी", "Kisan Saathi")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-90",
						children: pick(lang, "आपकी खेती का आसान डिजिटल साथी", "Your easy digital farming partner")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setEditing((e) => !e),
					"aria-label": editing ? pick(lang, "सहेजें", "Save") : pick(lang, "प्रोफ़ाइल बदलें", "Edit profile"),
					className: "flex h-10 items-center gap-1.5 rounded-2xl bg-primary-foreground/20 px-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/30",
					children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), editing ? pick(lang, "सहेजें", "Save") : pick(lang, "बदलें", "Edit")]
				})
			]
		}), !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid grid-cols-2 gap-3",
			children: items.map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-primary-foreground/15 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), label]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-lg font-semibold",
					children: value
				})]
			}, label))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-4 rounded-2xl bg-primary-foreground/15 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs opacity-90",
						children: pick(lang, "किसान का नाम", "Farmer name")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: profile.name,
						onChange: (e) => updateProfile({ name: e.target.value }),
						className: "mt-1 h-11 w-full rounded-xl border-0 bg-background px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs opacity-90",
						children: pick(lang, "स्थान", "Location")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: profile.locationId,
						onChange: (e) => updateProfile({ locationId: e.target.value }),
						className: "mt-1 h-11 w-full rounded-xl border-0 bg-background px-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring",
						children: locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: l.id,
							children: [
								pick(lang, l.hi, l.en),
								" (",
								l.en,
								")"
							]
						}, l.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs opacity-90",
					children: pick(lang, "मुख्य फसल", "Main crop")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 grid grid-cols-3 gap-2",
					children: crops$1.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => updateProfile({ crop: c }),
						className: `rounded-xl px-2 py-2.5 text-base font-semibold transition-colors ${profile.crop === c ? "bg-background text-foreground" : "bg-primary-foreground/20 hover:bg-primary-foreground/30"}`,
						children: pick(lang, cropLabels[c], c)
					}, c))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-90",
						children: pick(lang, "ज़मीन (एकड़)", "Land (acres)")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold",
						children: [
							profile.acres,
							" ",
							pick(lang, "एकड़", "acres")
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 1,
					max: 20,
					step: 1,
					value: profile.acres,
					onChange: (e) => updateProfile({ acres: Number(e.target.value) }),
					"aria-label": pick(lang, "ज़मीन (एकड़)", "Land (acres)"),
					className: "mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-primary-foreground/30"
				})] })
			]
		})]
	});
}
function WeatherCard() {
	const { lang } = useLang();
	const loc = useProfileLocation();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["weather", loc.id],
		queryFn: () => fetchWeather({
			lat: loc.lat,
			lon: loc.lon
		}),
		staleTime: 18e5,
		retry: 1
	});
	const w = data ?? {
		...weatherDemo,
		live: false
	};
	const stats = [
		{
			icon: Thermometer,
			label: pick(lang, "तापमान", "Temperature"),
			value: `${w.temperatureC}°C`
		},
		{
			icon: Umbrella,
			label: pick(lang, "बारिश की संभावना", "Rain probability"),
			value: `${w.rainProbability}%`
		},
		{
			icon: CloudRain,
			label: pick(lang, "अनुमानित वर्षा", "Expected rainfall"),
			value: `${w.rainfallMm} mm`
		},
		{
			icon: Droplets,
			label: pick(lang, "नमी", "Humidity"),
			value: `${w.humidity}%`
		}
	];
	const interpretationEn = w.rainProbability >= 60 ? "High chance of rain tomorrow." : w.rainProbability >= 30 || w.rainfallMm > 1 ? "Light rain possible tomorrow." : "Likely clear weather tomorrow.";
	const interpretation = lang === "hi" ? w.interpretationHi : interpretationEn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "weather",
		className: "rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-xl font-bold",
					children: [
						"🌦️ ",
						pick(lang, "मौसम", "Weather"),
						" — ",
						pick(lang, loc.hi, loc.en)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
					children: isLoading ? pick(lang, "लोड हो रहा है…", "Loading…") : w.live ? pick(lang, "लाइव डेटा", "Live data") : "Demo data"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: stats.map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-sky-soft px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-sky" }), label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-2xl font-bold",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-2xl bg-leaf-soft px-4 py-3 text-lg font-semibold text-secondary-foreground",
				children: interpretation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: isError ? pick(lang, "लाइव मौसम नहीं मिल सका — डेमो डेटा दिखाया जा रहा है।", "Live weather unavailable — showing demo data.") : pick(lang, "स्रोत: Open-Meteo (आज का पूर्वानुमान)", "Source: Open-Meteo (today's forecast)")
			})
		]
	});
}
function MarketPriceCard() {
	const { lang } = useLang();
	const { profile } = useProfile();
	const loc = useProfileLocation();
	const price = marketPrices[profile.crop];
	const rows = [
		{
			label: pick(lang, "न्यूनतम", "Minimum"),
			value: price.min,
			tone: "bg-muted"
		},
		{
			label: pick(lang, "अधिकतम", "Maximum"),
			value: price.max,
			tone: "bg-muted"
		},
		{
			label: pick(lang, "मॉडल भाव", "Modal price"),
			value: price.modal,
			tone: "bg-gold-soft"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "market",
		className: "rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-xl font-bold",
					children: ["🌾 ", pick(lang, "मंडी भाव", "Mandi Price")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
					children: "Demo data"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					pick(lang, "फसल", "Crop"),
					": ",
					pick(lang, cropLabels[profile.crop], profile.crop),
					" ·",
					" ",
					pick(lang, "मंडी", "Mandi"),
					": ",
					pick(lang, loc.hi, loc.en)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center justify-between rounded-2xl ${r.tone} px-4 py-3`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base font-medium",
						children: r.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xl font-bold",
						children: [formatINR(r.value), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-normal text-muted-foreground",
							children: pick(lang, "/क्विंटल", "/quintal")
						})]
					})]
				}, r.label))
			})
		]
	});
}
var crops = [
	"Wheat",
	"Rice",
	"Soybean"
];
function CostCalculator() {
	const { lang } = useLang();
	const { profile } = useProfile();
	const [crop, setCrop] = (0, import_react.useState)(profile.crop);
	const [acres, setAcres] = (0, import_react.useState)(profile.acres);
	(0, import_react.useEffect)(() => {
		setCrop(profile.crop);
		setAcres(profile.acres);
	}, [profile.crop, profile.acres]);
	const { heads, total } = calculateCost(crop, acres);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "cost",
		className: "rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-xl font-bold",
					children: ["💰 ", pick(lang, "खेती की लागत", "Farm Cost")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
					children: "Demo data"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: crops.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCrop(c),
					className: `rounded-2xl border px-2 py-3 text-base font-semibold transition-colors ${crop === c ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`,
					children: pick(lang, cropLabels[c], c)
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-base font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pick(lang, "ज़मीन का क्षेत्रफल", "Land area") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-primary",
						children: [
							acres,
							" ",
							pick(lang, "एकड़", "acres")
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 1,
					max: 20,
					step: 1,
					value: acres,
					onChange: (e) => setAcres(Number(e.target.value)),
					"aria-label": pick(lang, "ज़मीन का क्षेत्रफल (एकड़)", "Land area (acres)"),
					className: "mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-1.5",
				children: heads.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl px-3 py-2 odd:bg-muted/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-base",
						children: [
							costHeadLabels[h.head][lang],
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									"(",
									formatINR(h.perAcre),
									"/",
									pick(lang, "एकड़", "acre"),
									")"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base font-semibold",
						children: formatINR(h.total)
					})]
				}, h.head))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between rounded-2xl bg-primary px-4 py-4 text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-semibold",
					children: pick(lang, "कुल अनुमानित लागत", "Total estimated cost")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl font-bold",
					children: formatINR(total)
				})]
			})
		]
	});
}
var suggestedQuestionsHi = [
	"कल बारिश होगी क्या?",
	"आज गेहूं का भाव क्या है?",
	"3 एकड़ गेहूं की लागत कितनी होगी?",
	"बारिश आने वाली है, खाद डालूं?",
	"मेरे गांव में और कौन गेहूं बेच रहा है?",
	"खाद सस्ती कैसे मिलेगी?",
	"फसल अभी बेचूं या store करूं?"
];
var suggestedQuestionsEn = [
	"Will it rain tomorrow?",
	"What is the wheat price today?",
	"What will 3 acres of wheat cost?",
	"Rain is coming — should I apply fertilizer?",
	"Who else is selling wheat nearby?",
	"How can I get cheaper fertilizer?",
	"Should I sell now or store my crop?"
];
var TOOL_LABELS = {
	"tool-getWeather": "मौसम देख रहा हूँ…",
	"tool-getMandiPrice": "मंडी भाव देख रहा हूँ…",
	"tool-calculateFarmCost": "लागत जोड़ रहा हूँ…",
	"tool-getCollectiveSale": "किसान समूह की बिक्री देख रहा हूँ…",
	"tool-getCollectiveBuy": "सामूहिक खरीद देख रहा हूँ…",
	"tool-getCollectiveStorage": "भंडारण विकल्प देख रहा हूँ…"
};
function ChatAssistant() {
	const { lang } = useLang();
	const [input, setInput] = (0, import_react.useState)("");
	const endRef = (0, import_react.useRef)(null);
	const { profile } = useProfile();
	const loc = useProfileLocation();
	const transport = (0, import_react.useMemo)(() => new DefaultChatTransport({ api: "/api/chat" }), []);
	const { messages, sendMessage, status, error } = useChat({ transport });
	const isLoading = status === "submitted" || status === "streaming";
	const greeting = lang === "hi" ? `नमस्ते ${profile.name} जी! मौसम, मंडी भाव, खेती की लागत या फसल की सलाह — जो पूछना हो, पूछिए।` : `Hello ${profile.name}! Ask me about weather, mandi prices, farming costs, or crop advice.`;
	const suggestions = lang === "hi" ? suggestedQuestionsHi : suggestedQuestionsEn;
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest"
		});
	}, [messages, status]);
	const ask = (question) => {
		const q = question.trim();
		if (!q || isLoading) return;
		setInput("");
		sendMessage({ text: q }, { body: { profile: {
			name: profile.name,
			crop: profile.crop,
			acres: profile.acres,
			locationHi: loc.hi,
			lat: loc.lat,
			lon: loc.lon
		} } });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "chat",
		className: "rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-xl font-bold",
					children: ["💬 ", pick(lang, "किसान साथी से पूछें", "Ask Kisan Saathi")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
					children: pick(lang, "AI सहायक", "AI Assistant")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 max-h-96 space-y-3 overflow-y-auto pr-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[92%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-base text-foreground",
							children: greeting
						})
					}),
					messages.map((m) => {
						const text = m.parts.filter((p) => p.type === "text").map((p) => "text" in p ? p.text : "").join("");
						const activeTool = m.parts.find((p) => p.type.startsWith("tool-") && TOOL_LABELS[p.type]);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: m.role === "user" ? "flex justify-end" : "flex justify-start",
							children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-base text-primary-foreground",
								children: text
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-[92%] space-y-1.5",
								children: [activeTool && !text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: TOOL_LABELS[activeTool.type]
								}), text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "prose prose-sm max-w-none rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-base text-foreground prose-p:my-1 prose-ul:my-1 prose-strong:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: text })
								})]
							})
						}, m.id);
					}),
					status === "submitted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: pick(lang, "सोच रहा हूँ…", "Thinking…")
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive",
						children: pick(lang, "जवाब नहीं मिल पाया। कृपया दोबारा कोशिश करें।", "Could not get a reply. Please try again.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: suggestions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => ask(q),
					disabled: isLoading,
					className: "rounded-full border border-primary/30 bg-leaf-soft px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary disabled:opacity-50",
					children: q
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex items-center gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					ask(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: pick(lang, "अपना सवाल लिखें…", "Type your question…"),
					"aria-label": pick(lang, "अपना सवाल लिखें", "Type your question"),
					className: "h-12 flex-1 rounded-2xl border bg-background px-4 text-base outline-none focus:ring-2 focus:ring-ring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: isLoading,
					"aria-label": pick(lang, "भेजें", "Send"),
					className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: pick(lang, "मौसम असली (Open-Meteo) है, मंडी भाव अभी डेमो डेटा है। यह पेशेवर कृषि सलाह नहीं है।", "Weather is live (Open-Meteo); mandi prices are still demo data. This is not professional agricultural advice.")
			})
		]
	});
}
function Dashboard() {
	const { lang } = useLang();
	const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
	const quickActions = [
		{
			label: pick(lang, "🌦️ मौसम", "🌦️ Weather"),
			target: "weather"
		},
		{
			label: pick(lang, "🌾 मंडी भाव", "🌾 Mandi Price"),
			target: "market"
		},
		{
			label: pick(lang, "💰 खेती की लागत", "💰 Farm Cost"),
			target: "cost"
		},
		{
			label: pick(lang, "💬 सवाल पूछें", "💬 Ask a Question"),
			target: "chat"
		},
		{
			label: pick(lang, "🤝 किसान समूह", "🤝 Kisan Collective"),
			target: "collective"
		},
		{
			label: pick(lang, "👨‍🌾 मेरा खेत", "👨‍🌾 My Farm"),
			target: "profile"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pb-12 pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "profile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmerProfile, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: quickActions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => scrollTo(a.target),
					className: "rounded-2xl border bg-card px-3 py-3 text-base font-semibold shadow-[var(--shadow-card)] transition-colors hover:bg-muted",
					children: a.label
				}, a.target))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-center text-sm text-muted-foreground",
				children: [
					pick(lang, "पहले सही जानकारी → फिर सही फैसला →", "Right info first → then right decision →"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collective",
						className: "font-semibold text-primary underline",
						children: pick(lang, "फिर मिलकर बेहतर सौदा", "then a better deal together")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectiveHighlight, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherCard, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketPriceCard, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostCalculator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatAssistant, {})
				]
			})
		]
	});
}
var SplitComponent = Dashboard;
//#endregion
export { SplitComponent as component };
