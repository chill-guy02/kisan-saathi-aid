import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { getAnswer, suggestedQuestions } from "@/lib/chatEngine";

type Msg = { role: "user" | "assistant"; text: string };

export function ChatAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "नमस्ते रमेश जी! मौसम, मंडी भाव या खेती की लागत — जो पूछना हो, पूछिए।",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, thinking]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: getAnswer(q).text }]);
      setThinking(false);
    }, 500);
  };

  return (
    <section id="chat" className="rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">💬 किसान साथी से पूछें</h2>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          प्रोटोटाइप सलाह
        </span>
      </header>

      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-base text-primary-foreground"
                  : "max-w-[92%] rounded-2xl rounded-bl-md bg-muted px-4 py-2.5 text-base text-foreground"
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="text-sm text-muted-foreground">सोच रहा हूँ…</div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            className="rounded-full border border-primary/30 bg-leaf-soft px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary"
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
          aria-label="भेजें"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      <p className="mt-3 text-xs text-muted-foreground">
        यह एक प्रोटोटाइप है — दी गई जानकारी डेमो डेटा पर आधारित है, पेशेवर कृषि सलाह नहीं।
      </p>
    </section>
  );
}
