import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import IslandArt from "@/components/IslandArt";
import WaveDivider from "@/components/WaveDivider";
import { CheckIcon } from "@/components/icons";
import { getHomeData } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Catálogo de planes",
  description:
    "Catálogo completo de tours y planes de El Isótopo: full day a las islas, Tour 4 Islas, Playa Tranquila VIP y actividades ecológicas en Cartagena y Barú.",
};

const CATEGORIA_LABEL: Record<string, string> = {
  "full-day": "Full Day",
  tour: "Tour",
  vip: "VIP",
};

export default async function CatalogoPage() {
  const data = await getHomeData();
  const { settings } = data;

  return (
    <>
      <Header settings={settings} />
      <main>
        {/* Encabezado */}
        <section className="grain relative overflow-hidden bg-abyss pb-20 pt-40">
          <div className="animate-drift absolute inset-0 bg-[linear-gradient(120deg,#0a3d4d,#0d8172,#071e2a)] opacity-60" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-lagoon">
                El Isótopo · Cartagena — Barú
              </p>
              <h1 className="font-display text-5xl font-medium leading-[1.05] text-foam sm:text-6xl">
                Catálogo <em className="text-lagoon">de planes</em>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-foam/70">
                Todos nuestros tours y experiencias en un solo lugar. Elige el
                tuyo y resérvalo por WhatsApp en un minuto.
              </p>
            </Reveal>
          </div>
        </section>
        <div className="bg-abyss">
          <WaveDivider fill="var(--sand)" />
        </div>

        {/* Lista de paquetes */}
        <section className="bg-sand py-20">
          <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">
            {data.paquetes.map((p, i) => {
              const vip = p.destacado || p.categoria === "vip";
              const wa = whatsappLink(
                settings.whatsapp,
                `¡Hola El Isótopo! Quiero reservar el plan "${p.nombre}".`
              );
              return (
                <Reveal key={p.nombre} delay={60}>
                  <article
                    className={`grid overflow-hidden rounded-[2rem] border bg-white shadow-lg shadow-ink/5 md:grid-cols-[2fr_3fr] ${
                      vip ? "border-gold/60" : "border-ink/10"
                    }`}
                  >
                    <div className="relative min-h-56">
                      {p.imagenUrl ? (
                        <Image
                          src={p.imagenUrl}
                          alt={p.nombre}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      ) : (
                        <IslandArt seed={i + 2} className="absolute inset-0 h-full w-full" />
                      )}
                      <span
                        className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] ${
                          vip ? "bg-gold text-abyss" : "bg-abyss/80 text-foam"
                        }`}
                      >
                        {vip ? "★ VIP" : CATEGORIA_LABEL[p.categoria] ?? "Plan"}
                      </span>
                    </div>

                    <div className="flex flex-col p-7 sm:p-9">
                      <h2 className="font-display text-3xl font-medium text-ink">
                        {p.nombre}
                      </h2>
                      {p.idealPara && (
                        <p className={`mt-1 font-display italic ${vip ? "text-gold" : "text-lagoon-2"}`}>
                          {p.idealPara}
                        </p>
                      )}
                      {p.descripcion && (
                        <p className="mt-3 leading-relaxed text-ink/70">
                          {p.descripcion}
                        </p>
                      )}
                      {p.incluye && p.incluye.length > 0 && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {p.incluye.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-ink/75">
                              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-lagoon-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5 sm:mt-6">
                        <span className="font-semibold text-ink">
                          {p.precio || "Consultar precio"}
                        </span>
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                            vip ? "bg-gold text-abyss" : "bg-coral text-white"
                          }`}
                        >
                          Reservar este plan
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}

            {/* Adicionales */}
            <Reveal>
              <div className="rounded-[2rem] border border-lagoon/25 bg-foam p-8 sm:p-10">
                <h2 className="font-display text-2xl font-medium text-ink">
                  Actividades ecológicas <em className="text-lagoon-2">adicionales</em>
                </h2>
                <p className="mt-2 text-sm text-ink/65">
                  Complementa cualquier plan con estas experiencias, bajo un cargo
                  adicional.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {data.actividades.map((a) => (
                    <li
                      key={a.nombre}
                      className="flex items-start justify-between gap-3 rounded-2xl bg-white/80 px-5 py-4"
                    >
                      <span>
                        <span className="block font-semibold text-ink">{a.nombre}</span>
                        {a.descripcion && (
                          <span className="block text-sm text-ink/60">
                            {a.descripcion}
                          </span>
                        )}
                      </span>
                      {a.precio && (
                        <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-coral">
                          {a.precio}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Destinos que visitamos */}
            <Reveal>
              <div className="text-center">
                <h2 className="font-display text-2xl font-medium text-ink">
                  Destinos que visitamos
                </h2>
                <ul className="mt-5 flex flex-wrap justify-center gap-3">
                  {data.destinos.map((d) => (
                    <li
                      key={d.nombre}
                      className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink/80"
                    >
                      {d.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
    </>
  );
}
