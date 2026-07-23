import Reveal from "../Reveal";
import type { Testimonio } from "@/lib/types";

/** Testimonios en carrusel horizontal con snap — ocupan un solo alto de tarjeta. */
export default function TestimonialsRail({
  testimonios,
}: {
  testimonios: Testimonio[];
}) {
  if (testimonios.length === 0) return null;

  return (
    <section className="pt-9">
      <Reveal className="px-4 text-center">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-coral">
          Viajeros felices
        </p>
        <h2 className="mt-2 font-display text-[1.7rem] font-medium leading-tight text-ink">
          Lo que <em className="text-lagoon-2">cuentan</em> de nosotros
        </h2>
      </Reveal>

      <Reveal>
        <div className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
          {testimonios.map((t, i) => (
            <figure
              key={`${t.nombre}-${i}`}
              className="w-[82%] max-w-xs shrink-0 snap-center rounded-3xl border border-ink/10 bg-white/75 p-5 sm:w-[46%]"
            >
              {t.calificacion && (
                <p className="text-sm tracking-[0.2em] text-gold" aria-label={`${t.calificacion} estrellas`}>
                  {"★".repeat(Math.min(t.calificacion, 5))}
                </p>
              )}
              <blockquote className="mt-2 font-display text-sm italic leading-relaxed text-ink/80">
                {t.texto}
              </blockquote>
              <figcaption className="mt-3">
                <p className="text-xs font-bold text-ink">{t.nombre}</p>
                {t.procedencia && (
                  <p className="text-[0.65rem] text-ink/50">{t.procedencia}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
