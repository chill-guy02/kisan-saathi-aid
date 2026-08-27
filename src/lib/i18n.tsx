import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "hi" | "en";

const STORAGE_KEY = "kisan-saathi-lang";

/** Shell + page copy. Add new keys here; content cards fall back to Hindi. */
export const dict = {
  appName: { hi: "किसान साथी", en: "Kisan Saathi" },
  tagline: { hi: "खेती का डिजिटल साथी", en: "Your digital farming partner" },
  navHome: { hi: "डैशबोर्ड", en: "Dashboard" },
  navAsk: { hi: "किसान साथी से पूछें", en: "Ask Kisan Saathi" },
  navMarket: { hi: "मंडी", en: "Market" },
  navWeather: { hi: "मौसम व चेतावनी", en: "Weather & Alerts" },
  navCollective: { hi: "किसान समूह", en: "Kisan Collective" },
  navSchemes: { hi: "सरकारी योजनाएँ", en: "Government Schemes" },
  navSaved: { hi: "सहेजी सलाह", en: "Saved Advice" },
  navSettings: { hi: "सेटिंग्स", en: "Settings" },
  greetingMorning: { hi: "सुप्रभात", en: "Good morning" },
  greetingAfternoon: { hi: "नमस्ते", en: "Good afternoon" },
  greetingEvening: { hi: "शुभ संध्या", en: "Good evening" },
  today: { hi: "आज", en: "Today" },
  weatherSummary: { hi: "मौसम", en: "Weather" },
  cropSummary: { hi: "आपकी फसल", en: "Your crop" },
  marketSummary: { hi: "मंडी भाव", en: "Mandi price" },
  alerts: { hi: "ज़रूरी चेतावनी", en: "Important alerts" },
  recommendations: { hi: "आज की सिफ़ारिशें", en: "Today's recommendations" },
  askPlaceholder: { hi: "अपना सवाल लिखें…", en: "Type your question…" },
  askCta: { hi: "किसान साथी से पूछें", en: "Ask Kisan Saathi" },
  viewAll: { hi: "सब देखें", en: "View all" },
  demoData: { hi: "डेमो डेटा", en: "Demo data" },
  liveData: { hi: "लाइव डेटा", en: "Live data" },
  save: { hi: "सहेजें", en: "Save" },
  saved: { hi: "सहेजा गया", en: "Saved" },
  remove: { hi: "हटाएँ", en: "Remove" },
  noSaved: {
    hi: "अभी कोई सलाह सहेजी नहीं गई है। चैट के जवाब पर “सहेजें” दबाएँ।",
    en: "No saved advice yet. Tap “Save” on any assistant reply.",
  },
  profile: { hi: "किसान प्रोफ़ाइल", en: "Farmer profile" },
  language: { hi: "भाषा", en: "Language" },
  costTitle: { hi: "खेती की लागत", en: "Farm cost" },
  perQuintal: { hi: "/क्विंटल", en: "/quintal" },
  acres: { hi: "एकड़", en: "acres" },
  schemesIntro: {
    hi: "आपकी प्रोफ़ाइल के अनुसार उपयोगी सरकारी योजनाएँ (डेमो जानकारी)।",
    en: "Government schemes relevant to your profile (demo information).",
  },
} as const;

export type DictKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "hi" || raw === "en") setLangState(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l);
        try {
          localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* ignore */
        }
      },
      t: (k) => dict[k][lang],
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

/** Pick a bilingual string without the dictionary. */
export const pick = (lang: Lang, hi: string, en: string) => (lang === "hi" ? hi : en);
