import Image from "next/image";
import Reveal from "./Reveal";
import IslandArt from "./IslandArt";
import WaveDivider from "./WaveDivider";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/utils";
import type { Settings } from "@/lib/types";

export default function Location({ settings }: { settings: Settings }) {
  const fotos = (settings.galeria ?? []).filter(Boolean) as string[];
  const wa = whatsappLink(
    settings.whatsapp,
    "¡Hola El Isótopo! Quiero más información."
  );

  const datos = [
    { Icon: PinIcon, label: settings.direccion },
    { Icon: ClockIcon, label: settings.horario },
    { Icon: PhoneIcon, label: settings.telefono },
    { Icon: MailIcon, label: settings.email },
  ].filter((d) => d.label);

  return (
    <>
      <div className="bg-ink">
        <WaveDivider fill="var(--sand)" />
      </div>
      <section id="ubicacion" className="relative bg-sand py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-lagoon-2">
              <span className="inline-block h-px w-8 bg-current opacity-60" />
              Atención personalizada
            </p>
            <h2 className="font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl">
              Te acompañamos <em className="text-coral">antes, durante y después</em>{" "}
              de tu aventura
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              Visítanos en nuestro punto de atención en Cartagena. Te asesoramos
              persona a persona para armar el plan perfecto según tu presupuesto,
              tu grupo y tus ganas de mar.
            </p>

            <ul className="mt-8 space-y-4">
              {datos.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-4 text-ink/80">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lagoon/15 text-lagoon-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-semibold text-foam transition hover:-translate-y-0.5 hover:bg-abyss"
            >
              <WhatsAppIcon className="h-5 w-5 text-lagoon" />
              Escríbenos por WhatsApp
            </a>
          </Reveal>

          {/* Collage de fotos del lugar */}
          <Reveal delay={150}>
            <div className="relative mx-auto aspect-square max-w-lg">
              {[0, 1, 2].map((i) => {
                const pos = [
                  "left-0 top-6 rotate-[-5deg] z-10",
                  "right-0 top-0 rotate-[4deg] z-20",
                  "left-1/2 bottom-0 -translate-x-1/2 rotate-[-2deg] z-30",
                ][i];
                const src = fotos[i];
                return (
                  <div
                    key={i}
                    className={`absolute h-[52%] w-[62%] overflow-hidden rounded-3xl border-8 border-white bg-abyss shadow-2xl shadow-ink/25 transition-transform duration-500 hover:z-40 hover:scale-105 hover:rotate-0 ${pos}`}
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={`Nuestro punto de atención — foto ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 60vw, 30vw"
                        className="object-cover"
                      />
                    ) : (
                      <IslandArt seed={i + 11} className="h-full w-full" />
                    )}
                  </div>
                );
              })}
            </div>
            {fotos.length === 0 && (
              <p className="mt-6 text-center text-xs text-ink/45">
                Sube las fotos reales de tu punto de atención desde el panel /studio
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
