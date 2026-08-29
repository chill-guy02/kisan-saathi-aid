import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "hi" ? "en" : "hi")}
      className="fixed right-4 top-4 z-50 flex h-10 items-center gap-1.5 rounded-full border bg-card/95 px-3.5 text-sm font-bold shadow-md backdrop-blur transition-colors hover:bg-muted"
      aria-label={lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
    >
      <Languages className="h-4 w-4" />
      {lang === "hi" ? "EN" : "हिं"}
    </button>
  );
}
