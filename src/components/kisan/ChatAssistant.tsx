import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { suggestedQuestionsHi, suggestedQuestionsEn } from "@/lib/chatEngine";
import { useProfile, useProfileLocation } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

const TOOL_LABELS: Record<string, string> = {
  "tool-getWeather": "🌤️ मौसम देख रहा हूँ…",
  "tool-getMandiPrice": "🌾 मंडी भाव देख रहा हूँ…",
  "tool-calculateFarmCost": "💰 लागत जोड़ रहा हूँ…",
  "tool-getCollectiveSale": "🤝 सामूहिक बिक्री देख रहा हूँ…",
  "tool-getCollectiveBuy": "🛒 सामूहिक खरीद देख रहा हूँ…",
  "tool-getCollectiveStorage": "🏬 भंडारण देख रहा हूँ…",
};

export function ChatAssistant() {
  const { lang } = useLang();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfile();
  const loc = useProfileLocation();
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";
  const greeting =
    lang === "hi"
      ? `नमस्ते ${profile.name} जी! मौसम, मंडी भाव, खेती की लागत या फसल की सलाह — जो पूछना हो, पूछिए।`
      : `Hello ${profile.name}! Ask me about weather, mandi prices, farming costs, or crop advice.`;
  const suggestions = lang === "hi" ? suggestedQuestionsHi : suggestedQuestionsEn;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, status]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || isLoading) return;
    setInput("");
    void sendMessage(
      { text: q },
      {
        body: {
          profile: {
            name: profile.name,
            crop: profile.crop,
            acres: profile.acres,
            locationHi: loc.hi,
            lat: loc.lat,
            lon: loc.lon,
          },
        },
      },
    );
  };

  return (
    <section className="flex flex-col rounded-xl border bg-card p-4 shadow-sm" style={{ minHeight: "70vh" }}>
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <Bot className="h-5 w-5 text-primary" />
          {pick(lang, "किसान साथी से पूछें", "Ask Kisan Saathi")}
        </h2>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {pick(lang, "AI सहायक", "AI")}
        </span>
      </header>

      <div className="mt-3 flex-1 space-y-2.5 overflow-y-auto pr-1" style={{ maxHeight: "50vh" }}>
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm text-foreground">
            {greeting}
          </div>
        </div>

        {messages.map((m) => {
          const text = m.parts
            .filter((p) => p.type === "text")
            .map((p) => ("text" in p ? p.text : ""))
            .join("");
          const activeTool = m.parts.find(
            (p) => p.type.startsWith("tool-") && TOOL_LABELS[p.type],
          );

          return (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              {m.role === "user" ? (
                <div className="flex max-w-[85%] items-start gap-1.5">
                  <div className="rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    {text}
                  </div>
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>
              ) : (
                <div className="flex max-w-[90%] items-start gap-1.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    {activeTool && !text && (
                      <div className="text-xs text-muted-foreground">
                        {TOOL_LABELS[activeTool.type]}
                      </div>
                    )}
                    {text && (
                      <div className="prose prose-sm max-w-none rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-sm text-foreground prose-p:my-0.5 prose-ul:my-0.5 prose-strong:text-foreground">
                        <ReactMarkdown>{text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bot className="h-4 w-4 text-primary" />
            {pick(lang, "सोच रहा हूँ…", "Thinking…")}
          </div>
        )}
        {error && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {pick(lang, "जवाब नहीं मिला। दोबारा कोशिश करें।", "No reply. Please try again.")}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {suggestions.slice(0, 4).map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            disabled={isLoading}
            className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={pick(lang, "अपना सवाल लिखें…", "Type your question…")}
          aria-label={pick(lang, "सवाल लिखें", "Type question")}
          className="h-11 flex-1 rounded-xl border bg-background px-3.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label={pick(lang, "भेजें", "Send")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-2 text-xs text-muted-foreground">
        {pick(
          lang,
          "मौसम असली है, बाकी डेमो डेटा। यह पेशेवर सलाह नहीं है।",
          "Weather is live; other data is demo. Not professional advice.",
        )}
      </p>
    </section>
  );
}
