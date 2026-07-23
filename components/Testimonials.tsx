import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import WaveDivider from "./WaveDivider";
import type { Testimonio } from "@/lib/types";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <p className="text-gold" aria-label={`${n} de 5 estrellas`}>
      {"★".repeat(Math.max(1, Math.min(5, n)))}
      <span className="text-foam/20">{"★".repeat(5 - Math.max(1, Math.min(5, n)))}</span>
    </p>
  );
}

export default function Testimonials({ testimonios }: { testimonios: Testimonio[] }) {
  return (
    <>
      <div className="bg-sand">
        <WaveDivider fill="var(--ink)" />
      </div>
      <section id="testimonios" className="grain relative bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Aventuras inolvidables"
            title={
              <>
                Lo que cuentan <em className="text-gold">nuestros viajeros</em>
              </>
            }
            sub="Historias reales de quienes ya vivieron el Caribe con nosotros."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={`${t.nombre}-${i}`} delay={i * 120} className="h-full">
                <figure className="relative flex h-full flex-col rounded-[1.75rem] border border-foam/10 bg-foam/5 p-8">
                  <span
                    className="pointer-events-none absolute -top-2 right-6 font-display text-8xl italic leading-none text-lagoon/20"
                    aria-hidden
                  >
                    ”
                  </span>
                  <Stars n={t.calificacion ?? 5} />
                  <blockquote className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-foam/85">
                    {t.texto}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-foam/10 pt-5">
                    {t.fotoUrl ? (
                      <Image
                        src={t.fotoUrl}
                        alt={t.nombre}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lagoon/20 font-display text-lg text-lagoon">
                        {t.nombre.charAt(0)}
                      </span>
                    )}
                    <span>
                      <span className="block text-sm font-semibold text-foam">
                        {t.nombre}
                      </span>
                      {t.procedencia && (
                        <span className="block text-xs text-foam/55">
                          {t.procedencia}
                        </span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
