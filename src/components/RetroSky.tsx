// Decorative backdrop: planet, moon, drifting clouds and a desert mesa horizon.
// Purely visual; it never captures pointer events.
export function RetroSky({
  horizon = true,
  className = "",
}: {
  horizon?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="retro-planet absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-[70%] sm:h-[34rem] sm:w-[34rem]" />
      <div className="retro-moon absolute left-[18%] top-10 h-6 w-6 opacity-80" />
      <div className="retro-cloud absolute left-[-10%] top-[45%] h-40 w-[60%]" />
      <div className="retro-cloud absolute right-[-15%] top-[30%] h-48 w-[55%]" />
      <div className="retro-cloud absolute right-[10%] top-[70%] h-32 w-[45%] opacity-70" />
      <div className="absolute inset-0 bg-hero-glow" />
      {horizon && (
        <svg
          className="absolute inset-x-0 bottom-0 h-24 w-full sm:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="retro-desert" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.12 42)" />
              <stop offset="100%" stopColor="oklch(0.4 0.1 36)" />
            </linearGradient>
          </defs>
          <path
            d="M0 92 L180 92 L195 70 L205 66 L215 72 L228 92 L560 92 L570 40 L585 28 L600 30 L612 18 L626 22 L632 44 L640 60 L655 92 L960 92 L975 78 L990 74 L1004 80 L1015 92 L1200 92 L1200 120 L0 120 Z"
            fill="url(#retro-desert)"
            stroke="oklch(0.13 0.03 265)"
            strokeWidth="2"
          />
          <rect x="0" y="92" width="1200" height="2" fill="oklch(0.8 0.12 60 / 60%)" />
        </svg>
      )}
    </div>
  );
}
