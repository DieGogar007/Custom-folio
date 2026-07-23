"use client";

import Reveal from "../Reveal";
import LangToggle from "./LangToggle";
import { IsotopoMark } from "../Logo";
import { useLang } from "@/lib/useLang";
import type { Settings } from "@/lib/types";

/**
 * Portada compacta de la tarjeta digital: video del cliente (o un océano
 * animado mientras tanto) con el título encima y un sello postal de la marca.
 */
export default function CardHero({ settings }: { settings: Settings }) {
  const { t } = useLang();
  return (
    <section className="grain relative flex h-[52svh] max-h-[540px] min-h-[380px] flex-col justify-end overflow-hidden bg-abyss">
      {/* Fondo: video de Cartagena + Barú, o el océano animado */}
      {settings.heroVideoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={settings.heroVideoUrl}
          poster={settings.heroPosterUrl ?? undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <div className="animate-drift absolute inset-0 bg-[linear-gradient(120deg,#0a3d4d,#0d8172,#0a5a74,#071e2a)]" />
          <div className="absolute right-[14%] top-[14%] h-32 w-32 rounded-full bg-gold/50 blur-2xl" />
          <div className="absolute right-[16%] top-[16%] h-20 w-20 rounded-full bg-[#ffe9b0]/80 blur-md" />
          <svg
            className="animate-swell-slow absolute bottom-[18%] left-[-10%] w-[120%] opacity-25"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C240,110 480,10 720,55 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
              fill="#eaf6f3"
            />
          </svg>
          <svg
            className="animate-swell absolute bottom-[8%] left-[-10%] w-[120%] opacity-40"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,70 C240,20 480,110 720,65 C960,20 1200,100 1440,55 L1440,120 L0,120 Z"
              fill="#17b3a2"
            />
          </svg>
        </div>
      )}

      {/* Velo para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-abyss/10 to-abyss/90" />

      {/* Cambio de idioma */}
      <div className="absolute left-4 top-4 z-10">
        <LangToggle />
      </div>

      {/* Sello postal de la marca */}
      <div
        className="absolute right-4 top-4 rotate-3 rounded-xl border-2 border-dashed border-foam/40 bg-abyss/30 p-2.5 backdrop-blur-sm"
        aria-hidden
      >
        <IsotopoMark className="h-8 w-8 text-foam" />
        <p className="mt-1 text-center text-[0.5rem] font-bold uppercase tracking-[0.2em] text-foam/70">
          CTG
        </p>
      </div>

      {/* Contenido */}
      <div className="relative px-5 pb-16 text-center">
        <Reveal>
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-foam/20 bg-abyss/40 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foam/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Cartagena de Indias · Isla de Barú
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mx-auto max-w-xs font-display text-[2rem] font-medium leading-[1.05] text-foam sm:max-w-md sm:text-[2.6rem]">
            {settings.heroTitulo || (
              <>
                {t.heroFallback[0]}
                <em className="text-lagoon">{t.heroFallback[1]}</em>
              </>
            )}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
