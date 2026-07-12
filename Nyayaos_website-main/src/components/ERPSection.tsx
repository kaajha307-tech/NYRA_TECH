import { useSoundZone } from "@/lib/sound-context";

const MODULES = [
  "HR Management", "Finance", "Inventory", "CRM", "Sales",
  "Marketing", "Projects", "Procurement", "Workflow Automation", "Analytics & Reporting",
];

export function ERPSection() {
  const ref = useSoundZone("erp");
  return (
    <section id="erp" ref={ref as React.RefObject<HTMLElement>} className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan">ERP Ecosystem</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Every department, <span className="text-gradient">one nervous system.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-cyan to-neon opacity-30 blur-3xl" />
          <div className="relative glass-strong rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {MODULES.map((m, i) => (
                <div
                  key={m}
                  className="group relative glass rounded-xl px-3 py-4 text-center text-sm font-medium hover:scale-105 transition-transform overflow-hidden"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/0 to-neon/0 group-hover:from-cyan/10 group-hover:to-neon/20 transition-colors" />
                  <div className="relative">
                    <div className="mx-auto mb-2 h-2 w-2 rounded-full bg-gradient-to-r from-cyan to-neon animate-pulse" />
                    {m}
                  </div>
                </div>
              ))}
            </div>
            {/* Pipeline */}
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {["Realtime sync", "AI workflow router", "Unified analytics"].map((t) => (
                <div key={t} className="glass rounded-xl p-4">
                  <div className="text-xs text-cyan uppercase tracking-wider">Pipeline</div>
                  <div className="mt-1 font-display text-lg font-semibold">{t}</div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-cyan to-neon animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
