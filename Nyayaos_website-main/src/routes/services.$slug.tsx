import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getService, services, type Service } from "@/lib/services-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { SoundProvider } from "@/lib/sound-context";
import * as Icons from "lucide-react";
import { useState } from "react";
import serviceImg1 from "@/assets/service-img-1.jpg";
import serviceImg2 from "@/assets/service-img-2.jpg";
import serviceImg3 from "@/assets/service-img-3.jpg";

const SERVICE_IMAGES = [serviceImg1, serviceImg2, serviceImg3];

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — NYGENX ` },
          { name: "description", content: loaderData.service.description },
          { property: "og:title", content: `${loaderData.service.title} — NYGENX ` },
          { property: "og:description", content: loaderData.service.description },
        ]
      : [{ title: "Service — NYGENX " }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Service not found</h1>
        <Link to="/" className="mt-4 inline-block text-cyan">← Back home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
        <Link to="/" className="mt-4 inline-block text-cyan">← Back home</Link>
      </div>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const Icon = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[service.icon] || Icons.Sparkles;
  const [activeStudy, setActiveStudy] = useState(0);

  return (
    <SoundProvider>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-muted-foreground hover:text-cyan">← All services</Link>
          <div className="mt-6">
            <div className={`inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br ${service.gradient} neon`}>
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-lg text-cyan">{service.tagline}</p>
            <p className="mt-4 text-muted-foreground max-w-2xl">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.capabilities.map((c) => (
                <span key={c} className="text-xs rounded-full glass px-3 py-1">{c}</span>
              ))}
            </div>
          </div>



          {/* Workflow */}
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">Workflow</h2>
            <div className="mt-6 grid md:grid-cols-4 gap-4">
              {service.workflow.map((w, i) => (
                <div key={w.step} className="glass rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-cyan/20 to-neon/20 blur-2xl" />
                  <div className="text-xs text-cyan">Step {i + 1}</div>
                  <div className="mt-1 font-display text-lg font-semibold">{w.step}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{w.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Case studies / before-after */}
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">Case studies & transformations</h2>
            <div className="mt-6 grid lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                {service.caseStudies.map((cs, i) => (
                  <button
                    key={cs.client}
                    onClick={() => setActiveStudy(i)}
                    className={`block w-full text-left rounded-xl px-4 py-3 transition-all ${
                      activeStudy === i ? "bg-gradient-to-br from-cyan to-neon text-primary-foreground neon" : "glass hover:border-cyan/40"
                    }`}
                  >
                    <div className="font-display font-semibold">{cs.client}</div>
                    <div className="text-xs opacity-80 line-clamp-1">{cs.challenge}</div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-3 glass-strong rounded-2xl p-6">
                {(() => {
                  const cs = service.caseStudies[activeStudy];
                  return (
                    <div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs uppercase text-cyan tracking-wider">Challenge</div>
                          <p className="mt-2 text-sm">{cs.challenge}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-cyan tracking-wider">Solution</div>
                          <p className="mt-2 text-sm">{cs.solution}</p>
                        </div>
                        <div>
                          <div className="text-xs uppercase text-cyan tracking-wider">Impact</div>
                          <p className="mt-2 text-sm text-gradient font-semibold">{cs.impact}</p>
                        </div>
                      </div>
                      {/* Before/After 3D-styled card flip */}
                      <div className="mt-8 grid md:grid-cols-2 gap-4">
                        <div className="group relative aspect-video rounded-2xl overflow-hidden glass">
                          <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary opacity-80" />
                          <div className="absolute inset-0 grid-bg opacity-30" />
                          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-muted-foreground glass px-2 py-0.5 rounded">Before</div>
                          <div className="absolute inset-0 grid place-items-center p-6 text-center">
                            <div className="text-muted-foreground italic">"{cs.before}"</div>
                          </div>
                        </div>
                        <div className="group relative aspect-video rounded-2xl overflow-hidden glass neon">
                          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50`} />
                          <div className="absolute inset-0 grid-bg opacity-20" />
                          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-cyan glass px-2 py-0.5 rounded">After</div>
                          <div className="absolute inset-0 grid place-items-center p-6 text-center">
                            <div className="font-display text-lg font-semibold">"{cs.after}"</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">Project gallery</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-4 [perspective:1200px]">
              {service.gallery.map((g, i) => (
                <div
                  key={g.title}
                  className="group relative aspect-[4/3] rounded-2xl glass overflow-hidden transition-transform duration-500 hover:[transform:rotateY(-6deg)_rotateX(4deg)]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <img
                    src={SERVICE_IMAGES[i % SERVICE_IMAGES.length]}
                    alt={g.title}
                    width={1280}
                    height={800}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40 group-hover:opacity-60 transition-opacity mix-blend-overlay`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-display text-lg font-semibold">{g.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{g.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related services */}
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold">More from NYGENX </h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="glass rounded-xl p-4 hover:-translate-y-1 transition-all">
                  <div className="text-xs text-cyan">{s.tagline}</div>
                  <div className="mt-1 font-display font-semibold">{s.title}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </SoundProvider>
  );
}
