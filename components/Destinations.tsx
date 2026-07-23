import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import IslandArt from "./IslandArt";
import type { Destino } from "@/lib/types";

export default function Destinations({ destinos }: { destinos: Destino[] }) {
  return (
    <section id="destinos" className="relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Destinos increíbles"
          title={
            <>
              Seis islas, <em className="text-lagoon-2">un mismo paraíso</em>
            </>
          }
          sub="Aguas turquesa, arena blanca y la brisa del Caribe colombiano. Estos son los destinos que visitamos cada día."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinos.map((d, i) => (
            <Reveal
              key={d.nombre}
              delay={(i % 3) * 100}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
            >
              <article
                className={`group relative overflow-hidden rounded-[1.75rem] bg-abyss shadow-lg shadow-ink/10 ${
                  i === 0 ? "aspect-[4/5] lg:h-full lg:aspect-auto" : "aspect-[4/3]"
                }`}
              >
                {d.imagenUrl ? (
                  <Image
                    src={d.imagenUrl}
                    alt={d.nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <IslandArt seed={i} className="h-full w-full" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/10 to-transparent" />

                <span className="absolute right-5 top-4 font-display text-5xl font-light italic text-foam/25">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-medium text-foam">
                    {d.nombre}
                  </h3>
                  {d.tagline && (
                    <p className="mt-1 text-sm text-foam/70">{d.tagline}</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
