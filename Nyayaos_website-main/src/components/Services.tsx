import { Link } from "@tanstack/react-router";
import { services } from "@/lib/services-data";
import * as Icons from "lucide-react";
import { useSoundZone } from "@/lib/sound-context";

export function Services() {
  const ref = useSoundZone("services");
  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 md:py-32"
    >
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-neon/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan">
              <span className="h-px w-8 bg-cyan/60" />
              Capabilities
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              One platform.{" "}
              <span className="text-gradient">Thirteen disciplines.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg">
              Every service is built to interoperate — strategy flows into design,
              design into engineering, engineering into intelligence.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="font-display text-3xl text-foreground/90">
              {String(services.length).padStart(2, "0")}
            </span>
            <span className="leading-tight">
              integrated
              <br />
              services
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5 rounded-3xl overflow-hidden ring-1 ring-foreground/10">
          {services.map((s, i) => {
            const Icon =
              (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[
                s.icon
              ] || Icons.Sparkles;
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative bg-background/80 backdrop-blur-sm p-7 md:p-8 transition-all duration-500 hover:bg-background/40 focus-visible:outline-none"
              >
                {/* Hover glow */}
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${s.gradient} mix-blend-overlay`}
                  style={{ maskImage: "radial-gradient(circle at 30% 0%, black 0%, transparent 70%)" }}
                />
                <div
                  className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700`}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className={`inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br ${s.gradient} text-primary-foreground shadow-lg shadow-foreground/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/60 tracking-widest">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 font-display text-xl md:text-2xl font-semibold leading-tight">
                  {s.title}
                </h3>
                <p className="relative mt-1.5 text-sm text-cyan/90">{s.tagline}</p>
                <p className="relative mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {s.description}
                </p>

                <div className="relative mt-6 flex items-center justify-between pt-5 border-t border-foreground/10">
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground/70 group-hover:text-cyan transition-colors">
                    Open service
                  </span>
                  <span
                    aria-hidden
                    className="grid place-items-center h-8 w-8 rounded-full border border-foreground/15 group-hover:border-cyan group-hover:bg-cyan/10 transition-all"
                  >
                    <Icons.ArrowUpRight className="h-4 w-4 text-foreground/70 group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
