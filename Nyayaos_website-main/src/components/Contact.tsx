import { Mail, Phone, User, Send, CalendarClock, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { useMemo, useState } from "react";
import { useSoundZone } from "@/lib/sound-context";

type Tab = "message" | "schedule";

function nextSlots(): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const now = new Date();
  let d = new Date(now);
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 2);
  while (out.length < 6) {
    const day = d.getDay();
    const hour = d.getHours();
    if (day !== 0 && day !== 6 && hour >= 10 && hour <= 18) {
      out.push({
        iso: d.toISOString(),
        label: d.toLocaleString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      });
    }
    d = new Date(d.getTime() + 60 * 60 * 1000);
  }
  return out;
}

export function Contact() {
  const ref = useSoundZone("contact");
  const [tab, setTab] = useState<Tab>("message");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [slot, setSlot] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string>("");

  const slots = useMemo(() => nextSlots(), []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: tab,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          topic: topic.trim() || null,
          message: message.trim() || null,
          preferred_at: tab === "schedule" ? slot || null : null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "failed");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const reset = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setPhone("");
    setTopic("");
    setMessage("");
    setSlot("");
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 md:py-32 overflow-hidden"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute left-1/4 bottom-10 h-[260px] w-[420px] rounded-full bg-neon/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-cyan">Command Center</span>
        <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
          Open a <span className="text-gradient">direct channel.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Send a message or schedule a call — you'll receive an instant confirmation email and
          our team replies within minutes.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-12">
        {/* Tabs */}
        <div className="mx-auto flex w-fit rounded-2xl glass p-1 mb-8">
          {([
            { id: "message" as const, label: "Send message", icon: MessageSquare },
            { id: "schedule" as const, label: "Schedule a call", icon: CalendarClock },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setStatus("idle");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? "bg-gradient-to-br from-cyan to-neon text-primary-foreground neon"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        <div className="glass-strong rounded-3xl p-8 md:p-10 relative">
          {status === "done" ? (
            <div className="text-center py-10">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-cyan to-neon grid place-items-center neon mb-5">
                <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold">
                {tab === "schedule" ? "Call scheduled." : "Message received."}
              </h3>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                A confirmation email is on its way to <span className="text-cyan">{email}</span>.
                The NYRA TECH  team will reach out shortly.
              </p>
              <button
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm hover:text-cyan transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Your name">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                    maxLength={120}
                  />
                </Field>
                <Field label="Work email">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                    maxLength={255}
                  />
                </Field>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Phone (optional)">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 …"
                    className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                    maxLength={40}
                  />
                </Field>
                <Field label="Topic">
                  <input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="AI · ERP · VFX · Studio …"
                    className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50"
                    maxLength={160}
                  />
                </Field>
              </div>

              {tab === "message" && (
                <Field label="Brief">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us what you're building…"
                    className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/50 resize-none"
                    maxLength={4000}
                  />
                </Field>
              )}

              {tab === "schedule" && (
                <Field label="Pick a time">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {slots.map((s) => (
                      <button
                        type="button"
                        key={s.iso}
                        onClick={() => setSlot(s.iso)}
                        className={`text-xs px-3 py-2.5 rounded-xl border transition-all ${
                          slot === s.iso
                            ? "border-cyan bg-cyan/10 text-cyan neon"
                            : "border-border glass hover:border-cyan/50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              {status === "error" && (
                <div className="text-xs text-destructive">{error}</div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                <p className="text-[11px] text-muted-foreground">
                  By submitting you'll receive an automated confirmation email.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending" || (tab === "schedule" && !slot)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan to-neon text-primary-foreground px-6 py-3 text-sm font-medium neon hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {tab === "schedule" ? "Confirm booking" : "Send message"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Founder direct card */}
        <div className="mt-8 glass rounded-2xl p-6 mx-auto max-w-2xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cyan">Or reach the founder directly</div>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan to-neon grid place-items-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold">Harsha Vardhan Kakani</div>
                <div className="text-[11px] text-muted-foreground">Founder · NYRA TECH </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:+917013345054"
                className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-xs hover:text-cyan transition-colors"
              >
                <Phone className="h-3.5 w-3.5" /> +91 70133 45054
              </a>
              <a
                href="mailto:NYRA TECH .official@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-xl glass px-3 py-2 text-xs hover:text-cyan transition-colors"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
