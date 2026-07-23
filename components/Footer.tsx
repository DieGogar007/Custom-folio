import Link from "next/link";
import Logo from "./Logo";
import WaveDivider from "./WaveDivider";
import { PinIcon, PhoneIcon, MailIcon } from "./icons";
import type { Settings } from "@/lib/types";

const MENU = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Destinos", href: "/#destinos" },
  { label: "Paquetes", href: "/#paquetes" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Experiencias", href: "/#experiencias" },
  { label: "Sostenibilidad", href: "/#sostenibilidad" },
];

export default function Footer({ settings }: { settings: Settings }) {
  const redes = [
    { label: "Instagram", href: settings.instagram },
    { label: "Facebook", href: settings.facebook },
    { label: "TikTok", href: settings.tiktok },
  ].filter((r) => r.href);

  return (
    <>
      <div className="bg-foam">
        <WaveDivider fill="var(--abyss)" />
      </div>
      <footer id="contacto" className="grain relative bg-abyss pb-10 pt-16 text-foam">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo logoUrl={settings.logoUrl} light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foam/60">
              Tours en lancha, islas paradisíacas y experiencias a tu medida en
              Cartagena de Indias y Barú.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-lagoon">
              {settings.marcaExperiencias}
            </p>
          </div>

          <nav aria-label="Menú del pie de página">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-foam/50">
              Menú
            </h3>
            <ul className="space-y-2.5">
              {MENU.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="text-sm text-foam/75 transition hover:text-lagoon"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-foam/50">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-foam/75">
              {settings.direccion && (
                <li className="flex items-start gap-2.5">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                  {settings.direccion}
                </li>
              )}
              {settings.telefono && (
                <li className="flex items-start gap-2.5">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                  {settings.telefono}
                </li>
              )}
              {settings.email && (
                <li className="flex items-start gap-2.5">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                  <a href={`mailto:${settings.email}`} className="hover:text-lagoon">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.horario && (
                <li className="text-foam/55">{settings.horario}</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-foam/50">
              Síguenos
            </h3>
            {redes.length > 0 ? (
              <ul className="space-y-2.5">
                {redes.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foam/75 transition hover:text-lagoon"
                    >
                      {r.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-foam/45">
                Agrega tus redes sociales desde el panel de contenido.
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-foam/10 px-5 pt-6 text-xs text-foam/45 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {settings.titulo}. Todos los derechos
            reservados.
          </p>
          <p className="flex items-center gap-4">
            Hecho con ❤ en Cartagena de Indias
            <Link href="/studio" className="opacity-60 transition hover:opacity-100">
              Editar contenido
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
