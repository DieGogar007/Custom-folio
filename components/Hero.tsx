import Link from "next/link";
import Reveal from "./Reveal";
import { whatsappLink } from "@/lib/utils";
import type { Settings } from "@/lib/types";

export default function Hero({ settings }: { settings: Settings }) {
  const wa = whatsappLink(
    settings.whatsapp,
    "¡Hola El Isótopo! Quiero reservar un tour."
  );

  return (
    <section
      id="inicio"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-abyss"
    >
      {/* Fondo: video del cliente (Cartagena + Barú) o un océano animado mientras tanto */}
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
          <div className="absolute right-[12%] top-[16%] h-44 w-44 rounded-full bg-gold/50 blur-2xl" />
          <div className="absolute right-[14%] top-[18%] h-28 w-28 rounded-full bg-[#ffe9b0]/80 blur-md" />
          <svg
            className="animate-swell-slow absolute bottom-[16%] left-[-10%] w-[120%] opacity-25"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C240,110 480,10 720,55 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
              fill="#eaf6f3"
            />
          </svg>
          <svg
            className="animate-swell absolute bottom-[6%] left-[-10%] w-[120%] opacity-40"
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
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/60 via-abyss/20 to-abyss" />

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-3 rounded-full border border-foam/20 bg-abyss/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-foam/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            Cartagena de Indias — Isla de Barú
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="max-w-4xl font-display text-5xl font-medium leading-[1.02] text-foam sm:text-7xl lg:text-8xl">
            {settings.heroTitulo || (
              <>
                Del corazón de Cartagena{" "}
                <em className="text-lagoon">al azul de Barú</em>
              </>
            )}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foam/75 sm:text-xl">
            {settings.heroSubtitulo}
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/#paquetes"
              className="rounded-full bg-coral px-8 py-4 text-base font-semibold text-white shadow-xl shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral/90"
            >
              Explorar paquetes
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-foam/30 px-8 py-4 text-base font-semibold text-foam backdrop-blur transition hover:border-foam/60 hover:bg-foam/10"
            >
              Reserva por WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <div className="mt-16 flex items-center justify-between border-t border-foam/15 pt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-foam/50">
              {settings.marcaExperiencias}
            </p>
            <Link
              href="/#destinos"
              className="animate-floaty hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-foam/50 transition hover:text-foam sm:flex"
            >
              Desliza
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
                <path
                  d="M7 1v14m0 0 5-5m-5 5-5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
