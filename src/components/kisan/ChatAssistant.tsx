import { useEffect, useMemo, useRef, useState } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { suggestedQuestions } from "@/lib/chatEngine";
import { useProfile, useProfileLocation } from "@/lib/profile";

const TOOL_LABELS: Record<string, string> = {
  "tool-getWeather": "मौसम देख रहा हूँ…",
  "tool-getMandiPrice": "मंडी भाव देख रहा हूँ…",
  "tool-calculateFarmCost": "लागत जोड़ रहा हूँ…",
};

export function ChatAssistant() {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfile();
  const loc = useProfileLocation();
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";
  const greeting = `नमस्ते ${profile.name} जी! मौसम, मंडी भाव, खेती की लागत या फसल की सलाह — जो पूछना हो, पूछिए।`;

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
    <section id="chat" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">💬 किसान साथी से पूछें</h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          AI सहायक
        </span>
      </header>

      <div className="mt-4 max-h-96 space-y-3 overflow-y-auto pr-1">
        <div className="flex justify-start">
          <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-base text-foreground">
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
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-base text-primary-foreground">
                  {text}
                </div>
              ) : (
                <div className="max-w-[92%] space-y-1.5">
                  {activeTool && !text && (
                    <div className="text-sm text-muted-foreground">
                      {TOOL_LABELS[activeTool.type]}
                    </div>
                  )}
                  {text && (
                    <div className="prose prose-sm max-w-none rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-base text-foreground prose-p:my-1 prose-ul:my-1 prose-strong:text-foreground">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {status === "submitted" && <div className="text-sm text-muted-foreground">सोच रहा हूँ…</div>}
        {error && (
          <div className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            जवाब नहीं मिल पाया। कृपया दोबारा कोशिश करें।
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            disabled={isLoading}
            className="rounded-full border border-primary/30 bg-leaf-soft px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="अपना सवाल लिखें…"
          aria-label="अपना सवाल लिखें"
          className="h-12 flex-1 rounded-2xl border bg-background px-4 text-base outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label="भेजें"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      <p className="mt-3 text-xs text-muted-foreground">
        मौसम असली (Open-Meteo) है, मंडी भाव अभी डेमो डेटा है। यह पेशेवर कृषि सलाह नहीं है।
      </p>
    </section>
  );
}
