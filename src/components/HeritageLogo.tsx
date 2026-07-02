interface HeritageLogoProps {
  size?: number;
  showText?: boolean;
}

export default function HeritageLogo({ size = 44, showText = true }: HeritageLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative rounded-md border border-[#D4AF37]/70 bg-[#2C1B12] shadow-[0_0_0_1px_rgba(212,175,55,0.25)]"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect x="7" y="7" width="50" height="50" fill="none" stroke="#D4AF37" strokeWidth="2.4" />
          <path d="M16 16h32M16 24h32M16 32h32M16 40h32M16 48h32" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1" />
          <path d="M16 16v32M24 16v32M32 16v32M40 16v32M48 16v32" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1" />
          <path d="M22 19h20v26h-20z" fill="#2C1B12" stroke="#D4AF37" strokeWidth="1.8" />
          <path d="M27 24h9.5c4.2 0 6.2 2.7 6.2 5.9s-2 5.9-6.2 5.9H31v6h-4z" fill="#D4AF37" />
        </svg>
      </div>

      {showText && (
        <div className="leading-tight">
          <h1 className="text-lg font-semibold tracking-wide text-[#F8F1E6] sm:text-xl">
            Gatekeeper Dusun Dictionary V1
          </h1>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4AF37]/90 sm:text-xs">
            Heritage Edition
          </p>
        </div>
      )}
    </div>
  );
}
