import Image from "next/image";

/** Marca de El Isótopo: átomo con órbitas — se reemplaza al subir el logo real en Sanity */
export function IsotopoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8.5"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(-24 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="20"
        ry="8.5"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.55"
        transform="rotate(56 24 24)"
      />
      <circle cx="24" cy="24" r="5" fill="var(--coral)" />
      <circle cx="40.5" cy="16" r="2.6" fill="var(--lagoon)" />
      <circle cx="9" cy="33.5" r="2.2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export default function Logo({
  logoUrl,
  light = true,
}: {
  logoUrl?: string | null;
  light?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="Logo El Isótopo"
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
      ) : (
        <IsotopoMark
          className={`h-10 w-10 ${light ? "text-foam" : "text-ink"}`}
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-semibold tracking-wide ${
            light ? "text-foam" : "text-ink"
          }`}
        >
          EL ISÓTOPO
        </span>
        <span
          className={`text-[0.6rem] uppercase tracking-[0.35em] ${
            light ? "text-foam/60" : "text-ink/60"
          }`}
        >
          Cartagena · Barú
        </span>
      </span>
    </span>
  );
}
