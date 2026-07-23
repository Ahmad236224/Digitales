"use client";

/**
 * CircuitBackground - the Digitales signature.
 * Echoes the circuit traces inside the logo's "D". Brand-purple lines and
 * gold nodes drawn on the deep-purple field. Lines softly "flow" via an
 * animated stroke dash. Purely decorative → aria-hidden.
 */
export default function CircuitBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          stroke="#6B2D8B"
          strokeWidth="1.5"
          opacity="0.5"
          strokeLinecap="round"
        >
          {/* Horizontal feeder traces with right-angle branches */}
          <path
            d="M0 120 H180 V200 H320 M320 200 H520"
            strokeDasharray="6 10"
            className="animate-dash-flow"
          />
          <path
            d="M1200 90 H1000 V180 H840 M840 180 H700"
            strokeDasharray="6 10"
            className="animate-dash-flow"
          />
          <path
            d="M0 300 H120 V420 H300 M300 420 H460 V520"
            strokeDasharray="4 12"
            className="animate-dash-flow"
          />
          <path
            d="M1200 360 H1040 V470 H880 M880 470 H760"
            strokeDasharray="4 12"
            className="animate-dash-flow"
          />
          <path d="M600 0 V120 H720 M720 120 V260" />
          <path d="M540 600 V480 H400" />
        </g>

        {/* Gold nodes at junctions - the highlight accents */}
        <g fill="#F0B428">
          {[
            [180, 120], [320, 200], [520, 200],
            [1000, 90], [840, 180], [700, 180],
            [120, 300], [300, 420], [460, 520],
            [1040, 360], [880, 470], [720, 120],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4.5" opacity="0.85" />
          ))}
        </g>
        <g fill="none" stroke="#F0B428" strokeWidth="1.5" opacity="0.6">
          {[
            [180, 120], [1000, 90], [120, 300], [1040, 360],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="9" />
          ))}
        </g>
      </svg>
    </div>
  );
}
