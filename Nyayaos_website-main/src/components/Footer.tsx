import logoAsset from "@/assets/nyaya-logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12 mt-12">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-4">
        <div className="flex items-center gap-2">
          <img src={logoAsset} alt="NYRA TECH " className="h-8 w-8" />
          <span className="font-display font-bold text-gradient">NYRA TECH </span>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">Call Us</h4>
          <a
            href="tel:+917013345054"
            className="text-xs text-muted-foreground hover:text-cyan transition-colors"
          >
            +91 70133 45054
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">Email Us</h4>
          <a
            href="mailto:NYRA TECH .official@gmail.com"
            className="text-xs text-muted-foreground hover:text-cyan transition-colors break-all"
          >
            NYRA TECH .official@gmail.com
          </a>
        </div>

        <div className="flex md:justify-end items-end text-xs text-muted-foreground">
          © {new Date().getFullYear()} NYRA TECH 
        </div>
      </div>
    </footer>
  );
}
