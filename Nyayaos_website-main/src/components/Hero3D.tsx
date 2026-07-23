import logo from "@/assets/nyaya-logo.png";

export function Hero3D() {
  return (
    <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
      <img
        src={logo}
        alt="NYGENX  infinity logo"
        className="w-[55%] max-w-[680px] mr-[-2%] opacity-90 drop-shadow-[0_0_60px_rgba(34,211,238,0.35)] animate-[float_6s_ease-in-out_infinite]"
      />
    </div>
  );
}
