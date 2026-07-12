import { useEffect, useState, useRef } from "react";
import { Hero3D } from "./Hero3D";
import { useSoundZone } from "@/lib/sound-context";
import videoUrl from "@/assets/Nyayaos_web_video.mp4";
import { ChevronDown, Mic, MicOff } from "lucide-react";

function Counter({ value, suffix = "", duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

export function Hero() {
  const ref = useSoundZone("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted for guaranteed autoplay on all devices (mobile and desktop)
    video.muted = true;
    setIsMuted(true);
    video.play().catch((error) => {
      console.log("Muted autoplay failed or was delayed:", error);
    });
  }, []);

  useEffect(() => {
    const handleGlobalClick = () => {
      const video = videoRef.current;
      // Only unmute on global click if the user is near the hero section to prevent accidental audio triggers
      if (video && video.muted && window.scrollY <= 100) {
        video.muted = false;
        setIsMuted(false);
        video.play().catch(e => console.log("Failed to play on click:", e));
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;
      if (window.scrollY > 100 && !video.muted) {
        video.muted = true;
        setIsMuted(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Full-Screen Video Section */}
      <section className="relative w-full h-[60vh] md:h-screen overflow-hidden bg-background">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
        />
        
        {/* Subtle overlay gradients for premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            const video = videoRef.current;
            if (video) {
              const nextMuted = !video.muted;
              video.muted = nextMuted;
              setIsMuted(nextMuted);
              if (!nextMuted) {
                video.play().catch(e => console.log(e));
              }
            }
          }}
          className="absolute bottom-20 md:bottom-24 right-4 md:right-8 z-20 flex items-center justify-center rounded-full bg-background/80 hover:bg-background/95 border border-white/10 p-3 text-foreground transition-all cursor-pointer shadow-lg backdrop-blur-sm"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        {/* Scroll Down option at the bottom center of the video screen */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => {
              document.getElementById("main-hero-content")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors group cursor-pointer border-none bg-transparent"
          >
            <span className="font-semibold uppercase tracking-wider text-[10px]">scroll down</span>
            <ChevronDown className="h-5 w-5 animate-bounce text-cyan" />
          </button>
        </div>
      </section>

      {/* Main Hero Section - EXACTLY as it was originally */}
      <section 
        id="main-hero-content" 
        ref={ref as React.RefObject<HTMLElement>} 
        className="relative min-h-screen overflow-hidden noise scroll-mt-20"
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-3xl reveal">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              NYRA TECH  — Operating system for next-gen business
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Transforming Businesses Through{" "}
              <span className="text-gradient">AI-Powered Innovation</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              From custom AI agents to cinematic creative production — NYRA TECH  is the
              unified intelligence layer powering ambitious teams across the globe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-neon px-5 py-3 text-sm font-semibold text-primary-foreground neon hover:scale-[1.03] transition-transform">
                Book consultation
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-xl glass-strong px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary/60 transition">
                Explore the OS
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {[
                { v: 162, s: "+", l: "Global clients" },
                { v: 480, s: "+", l: "Projects shipped" },
                { v: 99, s: ".99%", l: "Platform uptime" },
                { v: 24, s: "/7", l: "AI command center" },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <div className="font-display text-2xl md:text-3xl text-gradient font-bold">
                    <Counter value={s.v} suffix={s.s} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-pulse">
          Scroll to enter the OS
        </div>
      </section>
    </>
  );
}

