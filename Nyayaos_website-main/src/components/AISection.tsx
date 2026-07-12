import { useEffect, useRef } from "react";
import { useSoundZone } from "@/lib/sound-context";

function Neural() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * c.clientWidth,
      y: Math.random() * c.clientHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > c.clientWidth) n.vx *= -1;
        if (n.y < 0 || n.y > c.clientHeight) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            const a = 1 - d / 140;
            ctx.strokeStyle = `rgba(125,211,252,${a * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.fillStyle = "#a78bfa";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

export function AISection() {
  const ref = useSoundZone("ai");
  return (
    <section id="ai" ref={ref as React.RefObject<HTMLElement>} className="relative py-16 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-neon">AI Core</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            A <span className="text-gradient">command center</span> for your intelligence.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Realtime data, agentic workflows, voice-driven copilots and predictive insights —
            unified into one futuristic operations cockpit.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { k: "Active agents", v: "128" },
              { k: "Tokens/sec", v: "9.4M" },
              { k: "Decisions/day", v: "412K" },
              { k: "Eval pass rate", v: "99.1%" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-xl p-4">
                <div className="text-2xl font-display font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[480px] rounded-3xl glass-strong overflow-hidden neon">
          <Neural />
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-2 p-4 pointer-events-none">
            {[
              "Voice agent · live",
              "Forecast model · 96%",
              "RAG corpus · 18M docs",
              "Anomaly detector · 0",
              "Customer copilot · 312",
              "Realtime ops · ✓",
            ].map((t, i) => (
              <div key={i} className="glass rounded-lg px-3 py-2 text-xs text-foreground/90 self-end pointer-events-auto">
                <span className="text-cyan">●</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
