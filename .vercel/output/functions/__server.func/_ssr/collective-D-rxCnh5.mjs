import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { _ as useProfile, a as collectiveSales, c as extraRealization, g as useLang, h as storageSummary, m as storageOptions, p as pick, r as bulkProcurement, u as formatINR } from "./collectiveData-CbgFn1e8.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as ArrowLeft, g as MapPin, l as ShoppingCart, m as PackageOpen, n as Warehouse, p as Package, r as Users, v as Handshake } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collective-D-rxCnh5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DemoTag({ text }) {
	const { lang } = useLang();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
		children: text ?? pick(lang, "डेमो", "Demo")
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
function Row({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${highlight ? "border-primary/20 bg-primary/5" : "bg-background"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-base font-bold",
			children: value
		})]
	});
}
function CollectivePage() {
	const { lang } = useLang();
	const { profile } = useProfile();
	const sale = collectiveSales[profile.crop];
	const myQuintals = Math.round(profile.acres * 7);
	const [tab, setTab] = (0, import_react.useState)("sell");
	const [joined, setJoined] = (0, import_react.useState)(false);
	const [quoted, setQuoted] = (0, import_react.useState)(false);
	const [showStorage, setShowStorage] = (0, import_react.useState)(false);
	const fert = bulkProcurement[0];
	const tabs = [
		{
			id: "sell",
			icon: PackageOpen,
			label: pick(lang, "बिक्री", "Sell")
		},
		{
			id: "buy",
			icon: ShoppingCart,
			label: pick(lang, "खरीद", "Buy")
		},
		{
			id: "store",
			icon: Warehouse,
			label: pick(lang, "भंडारण", "Store")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-4 pt-16",
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
					className: "flex items-center gap-2 text-xl font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-6 w-6 text-primary" }),
						" ",
						pick(lang, "किसान समूह", "Kisan Collective")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: pick(lang, "मिलकर खरीदें, बेचें और भंडारण करें।", "Buy, sell, and store together.")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-4 flex gap-1 rounded-xl border bg-card p-1 shadow-sm",
				children: tabs.map(({ id, icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(id),
					className: `flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${tab === id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex-1",
				children: [
					tab === "sell" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-1.5 text-base font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageOpen, { className: "h-5 w-5 text-primary" }), pick(lang, "सामूहिक बिक्री", "Collective Sale")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTag, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: lang === "hi" ? `${sale.farmerCount} किसान ${sale.cropHi} बेचने के लिए तैयार हैं।` : `${sale.farmerCount} farmers are ready to sell ${sale.crop}.`
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
										value: String(sale.combinedLandAcres),
										label: pick(lang, "एकड़", "Acres")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: Package,
										value: String(sale.quantityQuintals),
										label: pick(lang, "क्विंटल", "Qt")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: pick(lang, "अभी मंडी भाव (अकेले)", "Current price (alone)"),
										value: `${formatINR(sale.currentMarketPrice)}${pick(lang, "/क्विंटल", "/qt")}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: pick(lang, "संभावित सामूहिक भाव", "Potential collective price"),
										value: `${formatINR(sale.potentialCollectivePrice)}${pick(lang, "/क्विंटल", "/qt")}`,
										highlight: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: pick(lang, `आपकी अतिरिक्त कमाई (${myQuintals} क्विंटल)`, `Your extra earning (${myQuintals} qt)`),
										value: formatINR(extraRealization(profile.crop, myQuintals)),
										highlight: true
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pick(lang, "लक्ष्य की ओर", "Towards target") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										sale.quantityQuintals,
										" / ",
										sale.targetQuintals,
										" ",
										pick(lang, "क्विंटल", "qt")
									] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 h-2 w-full overflow-hidden rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-primary transition-all",
										style: { width: `${sale.quantityQuintals / sale.targetQuintals * 100}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setJoined(true),
								disabled: joined,
								className: "mt-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
								children: pick(lang, "सामूहिक बिक्री में शामिल हों", "Join collective sale")
							}),
							joined && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700",
								children: pick(lang, "✅ आप सामूहिक बिक्री में शामिल हो गए।", "✅ You joined the collective sale.")
							})
						]
					}),
					tab === "buy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-1.5 text-base font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-primary" }), pick(lang, "सामूहिक खरीद", "Collective Buy")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTag, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: pick(lang, "मिलकर खरीदें, बेहतर भाव पाएं।", "Buy together, get better prices.")
							}),
							bulkProcurement.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg border bg-background p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: pick(lang, b.inputHi, b.input)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: lang === "hi" ? `${b.farmerCount} किसानों को ${b.quantityBags} बोरी चाहिए।` : `${b.farmerCount} farmers need ${b.quantityBags} bags.`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 grid grid-cols-3 gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: Package,
												value: formatINR(b.individualPrice),
												label: pick(lang, "अकेले/बोरी", "Indiv/bag")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: Package,
												value: formatINR(b.estimatedBulkPrice),
												label: pick(lang, "bulk/बोरी", "Bulk/bag")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: Package,
												value: formatINR(b.individualPrice - b.estimatedBulkPrice),
												label: pick(lang, "बचत/बोरी", "Save/bag")
											})
										]
									})
								]
							}, b.input)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: pick(lang, "डेमो अनुमान — अंतिम भाव quotation पर निर्भर।", "Demo estimate — final price depends on quotation.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuoted(true),
								disabled: quoted,
								className: "mt-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
								children: pick(lang, "Bulk quotation मांगें", "Request bulk quotation")
							}),
							quoted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700",
								children: lang === "hi" ? `✅ Bulk request created. (${fert.inputHi} — ${fert.quantityBags} बोरी)` : `✅ Bulk request created. (${fert.input} — ${fert.quantityBags} bags)`
							})
						]
					}),
					tab === "store" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border bg-card p-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-1.5 text-base font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Warehouse, { className: "h-5 w-5 text-primary" }), pick(lang, "सामूहिक भंडारण", "Collective Storage")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTag, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: Package,
										value: String(storageSummary.availableCapacityQuintals),
										label: pick(lang, "क्षमता", "Capacity")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: Users,
										value: String(storageSummary.groupRequirementQuintals),
										label: pick(lang, "ज़रूरत", "Need")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										icon: Warehouse,
										value: `${storageSummary.utilizationPct}%`,
										label: pick(lang, "उपयोग", "Usage")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: pick(lang, "भंडारण खर्च", "Storage cost"),
									value: `${formatINR(storageSummary.estimatedCostPerQuintalMonth)}${pick(lang, "/क्विंटल/माह", "/qt/mo")}`
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowStorage((s) => !s),
								className: "mt-3 h-11 w-full rounded-xl border border-primary/30 bg-primary/5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10",
								children: pick(lang, "भंडारण विकल्प देखें", "View storage options")
							}),
							showStorage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 space-y-2",
								children: storageOptions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border bg-background p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold",
										children: [
											pick(lang, s.nameHi, s.name),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground",
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
												icon: Package,
												value: String(s.capacityQuintals),
												label: pick(lang, "क्षमता", "Cap")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: MapPin,
												value: `${s.distanceKm} km`,
												label: pick(lang, "दूरी", "Dist")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
												icon: Warehouse,
												value: formatINR(s.estimatedCostPerQuintalMonth),
												label: pick(lang, "/क्विंटल/माह", "/qt/mo")
											})
										]
									})]
								}, s.name))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: pick(lang, "सभी आंकड़े डेमो हैं। कोई असली सौदा नहीं।", "All figures are demo. No real transactions.")
			})
		]
	});
}
var SplitComponent = CollectivePage;
//#endregion
export { SplitComponent as component };
