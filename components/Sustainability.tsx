import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LeafIcon } from "./icons";
import type { Logro } from "@/lib/types";

export default function Sustainability({ logros }: { logros: Logro[] }) {
  return (
    <section
      id="sostenibilidad"
      className="relative overflow-hidden bg-foam py-24 sm:py-32"
    >
      {/* Hojas decorativas */}
      <LeafIcon className="pointer-events-none absolute -left-10 top-14 h-48 w-48 rotate-[-20deg] text-lagoon/10" />
      <LeafIcon className="pointer-events-none absolute -right-8 bottom-10 h-56 w-56 rotate-[150deg] text-lagoon/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Turismo responsable y sostenible"
          title={
            <>
              Cuidamos el paraíso <em className="text-lagoon-2">que compartimos</em>
            </>
          }
          sub="Nuestros logros hablan del compromiso con las islas, el mar y las comunidades que nos reciben."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {logros.map((l, i) => (
            <Reveal key={l.titulo} delay={i * 100} className="h-full">
              <div className="flex h-full flex-col rounded-[1.75rem] border border-lagoon/20 bg-white/70 p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-lagoon/10">
                {l.cifra && (
                  <p className="font-display text-5xl font-semibold text-lagoon-2">
                    {l.cifra}
                  </p>
                )}
                <h3 className="mt-3 font-semibold text-ink">{l.titulo}</h3>
                {l.descripcion && (
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {l.descripcion}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
