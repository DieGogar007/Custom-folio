import Reveal from "../Reveal";
import { PinIcon, ClockIcon } from "../icons";
import { mapsLink } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/** Ubicación en una tarjeta mínima + línea de cierre (reemplaza al footer). */
export default function LocationFinale({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();

  return (
    <section className="px-4 pb-7 pt-9">
      {settings.direccion && (
        <Reveal>
          <div className="flex items-center gap-3.5 rounded-3xl border border-ink/10 bg-white/70 p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lagoon/15 text-lagoon-2">
              <PinIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug text-ink">
                {settings.direccion}
              </p>
              {settings.horario && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
                  <ClockIcon className="h-3.5 w-3.5 shrink-0" />
                  {settings.horario}
                </p>
              )}
            </div>
            <a
              href={mapsLink(settings.direccion)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-lagoon/40 px-3.5 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-lagoon-2 transition hover:bg-lagoon hover:text-white"
            >
              Ir
            </a>
          </div>
        </Reveal>
      )}

      {/* Cierre: una línea en vez de footer */}
      <p className="mt-7 text-center text-[0.65rem] leading-relaxed text-ink/40">
        © {year} {settings.titulo} · Cartagena de Indias, Colombia
        <br />
        {settings.marcaExperiencias}
      </p>
    </section>
  );
}
