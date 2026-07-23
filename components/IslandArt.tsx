/**
 * Ilustración SVG generativa de una isla caribeña.
 * Se usa como imagen de relleno hasta que el cliente suba
 * sus fotos reales en Sanity Studio.
 */

const PALETTES = [
  {
    skyA: "#8fd8cf",
    skyB: "#e6f6ef",
    sun: "#ffd98a",
    seaA: "#149a8a",
    seaB: "#0a5e57",
    isla: "#0b3d3a",
  },
  {
    skyA: "#ffb98a",
    skyB: "#ffe7c9",
    sun: "#ff7a59",
    seaA: "#1a7f8c",
    seaB: "#0d515c",
    isla: "#143840",
  },
  {
    skyA: "#f7d9a0",
    skyB: "#fdefd3",
    sun: "#f2a93b",
    seaA: "#23a596",
    seaB: "#0f6c62",
    isla: "#114444",
  },
  {
    skyA: "#9cc9e8",
    skyB: "#dbeff8",
    sun: "#fff3c4",
    seaA: "#1668a3",
    seaB: "#0c3f68",
    isla: "#0c2f4a",
  },
];

function Palm({ x, y, s = 1, flip = false, color }: {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  color: string;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      stroke={color}
      fill="none"
      strokeLinecap="round"
    >
      <path d="M0 0 C 8 -34 2 -62 16 -92" strokeWidth="9" />
      <path d="M16 -92 Q -22 -108 -50 -94" strokeWidth="8" />
      <path d="M16 -92 Q -6 -124 -34 -126" strokeWidth="8" />
      <path d="M16 -92 Q 26 -128 8 -146" strokeWidth="8" />
      <path d="M16 -92 Q 50 -120 74 -108" strokeWidth="8" />
      <path d="M16 -92 Q 56 -94 78 -74" strokeWidth="8" />
    </g>
  );
}

export default function IslandArt({
  seed = 0,
  className = "",
}: {
  seed?: number;
  className?: string;
}) {
  const p = PALETTES[Math.abs(seed) % PALETTES.length];
  const id = `ia-${Math.abs(seed)}`;
  const sunX = 150 + ((Math.abs(seed) * 137) % 480);
  const islaX = 400 + (((Math.abs(seed) * 71) % 200) - 100);

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyA} />
          <stop offset="100%" stopColor={p.skyB} />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.seaA} />
          <stop offset="100%" stopColor={p.seaB} />
        </linearGradient>
      </defs>

      <rect width="800" height="380" fill={`url(#${id}-sky)`} />
      <circle cx={sunX} cy="200" r="96" fill={p.sun} opacity="0.35" />
      <circle cx={sunX} cy="200" r="58" fill={p.sun} />
      <rect y="360" width="800" height="240" fill={`url(#${id}-sea)`} />
      <rect y="356" width="800" height="8" fill="#ffffff" opacity="0.25" />

      <ellipse cx={islaX} cy="372" rx="200" ry="34" fill={p.isla} />
      <Palm x={islaX - 70} y={368} s={0.9} color={p.isla} />
      <Palm x={islaX + 60} y={372} s={1.05} flip color={p.isla} />

      {[430, 480, 535].map((y, i) => (
        <path
          key={y}
          d={`M-40 ${y} Q 40 ${y - 12} 120 ${y} T 280 ${y} T 440 ${y} T 600 ${y} T 760 ${y} T 920 ${y}`}
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          opacity={0.22 - i * 0.05}
        />
      ))}
    </svg>
  );
}
