import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { _ as useProfile, a as collectiveSales, c as extraRealization, g as useLang, h as storageSummary, m as storageOptions, p as pick, r as bulkProcurement, u as formatINR } from "./collectiveData-CbgFn1e8.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft, o as ShoppingCart, p as Handshake, t as Warehouse, u as PackageOpen } from "../_libs/lucide-react.mjs";
import { n as Stat } from "./CollectiveHighlight-Kr34VKgE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collective-DhQOdP_7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DemoTag({ text }) {
	const { lang } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground",
		children: text ?? pick(lang, "डेमो / अनुमानित", "Demo / Estimated")
	});
}
function CollectivePage() {
	const { lang } = useLang();
	const { profile } = useProfile();
	const sale = collectiveSales[profile.crop];
	const myQuintals = Math.round(profile.acres * 7);
	const [joined, setJoined] = (0, import_react.useState)(false);
	const [quoted, setQuoted] = (0, import_react.useState)(false);
	const [showStorage, setShowStorage] = (0, import_react.useState)(false);
	const fert = bulkProcurement[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pb-12 pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
					" ",
					pick(lang, "डैशबोर्ड", "Dashboard")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "flex items-center gap-2 text-2xl font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-7 w-7 text-primary" }),
						" ",
						pick(lang, "किसान समूह", "Kisan Collective")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base text-muted-foreground",
					children: pick(lang, "मिलकर खरीदें, बेचें और भंडारण करें।", "Buy, sell, and store together.")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					{
						icon: "🌾",
						hi: "सामूहिक बिक्री",
						en: "Sell Together",
						href: "#sell"
					},
					{
						icon: "🛒",
						hi: "सामूहिक खरीद",
						en: "Buy Together",
						href: "#buy"
					},
					{
						icon: "🏬",
						hi: "सामूहिक भंडारण",
						en: "Store Together",
						href: "#store"
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: c.href,
					className: "rounded-3xl border bg-card p-4 shadow-[var(--shadow-card)] transition-colors hover:bg-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl",
							children: c.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-lg font-bold",
							children: pick(lang, c.hi, c.en)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: c.en
						})
					]
				}, c.href))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "sell",
				className: "mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-xl font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: "h-5 w-5 text-primary" }),
								" ",
								pick(lang, "सामूहिक बिक्री", "Collective Sale")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTag, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base",
						children: lang === "hi" ? `${sale.farmerCount} किसान ${sale.cropHi} बेचने के लिए तैयार हैं।` : `${sale.farmerCount} farmers are ready to sell ${sale.crop}.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: String(sale.farmerCount),
								label: pick(lang, "किसान", "Farmers")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: String(sale.combinedLandAcres),
								label: pick(lang, "एकड़", "Acres")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: String(sale.quantityQuintals),
								label: pick(lang, "क्विंटल", "Quintals")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: pick(lang, "अभी मंडी भाव (अकेले)", "Current mandi price (alone)"),
								value: `${formatINR(sale.currentMarketPrice)}${pick(lang, "/क्विंटल", "/quintal")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: pick(lang, "संभावित सामूहिक भाव", "Potential collective price"),
								value: `${formatINR(sale.potentialCollectivePrice)}${pick(lang, "/क्विंटल", "/quintal")}`,
								highlight: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: pick(lang, `आपकी अनुमानित उपज (${myQuintals} क्विंटल) पर संभावित अतिरिक्त कमाई`, `Estimated extra earning (${myQuintals} quintals)`),
								value: formatINR(extraRealization(profile.crop, myQuintals)),
								highlight: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pick(lang, "लक्ष्य की ओर", "Towards target") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								sale.quantityQuintals,
								" / ",
								sale.targetQuintals,
								" ",
								pick(lang, "क्विंटल", "quintals")
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-3 w-full overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${sale.quantityQuintals / sale.targetQuintals * 100}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setJoined(true),
						disabled: joined,
						className: "mt-4 h-12 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60",
						children: pick(lang, "सामूहिक बिक्री में शामिल हों", "Join collective sale")
					}),
					joined && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-2xl bg-leaf-soft px-4 py-3 text-base",
						children: pick(lang, "✅ आप सामूहिक बिक्री सूची में शामिल हो गए हैं।", "✅ You have joined the collective sale list.")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "buy",
				className: "mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-xl font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-primary" }),
								" ",
								pick(lang, "सामूहिक खरीद", "Collective Buy")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTag, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base text-muted-foreground",
						children: pick(lang, "मिलकर खरीदें और बेहतर bulk price पाने की कोशिश करें।", "Buy together and try to get a better bulk price.")
					}),
					bulkProcurement.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl bg-muted/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-semibold",
								children: pick(lang, b.inputHi, b.input)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: lang === "hi" ? `${b.farmerCount} किसानों को कुल लगभग ${b.quantityBags} बोरी की ज़रूरत।` : `${b.farmerCount} farmers need about ${b.quantityBags} bags total.`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										value: formatINR(b.individualPrice),
										label: pick(lang, "अकेले भाव/बोरी", "Individual/bag")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										value: formatINR(b.estimatedBulkPrice),
										label: pick(lang, "bulk भाव/बोरी", "Bulk price/bag")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										value: formatINR(b.individualPrice - b.estimatedBulkPrice),
										label: pick(lang, "बचत/बोरी", "Saving/bag")
									})
								]
							})
						]
					}, b.input)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: pick(lang, "डेमो अनुमान — अंतिम भाव आपूर्तिकर्ता के quotation पर निर्भर है।", "Demo estimate — final price depends on supplier quotation.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setQuoted(true),
						disabled: quoted,
						className: "mt-3 h-12 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-60",
						children: pick(lang, "Bulk quotation मांगें", "Request bulk quotation")
					}),
					quoted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-2xl bg-leaf-soft px-4 py-3 text-base",
						children: lang === "hi" ? `✅ Bulk procurement request created. (${fert.inputHi} — ${fert.quantityBags} बोरी)` : `✅ Bulk procurement request created. (${fert.input} — ${fert.quantityBags} bags)`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "store",
				className: "mt-4 rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-xl font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warehouse, { className: "h-5 w-5 text-primary" }),
								" ",
								pick(lang, "सामूहिक भंडारण", "Collective Storage")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTag, { text: "DEMO DATA" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: String(storageSummary.availableCapacityQuintals),
								label: pick(lang, "क्विंटल क्षमता", "Quintal capacity")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: String(storageSummary.groupRequirementQuintals),
								label: pick(lang, "समूह की ज़रूरत", "Group need")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								value: `${storageSummary.utilizationPct}%`,
								label: pick(lang, "उपयोग", "Usage")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: pick(lang, "अनुमानित भंडारण खर्च", "Estimated storage cost"),
							value: `${formatINR(storageSummary.estimatedCostPerQuintalMonth)}${pick(lang, "/क्विंटल/माह", "/quintal/month")}`
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowStorage((s) => !s),
						className: "mt-4 h-12 w-full rounded-2xl border border-primary/40 bg-leaf-soft text-base font-semibold text-secondary-foreground",
						children: pick(lang, "भंडारण विकल्प देखें", "View storage options")
					}),
					showStorage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2",
						children: storageOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-muted/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-base font-semibold",
								children: [
									pick(lang, s.nameHi, s.name),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted-foreground",
										children: [
											"(",
											s.name,
											")"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										value: String(s.capacityQuintals),
										label: pick(lang, "क्विंटल क्षमता", "Quintal capacity")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										value: `${s.distanceKm} km`,
										label: pick(lang, "दूरी", "Distance")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										value: formatINR(s.estimatedCostPerQuintalMonth),
										label: pick(lang, "प्रति क्विंटल/माह", "Per quintal/month")
									})
								]
							})]
						}, s.name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: pick(lang, "सभी आंकड़े डेमो/अनुमानित हैं। यहाँ कोई असली सौदा, भुगतान या अनुबंध नहीं होता।", "All figures are demo/estimated. No real transaction, payment, or contract happens here.")
			})
		]
	});
}
function Row({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ${highlight ? "bg-gold-soft" : "bg-muted"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-lg font-bold",
			children: value
		})]
	});
}
var SplitComponent = CollectivePage;
//#endregion
export { SplitComponent as component };
