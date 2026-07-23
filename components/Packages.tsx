import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import IslandArt from "./IslandArt";
import WaveDivider from "./WaveDivider";
import { CheckIcon, FishIcon, SnorkelIcon, BirdIcon, SparkIcon } from "./icons";
import { whatsappLink } from "@/lib/utils";
import type { Actividad, Paquete, Settings } from "@/lib/types";

const CATEGORIA_LABEL: Record<string, string> = {
  "full-day": "Full Day",
  tour: "Tour",
  vip: "VIP",
};

function actividadIcon(nombre: string) {
  const n = nombre.toLowerCase();
  if (n.includes("ocean")) return FishIcon;
  if (n.includes("snorkel") || n.includes("mapache")) return SnorkelIcon;
  if (n.includes("aviario")) return BirdIcon;
  return SparkIcon;
}

function PaqueteCard({
  paquete,
  seed,
  whatsapp,
}: {
  paquete: Paquete;
  seed: number;
  whatsapp?: string;
}) {
  const vip = paquete.destacado || paquete.categoria === "vip";
  const wa = whatsappLink(
    whatsapp,
    `¡Hola El Isótopo! Quiero reservar el plan "${paquete.nombre}".`
  );

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border transition-transform duration-300 hover:-translate-y-1.5 ${
        vip
          ? "border-gold/50 bg-gradient-to-b from-gold/10 to-foam/5 shadow-xl shadow-gold/10"
          : "border-foam/10 bg-foam/5 shadow-lg shadow-black/20"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        {paquete.imagenUrl ? (
          <Image
            src={paquete.imagenUrl}
            alt={paquete.nombre}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <IslandArt seed={seed + 2} className="h-full w-full" />
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] ${
            vip ? "bg-gold text-abyss" : "bg-abyss/80 text-foam backdrop-blur"
          }`}
        >
          {vip ? "★ VIP" : CATEGORIA_LABEL[paquete.categoria] ?? "Plan"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-medium text-foam">
          {paquete.nombre}
        </h3>
        {paquete.idealPara && (
          <p
            className={`mt-1 font-display italic ${
              vip ? "text-gold" : "text-lagoon"
            }`}
          >
            {paquete.idealPara}
          </p>
        )}
        {paquete.descripcion && (
          <p className="mt-3 text-sm leading-relaxed text-foam/65">
            {paquete.descripcion}
          </p>
        )}

        {paquete.incluye && paquete.incluye.length > 0 && (
          <ul className="mt-4 mb-6 space-y-2">
            {paquete.incluye.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foam/80">
                <CheckIcon
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    vip ? "text-gold" : "text-lagoon"
                  }`}
                />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-foam/10 pt-5">
          <span className="text-sm font-semibold text-foam/85">
            {paquete.precio || "Consultar"}
          </span>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
              vip
                ? "bg-gold text-abyss hover:bg-gold/90"
                : "bg-coral text-white hover:bg-coral/90"
            }`}
          >
            Reservar
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Packages({
  paquetes,
  actividades,
  settings,
}: {
  paquetes: Paquete[];
  actividades: Actividad[];
  settings: Settings;
}) {
  return (
    <>
      <div className="bg-sand">
        <WaveDivider fill="var(--abyss)" />
      </div>
      <section id="paquetes" className="grain relative bg-abyss py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Paquetes exclusivos"
            title={
              <>
                Elige tu manera de{" "}
                <em className="text-lagoon">vivir el Caribe</em>
              </>
            }
            sub="Planes full day, tours de aventura y experiencias VIP. Todos incluyen la atención personalizada que nos caracteriza."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paquetes.map((p, i) => (
              <Reveal key={p.nombre} delay={(i % 3) * 100} className="h-full">
                <PaqueteCard paquete={p} seed={i} whatsapp={settings.whatsapp} />
              </Reveal>
            ))}
          </div>

          {/* Actividades ecológicas adicionales */}
          {actividades.length > 0 && (
            <div className="mt-20">
              <Reveal className="text-center">
                <h3 className="font-display text-3xl font-medium text-foam">
                  Complementa tu <em className="text-coral">experiencia</em>
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-foam/65">
                  Combina tu plan con una actividad ecológica, como tú quieras,
                  bajo un cargo adicional.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {actividades.map((a, i) => {
                  const Icon = actividadIcon(a.nombre);
                  return (
                    <Reveal key={a.nombre} delay={i * 90}>
                      <div className="group flex h-full flex-col rounded-3xl border border-foam/10 bg-foam/5 p-6 transition hover:border-lagoon/40 hover:bg-foam/10">
                        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-lagoon/15 text-lagoon transition group-hover:scale-110">
                          <Icon className="h-6 w-6" />
                        </span>
                        <h4 className="font-semibold text-foam">{a.nombre}</h4>
                        {a.descripcion && (
                          <p className="mt-1.5 text-sm leading-relaxed text-foam/60">
                            {a.descripcion}
                          </p>
                        )}
                        {a.precio && (
                          <p className="mt-auto pt-3 text-xs font-semibold uppercase tracking-wider text-coral">
                            {a.precio}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
