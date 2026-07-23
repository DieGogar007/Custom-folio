import Reveal from "../Reveal";
import type { Logro } from "@/lib/types";

const COLORES = ["text-coral", "text-lagoon", "text-gold"];

/** Cifras de confianza condensadas en una sola franja oscura. */
export default function TrustStrip({ logros }: { logros: Logro[] }) {
  const tres = logros.slice(0, 3);
  if (tres.length === 0) return null;

  return (
    <section className="px-4 pt-9">
      <Reveal>
        <div className="grain relative grid grid-cols-3 divide-x divide-foam/10 overflow-hidden rounded-3xl bg-abyss px-2 py-6 text-center">
          {tres.map((l, i) => (
            <div key={l.titulo} className="px-2">
              <p className={`font-display text-2xl font-semibold ${COLORES[i % 3]}`}>
                {l.cifra || "★"}
              </p>
              <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.15em] leading-tight text-foam/60">
                {l.titulo}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
