import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/nyaya-logo.png";


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#services", label: "Services" },
    { href: "/#ai", label: "AI Core" },
    { href: "/#erp", label: "ERP" },
    { href: "/#studio", label: "Studio" },
    
    { href: "/#team", label: "Team" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoAsset} alt="NYGENX " className="h-9 w-9 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-display text-lg font-bold tracking-tight text-gradient">
              NYGENX 
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-foreground transition-colors relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-gradient-to-r after:from-cyan after:to-neon after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan to-neon px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all hover:scale-[1.03] neon"
            >
              Launch
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
