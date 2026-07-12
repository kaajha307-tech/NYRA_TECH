import { useSoundZone } from "@/lib/sound-context";
import productViz from "@/assets/studio/product-viz.jpg";
import architecture from "@/assets/studio/architecture.jpg";
import motion from "@/assets/studio/motion.jpg";
import vfx from "@/assets/studio/vfx.jpg";
import digitalArt from "@/assets/studio/digital-art.jpg";
import brand from "@/assets/studio/brand.jpg";

const PIECES = [
  { t: "Product Visualization", g: "from-cyan-400 to-blue-600", img: productViz },
  { t: "Architectural Renders", g: "from-violet-500 to-fuchsia-500", img: architecture },
  { t: "Motion Graphics", g: "from-emerald-400 to-cyan-400", img: motion },
  { t: "VFX Showreels", g: "from-fuchsia-500 to-cyan-400", img: vfx },
  { t: "Digital Art Gallery", g: "from-rose-400 to-amber-400", img: digitalArt },
  { t: "Brand Identity", g: "from-amber-400 to-rose-500", img: brand },
];

export function StudioSection() {
  const ref = useSoundZone("studio");
  return (
    <section id="studio" ref={ref as React.RefObject<HTMLElement>} className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-neon">Creative Studio</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Cinematic visuals. <span className="text-gradient">Production-grade.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {PIECES.map((p, i) => (
            <div
              key={p.t}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass hover:-translate-y-1 transition-all"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={p.img}
                alt={p.t}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${p.g} opacity-30 group-hover:opacity-50 transition-opacity mix-blend-overlay`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-xs uppercase tracking-wider text-cyan">Studio</div>
                <div className="mt-1 font-display text-xl font-semibold">{p.t}</div>
                <div className="mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view interactive preview
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
