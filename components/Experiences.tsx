import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import IslandArt from "./IslandArt";
import WaveDivider from "./WaveDivider";
import { PlayIcon } from "./icons";
import type { Experiencia, Settings } from "@/lib/types";

export default function Experiences({
  experiencias,
  settings,
}: {
  experiencias: Experiencia[];
  settings: Settings;
}) {
  const marca = settings.marcaExperiencias || "Experiencias By Tpir Shekinah";
  const cinta = Array.from({ length: 6 }, () => marca);

  return (
    <>
      <div className="bg-abyss">
        <WaveDivider fill="var(--sand)" />
      </div>
      <section id="experiencias" className="relative overflow-hidden bg-sand py-24 sm:py-32">
        {/* Cinta de marca en movimiento */}
        <div className="pointer-events-none absolute left-0 top-8 w-full overflow-hidden opacity-[0.08]">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <span key={copy} className="flex">
                {cinta.map((t, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="mx-6 font-display text-6xl font-semibold uppercase italic text-ink sm:text-7xl"
                  >
                    {t} ✦
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8">
          <SectionHeading
            eyebrow="Experiencias exclusivas"
            title={
              <>
                Tu aventura, <em className="text-coral">grabada para siempre</em>
              </>
            }
            sub={`${marca}: nuestro equipo te acompaña durante el tour y captura tus mejores momentos en video y fotografía profesional.`}
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {experiencias.map((e, i) => (
              <Reveal key={e.titulo} delay={i * 120}>
                <article className="group overflow-hidden rounded-[1.75rem] bg-abyss shadow-xl shadow-ink/15">
                  <div className="relative aspect-[4/5]">
                    {e.videoUrl ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={e.videoUrl}
                        poster={e.imagenUrl ?? undefined}
                        controls
                        preload="none"
                        playsInline
                      />
                    ) : (
                      <>
                        {e.imagenUrl ? (
                          <Image
                            src={e.imagenUrl}
                            alt={e.titulo}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                            <IslandArt seed={i + 7} className="h-full w-full" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/20 to-transparent" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-coral text-white shadow-xl shadow-coral/40 transition group-hover:scale-110">
                            <span className="animate-ping-slow absolute inset-0 rounded-full bg-coral" />
                            <PlayIcon className="relative ml-1 h-7 w-7" />
                          </span>
                        </span>
                      </>
                    )}
                    {!e.videoUrl && (
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="font-display text-xl font-medium text-foam">
                          {e.titulo}
                        </h3>
                        {e.descripcion && (
                          <p className="mt-1.5 text-sm leading-relaxed text-foam/65">
                            {e.descripcion}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {e.videoUrl && (
                    <div className="p-5">
                      <h3 className="font-display text-lg font-medium text-foam">
                        {e.titulo}
                      </h3>
                      {e.descripcion && (
                        <p className="mt-1 text-sm text-foam/65">{e.descripcion}</p>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <p className="inline-block rounded-full border border-ink/15 px-6 py-3 text-sm text-ink/70">
              ✦ Videos de turistas con acompañamiento profesional — pregunta por
              esta experiencia al reservar
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
