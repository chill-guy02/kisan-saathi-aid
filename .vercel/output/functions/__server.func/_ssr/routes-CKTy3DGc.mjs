import { i as __toESM } from "../_runtime.mjs";
import { n as DefaultChatTransport, o as require_jsx_runtime, s as require_react, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { _ as useProfile, a as collectiveSales, d as locations, f as marketPrices, g as useLang, i as calculateCost, o as costHeadLabels, p as pick, s as cropLabels, u as formatINR, v as useProfileLocation, y as weatherDemo } from "./collectiveData-CbgFn1e8.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, S as CircleUser, T as Bot, a as Umbrella, b as CloudSun, c as Sprout, d as Ruler, f as Pencil, g as MapPin, h as MessageSquare, i as User, o as TrendingUp, p as Package, r as Users, s as Thermometer, t as Wheat, u as Send, v as Handshake, w as Calculator, x as CloudRain, y as Droplets } from "../_libs/lucide-react.mjs";
import { n as fetchWeather } from "./weather-xTWzjgY3.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CKTy3DGc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var crops$1 = [
	"Wheat",
	"Rice",
	"Soybean"
];
function FarmerProfile({ full = false }) {
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
	if (!full && !editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex items-center gap-3 rounded-xl p-3 text-primary-foreground shadow-sm",
		style: { backgroundImage: "var(--gradient-hero)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-lg",
				children: "🌾"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-bold",
					children: [
						profile.name,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-70",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-normal opacity-90",
							children: pick(lang, loc.hi, loc.en)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs opacity-80",
					children: [
						pick(lang, cropLabels[profile.crop], profile.crop),
						" · ",
						profile.acres,
						" ",
						pick(lang, "एकड़", "acres")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setEditing(true),
				className: "flex h-8 items-center gap-1 rounded-lg bg-white/20 px-2.5 text-xs font-semibold transition-colors hover:bg-white/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }), pick(lang, "बदलें", "Edit")]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl p-4 text-primary-foreground shadow-sm",
		style: { backgroundImage: "var(--gradient-hero)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-xl",
					children: "🌾"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold leading-tight",
						children: pick(lang, "किसान साथी", "Kisan Saathi")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs opacity-80",
						children: pick(lang, "आपकी खेती का डिजिटल साथी", "Your digital farming partner")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setEditing((e) => !e),
					className: "flex h-8 items-center gap-1.5 rounded-lg bg-white/20 px-2.5 text-xs font-semibold transition-colors hover:bg-white/30",
					children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), editing ? pick(lang, "सहेजें", "Save") : pick(lang, "बदलें", "Edit")]
				})
			]
		}), !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-2 gap-2",
			children: items.map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-white/10 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-xs opacity-80",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), label]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-sm font-semibold",
					children: value
				})]
			}, label))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3 rounded-lg bg-white/10 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs opacity-80",
						children: pick(lang, "किसान का नाम", "Farmer name")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: profile.name,
						onChange: (e) => updateProfile({ name: e.target.value }),
						className: "mt-1 h-10 w-full rounded-lg border-0 bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs opacity-80",
						children: pick(lang, "स्थान", "Location")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: profile.locationId,
						onChange: (e) => updateProfile({ locationId: e.target.value }),
						className: "mt-1 h-10 w-full rounded-lg border-0 bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring",
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
					className: "text-xs opacity-80",
					children: pick(lang, "मुख्य फसल", "Main crop")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 grid grid-cols-3 gap-1.5",
					children: crops$1.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => updateProfile({ crop: c }),
						className: `rounded-lg px-2 py-2 text-sm font-semibold transition-colors ${profile.crop === c ? "bg-background text-foreground" : "bg-white/20 hover:bg-white/30"}`,
						children: pick(lang, cropLabels[c], c)
					}, c))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-80",
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
					className: "mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/30"
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
			value: `${w.temperatureC}°C`,
			color: "text-orange-500"
		},
		{
			icon: Umbrella,
			label: pick(lang, "बारिश संभावना", "Rain chance"),
			value: `${w.rainProbability}%`,
			color: "text-blue-500"
		},
		{
			icon: CloudRain,
			label: pick(lang, "वर्षा", "Rainfall"),
			value: `${w.rainfallMm} mm`,
			color: "text-sky-500"
		},
		{
			icon: Droplets,
			label: pick(lang, "नमी", "Humidity"),
			value: `${w.humidity}%`,
			color: "text-cyan-500"
		}
	];
	const interpretationEn = w.rainProbability >= 60 ? "High chance of rain tomorrow." : w.rainProbability >= 30 || w.rainfallMm > 1 ? "Light rain possible tomorrow." : "Likely clear weather tomorrow.";
	const interpretation = lang === "hi" ? w.interpretationHi : interpretationEn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-1.5 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "h-5 w-5 text-primary" }), pick(lang, "मौसम", "Weather")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), pick(lang, loc.hi, loc.en)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-2 py-0.5 text-xs font-medium ${w.live ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`,
						children: isLoading ? "…" : w.live ? pick(lang, "लाइव", "Live") : "Demo"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: stats.map(({ icon: Icon, label, value, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-background px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 ${color}` }), label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 text-xl font-bold",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base",
					children: "💡"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-foreground",
					children: interpretation
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: isError ? pick(lang, "लाइव मौसम नहीं मिल सका।", "Live weather unavailable.") : pick(lang, "स्रोत: Open-Meteo", "Source: Open-Meteo")
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
			tone: "text-muted-foreground"
		},
		{
			label: pick(lang, "अधिकतम", "Maximum"),
			value: price.max,
			tone: "text-muted-foreground"
		},
		{
			label: pick(lang, "मॉडल भाव", "Modal price"),
			value: price.modal,
			tone: "text-primary"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-1.5 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheat, { className: "h-5 w-5 text-primary" }), pick(lang, "मंडी भाव", "Mandi Price")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
					children: "Demo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: pick(lang, cropLabels[profile.crop], profile.crop)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: pick(lang, loc.hi, loc.en)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-1.5",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg border bg-background px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-muted-foreground",
						children: r.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `text-lg font-bold ${r.tone}`,
						children: [formatINR(r.value), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-normal text-muted-foreground",
							children: pick(lang, "/क्विंटल", "/qt")
						})]
					})]
				}, r.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: pick(lang, "डेमो डेटा — Agmarknet/eNAM API से बदला जाएगा", "Demo data — will be replaced with Agmarknet/eNAM API")
				})]
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
		className: "rounded-xl border bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-1.5 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-5 w-5 text-primary" }), pick(lang, "खेती की लागत", "Farm Cost")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
					children: "Demo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-1.5",
				children: crops.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setCrop(c),
					className: `flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-sm font-semibold transition-all ${crop === c ? "border-primary bg-primary text-primary-foreground shadow-sm" : "bg-background hover:bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-3.5 w-3.5" }), pick(lang, cropLabels[c], c)]
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg border bg-background px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: pick(lang, "ज़मीन", "Land area")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
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
					"aria-label": pick(lang, "ज़मीन का क्षेत्रफल", "Land area"),
					className: "mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-1",
				children: heads.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg px-3 py-1.5 odd:bg-muted/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm",
						children: [
							costHeadLabels[h.head][lang],
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									"(",
									formatINR(h.perAcre),
									"/",
									pick(lang, "एकड़", "ac"),
									")"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						children: formatINR(h.total)
					})]
				}, h.head))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold",
					children: pick(lang, "कुल लागत", "Total cost")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl font-bold",
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
	"tool-getWeather": "🌤️ मौसम देख रहा हूँ…",
	"tool-getMandiPrice": "🌾 मंडी भाव देख रहा हूँ…",
	"tool-calculateFarmCost": "💰 लागत जोड़ रहा हूँ…",
	"tool-getCollectiveSale": "🤝 सामूहिक बिक्री देख रहा हूँ…",
	"tool-getCollectiveBuy": "🛒 सामूहिक खरीद देख रहा हूँ…",
	"tool-getCollectiveStorage": "🏬 भंडारण देख रहा हूँ…"
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
		className: "flex flex-col rounded-xl border bg-card p-4 shadow-sm",
		style: { minHeight: "70vh" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-1.5 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5 text-primary" }), pick(lang, "किसान साथी से पूछें", "Ask Kisan Saathi")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary",
					children: pick(lang, "AI सहायक", "AI")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex-1 space-y-2.5 overflow-y-auto pr-1",
				style: { maxHeight: "50vh" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[90%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm text-foreground",
							children: greeting
						})
					}),
					messages.map((m) => {
						const text = m.parts.filter((p) => p.type === "text").map((p) => "text" in p ? p.text : "").join("");
						const activeTool = m.parts.find((p) => p.type.startsWith("tool-") && TOOL_LABELS[p.type]);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: m.role === "user" ? "flex justify-end" : "flex justify-start",
							children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex max-w-[85%] items-start gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground",
									children: text
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-primary" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex max-w-[90%] items-start gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3.5 w-3.5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [activeTool && !text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: TOOL_LABELS[activeTool.type]
									}), text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "prose prose-sm max-w-none rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm text-foreground prose-p:my-0.5 prose-ul:my-0.5 prose-strong:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { children: text })
									})]
								})]
							})
						}, m.id);
					}),
					status === "submitted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4 text-primary" }), pick(lang, "सोच रहा हूँ…", "Thinking…")]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: pick(lang, "जवाब नहीं मिला। दोबारा कोशिश करें।", "No reply. Please try again.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-1.5",
				children: suggestions.slice(0, 4).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => ask(q),
					disabled: isLoading,
					className: "rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-primary transition-colors hover:bg-primary/10 disabled:opacity-50",
					children: q
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex items-center gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					ask(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: pick(lang, "अपना सवाल लिखें…", "Type your question…"),
					"aria-label": pick(lang, "सवाल लिखें", "Type question"),
					className: "h-11 flex-1 rounded-xl border bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-ring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: isLoading,
					"aria-label": pick(lang, "भेजें", "Send"),
					className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: pick(lang, "मौसम असली है, बाकी डेमो डेटा। यह पेशेवर सलाह नहीं है।", "Weather is live; other data is demo. Not professional advice.")
			})
		]
	});
}
function CollectiveHighlight() {
	const { lang } = useLang();
	const { profile } = useProfile();
	const sale = collectiveSales[profile.crop];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-primary/20 bg-card p-4 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-1.5 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-5 w-5 text-primary" }), pick(lang, "किसान समूह", "Kisan Collective")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
					children: "Demo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: pick(lang, "आसपास के किसान मिलकर बेहतर कीमत पा सकते हैं।", "Nearby farmers can get better prices together.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Users,
						value: String(sale.farmerCount),
						label: pick(lang, "किसान", "Farmers")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: MapPin,
						value: `${sale.combinedLandAcres}`,
						label: pick(lang, "एकड़", "Acres")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Package,
						value: `${sale.quantityQuintals}`,
						label: pick(lang, "क्विंटल", "Qt")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg bg-primary/5 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold text-muted-foreground",
					children: pick(lang, "आज का अवसर", "Today's opportunity")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: lang === "hi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						sale.farmerCount,
						" किसान मिलकर बेचें तो ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [formatINR(sale.potentialCollectivePrice), "/क्विंटल"] }),
						" संभव (अभी ",
						formatINR(sale.currentMarketPrice),
						")।"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						sale.farmerCount,
						" farmers selling together could get ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [formatINR(sale.potentialCollectivePrice), "/qt"] }),
						" (now ",
						formatINR(sale.currentMarketPrice),
						")."
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/collective",
				className: "mt-3 flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90",
				children: pick(lang, "सामूहिक अवसर देखें", "View opportunities")
			})
		]
	});
}
function Stat({ icon: Icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border bg-background px-2 py-2.5 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto h-4 w-4 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-lg font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: label
			})
		]
	});
}
function Dashboard() {
	const { lang } = useLang();
	const [tab, setTab] = (0, import_react.useState)("weather");
	const tabs = [
		{
			id: "weather",
			icon: CloudSun,
			label: pick(lang, "मौसम", "Weather")
		},
		{
			id: "market",
			icon: Wheat,
			label: pick(lang, "मंडी भाव", "Market")
		},
		{
			id: "cost",
			icon: Calculator,
			label: pick(lang, "लागत", "Cost")
		},
		{
			id: "chat",
			icon: MessageSquare,
			label: pick(lang, "सवाल पूछें", "Ask")
		},
		{
			id: "collective",
			icon: Handshake,
			label: pick(lang, "समूह", "Collective")
		},
		{
			id: "profile",
			icon: CircleUser,
			label: pick(lang, "मेरा खेत", "Profile")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-4 pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmerProfile, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-16 z-30 mt-4 flex gap-1 overflow-x-auto rounded-xl border bg-card/95 p-1 shadow-sm backdrop-blur",
				children: tabs.map(({ id, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(id),
					className: `flex min-w-[4.5rem] flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition-all ${tab === id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), label]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex-1",
				children: [
					tab === "weather" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherCard, {}),
					tab === "market" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketPriceCard, {}),
					tab === "cost" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostCalculator, {}),
					tab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatAssistant, {}),
					tab === "collective" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectiveHighlight, {}),
					tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmerProfile, { full: true })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-center text-xs text-muted-foreground",
				children: [
					pick(lang, "पहले सही जानकारी → फिर सही फैसला →", "Right info first → then right decision →"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collective",
						className: "font-semibold text-primary underline",
						children: pick(lang, "फिर मिलकर बेहतर सौदा", "then a better deal together")
					})
				]
			})
		]
	});
}
var SplitComponent = Dashboard;
//#endregion
export { SplitComponent as component };
