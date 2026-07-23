"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import { IsotopoMark } from "../Logo";
import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
  SparkIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "../icons";
import { whatsappLink, mapsLink } from "@/lib/utils";
import { useLang } from "@/lib/useLang";
import type { Settings } from "@/lib/types";

function ActionButton({
  href,
  icon,
  label,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  const cls =
    "flex items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-sand/70 px-3 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-lagoon/50 hover:bg-foam";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {icon}
        {label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      {label}
    </a>
  );
}

/** Tarjeta de presentación: identidad, redes, acciones rápidas y CTA de WhatsApp. */
export default function ContactCard({ settings }: { settings: Settings }) {
  const { t } = useLang();
  const wa = whatsappLink(settings.whatsapp, t.msgReserva);

  const redes = [
    { url: settings.instagram, icon: <InstagramIcon />, label: "Instagram" },
    { url: settings.facebook, icon: <FacebookIcon />, label: "Facebook" },
    { url: settings.tiktok, icon: <TikTokIcon />, label: "TikTok" },
  ].filter((r) => r.url);

  return (
    <section className="relative z-10 -mt-12 px-4">
      <Reveal>
        <div className="rounded-[2rem] bg-white/90 p-6 pt-0 shadow-xl shadow-ink/10 ring-1 ring-ink/5 backdrop-blur">
          {/* Avatar: logo del cliente o la marca del átomo */}
          <div className="-mt-10 mb-4 flex justify-center">
            <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-abyss ring-4 ring-sand">
              {settings.logoUrl ? (
                <Image
                  src={settings.logoUrl}
                  alt={`Logo ${settings.titulo}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <IsotopoMark className="h-11 w-11 text-foam" />
              )}
            </span>
          </div>

          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold tracking-wide text-ink">
              {settings.titulo}
            </h2>
            <p className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-lagoon-2">
              {settings.marcaExperiencias}
            </p>
            {settings.heroSubtitulo && (
              <p className="mx-auto mt-3 max-w-xs font-display text-sm italic leading-relaxed text-ink/65">
                {settings.heroSubtitulo}
              </p>
            )}
          </div>

          {/* Redes sociales */}
          {redes.length > 0 && (
            <div className="mt-4 flex justify-center gap-2.5">
              {redes.map((r) => (
                <a
                  key={r.label}
                  href={r.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-ink transition hover:-translate-y-0.5 hover:bg-lagoon hover:text-white"
                >
                  {r.icon}
                </a>
              ))}
            </div>
          )}

          {/* Acciones rápidas */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {settings.telefono && (
              <ActionButton
                href={`tel:${settings.telefono.replace(/\s/g, "")}`}
                icon={<PhoneIcon className="h-4 w-4 text-lagoon-2" />}
                label={t.llamar}
              />
            )}
            {settings.email && (
              <ActionButton
                href={`mailto:${settings.email}`}
                icon={<MailIcon className="h-4 w-4 text-lagoon-2" />}
                label={t.correo}
              />
            )}
            {settings.direccion && (
              <ActionButton
                href={mapsLink(settings.direccion)}
                icon={<PinIcon className="h-4 w-4 text-lagoon-2" />}
                label={t.comoLlegar}
                external
              />
            )}
            <ActionButton
              href="/catalogo"
              icon={<SparkIcon className="h-4 w-4 text-lagoon-2" />}
              label={t.catalogo}
            />
          </div>

          {/* CTA principal */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25d366] py-4 font-bold text-white shadow-lg shadow-[#25d366]/30 transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.reservaWhatsApp}
          </a>

          {settings.horario && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink/55">
              <ClockIcon className="h-3.5 w-3.5 text-lagoon-2" />
              {settings.horario}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
