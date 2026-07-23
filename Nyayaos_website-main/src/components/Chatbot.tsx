import { MessageSquare, Send, X, LifeBuoy, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Msg = { role: "user" | "bot" | "system"; text: string };

const SUGGESTED = [
  "What services do you offer?",
  "Book a consultation",
  "Talk to a human",
  "Pricing for AI development",
];

const KB: { match: RegExp; reply: string }[] = [
  { match: /service|offer|do you/i, reply: "We deliver 13 disciplines — from AI & LLM development to VFX. Open the Services section to explore each one." },
  { match: /price|pricing|cost/i, reply: "Engagements start at $8k for focused sprints and scale to enterprise retainers. Want a custom quote? Tap 'Live support' above." },
  { match: /book|consult|meeting|call/i, reply: "Scroll to the Command Center and pick 'Schedule a call' — you'll get an instant email confirmation." },
  { match: /ai|llm|agent/i, reply: "Our AI Core ships agentic workflows, RAG, voice copilots, eval and guardrails — all production-grade." },
  { match: /erp|crm/i, reply: "Our ERP/CRM stack unifies HR, Finance, Inventory, Sales, Marketing and Projects with realtime BI." },
  { match: /human|support|agent|person/i, reply: "Tap the 'Live support' button at the top — drop your email and a NYGENX  specialist will call you back." },
];

function reply(text: string) {
  for (const k of KB) if (k.match.test(text)) return k.reply;
  return "Got it. A NYGENX  strategist will follow up — meanwhile try a suggested prompt or request live support.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [handoffEmail, setHandoffEmail] = useState("");
  const [handoffName, setHandoffName] = useState("");
  const [handoffPhone, setHandoffPhone] = useState("");
  const [handoffStatus, setHandoffStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    try {
      const saved = localStorage.getItem("NYGENX :chat");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [{ role: "bot", text: "Hi, I'm Nyx — the NYGENX  assistant. Ask anything about our services or tap Live support to talk to a human." }];
  });
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("NYGENX :chat", JSON.stringify(msgs));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: t }]);
    if (/human|support|agent|person|call.?me|talk to/i.test(t)) {
      setTimeout(() => setHandoffOpen(true), 400);
    }
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: reply(t) }]), 600);
  };

  const submitHandoff = async (e: React.FormEvent) => {
    e.preventDefault();
    setHandoffStatus("sending");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "live_support",
          name: handoffName.trim() || "Chat visitor",
          email: handoffEmail.trim(),
          phone: handoffPhone.trim() || null,
          topic: "Live support handoff (chatbot)",
          message: "Visitor requested a call-back via Nyx chatbot.",
        }),
      });
      if (!res.ok) throw new Error();
      setHandoffStatus("done");
      setMsgs((m) => [
        ...m,
        {
          role: "system",
          text: `Call request received. We've emailed next steps to ${handoffEmail}. A NYGENX  specialist will call shortly.`,
        },
      ]);
      setTimeout(() => {
        setHandoffOpen(false);
        setHandoffStatus("idle");
      }, 2000);
    } catch {
      setHandoffStatus("error");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[60] grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br from-cyan to-neon text-primary-foreground neon hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <>
          <div
            className="fixed inset-0 z-[70] bg-background/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] w-[420px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] glass-strong rounded-2xl overflow-hidden flex flex-col neon animate-in fade-in zoom-in-95">


          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <div className="font-display font-semibold text-sm">Nyx · AI assistant</div>
              <div className="text-[11px] text-cyan flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> online
              </div>
            </div>
            <button
              onClick={() => setHandoffOpen(true)}
              className="text-xs flex items-center gap-1 rounded-lg glass px-2 py-1 hover:text-cyan transition-colors"
            >
              <LifeBuoy className="h-3.5 w-3.5" /> Live support
            </button>
          </div>

          {handoffOpen ? (
            <div className="p-4 space-y-3">
              {handoffStatus === "done" ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-10 w-10 text-cyan mx-auto" />
                  <p className="mt-3 text-sm">Request sent. Check your email for next steps.</p>
                </div>
              ) : (
                <form onSubmit={submitHandoff} className="space-y-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-cyan mb-1">Request a call-back</div>
                    <p className="text-[11px] text-muted-foreground">
                      Drop your details — we'll email you next steps and call within minutes.
                    </p>
                  </div>
                  <input
                    required
                    placeholder="Your name"
                    value={handoffName}
                    onChange={(e) => setHandoffName(e.target.value)}
                    className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Work email"
                    value={handoffEmail}
                    onChange={(e) => setHandoffEmail(e.target.value)}
                    className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={handoffPhone}
                    onChange={(e) => setHandoffPhone(e.target.value)}
                    className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                  />
                  {handoffStatus === "error" && (
                    <p className="text-[11px] text-destructive">Couldn't send. Try again.</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setHandoffOpen(false)}
                      className="flex-1 rounded-lg glass px-3 py-2 text-xs hover:text-cyan transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={handoffStatus === "sending"}
                      className="flex-1 rounded-lg bg-gradient-to-br from-cyan to-neon text-primary-foreground px-3 py-2 text-xs font-medium disabled:opacity-50"
                    >
                      {handoffStatus === "sending" ? "Sending…" : "Request call"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              <div className="flex-1 max-h-[360px] overflow-y-auto p-3 space-y-2">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-cyan to-neon text-primary-foreground"
                          : m.role === "system"
                            ? "glass text-cyan border border-cyan/30"
                            : "glass"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] rounded-full glass px-2.5 py-1 hover:text-cyan transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="p-3 border-t border-border flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Nyx…"
                  className="flex-1 rounded-xl bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-cyan to-neon text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
