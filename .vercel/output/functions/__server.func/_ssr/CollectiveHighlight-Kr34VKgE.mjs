import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { _ as useProfile, a as collectiveSales, g as useLang, p as pick, u as formatINR } from "./collectiveData-CbgFn1e8.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Handshake } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CollectiveHighlight-Kr34VKgE.js
var import_jsx_runtime = require_jsx_runtime();
/** Dashboard entry point for the Kisan Collective module. */
function CollectiveHighlight() {
	const { lang } = useLang();
	const { profile } = useProfile();
	const sale = collectiveSales[profile.crop];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "collective",
		className: "rounded-3xl border border-primary/30 bg-leaf-soft p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-xl font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "h-6 w-6 text-primary" }),
						" ",
						pick(lang, "किसान समूह", "Kisan Collective")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-card px-2.5 py-1 text-xs text-muted-foreground",
					children: pick(lang, "किसान समूह · डेमो", "Kisan Collective · Demo")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-base text-foreground",
				children: pick(lang, "आपके आसपास के किसान मिलकर बेहतर कीमत और कम लागत पा सकते हैं।", "Nearby farmers can get better prices and lower costs together.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: String(sale.farmerCount),
						label: pick(lang, "किसान", "Farmers")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${sale.combinedLandAcres}`,
						label: pick(lang, "एकड़ ज़मीन", "Acres")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: `${sale.quantityQuintals}`,
						label: pick(lang, "क्विंटल उपलब्ध", "Quintals")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-muted-foreground",
					children: pick(lang, "आज का किसान अवसर", "Today's farmer opportunity")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-base",
					children: lang === "hi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						sale.farmerCount,
						" किसान ",
						sale.cropHi,
						" बेचने के लिए तैयार हैं। सभी मिलकर बेचें तो लगभग",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [sale.quantityQuintals, " क्विंटल"] }),
						" की collective lot बन सकती है — संभावित भाव ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [formatINR(sale.potentialCollectivePrice), "/क्विंटल"] }),
						" (अभी",
						" ",
						formatINR(sale.currentMarketPrice),
						")।"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						sale.farmerCount,
						" farmers are ready to sell ",
						sale.crop,
						". Selling together could form a collective lot of ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [sale.quantityQuintals, " quintals"] }),
						" — potential price",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [formatINR(sale.potentialCollectivePrice), "/quintal"] }),
						" (now",
						" ",
						formatINR(sale.currentMarketPrice),
						")."
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/collective",
				className: "mt-4 flex h-12 items-center justify-center rounded-2xl bg-primary px-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90",
				children: pick(lang, "सामूहिक अवसर देखें", "View collective opportunities")
			})
		]
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card px-2 py-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-2xl font-bold text-primary",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { Stat as n, CollectiveHighlight as t };
