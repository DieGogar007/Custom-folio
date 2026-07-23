"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import IslandArt from "../IslandArt";
import {
  CheckIcon,
  WhatsAppIcon,
  FishIcon,
  SnorkelIcon,
  BirdIcon,
  SparkIcon,
} from "../icons";
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

type Detalle =
  | { tipo: "paquete"; item: Paquete; seed: number }
  | { tipo: "actividad"; item: Actividad; seed: number };

/** Hoja inferior con el detalle del plan y el botón de reserva. */
function DetalleSheet({
  detalle,
  whatsapp,
  onClose,
}: {
  detalle: Detalle;
  whatsapp?: string;
  onClose: () => void;
}) {
  const { item, tipo, seed } = detalle;
  const vip =
    tipo === "paquete" &&
    ((item as Paquete).destacado || (item as Paquete).categoria === "vip");
  const paquete = tipo === "paquete" ? (item as Paquete) : null;

  const wa = whatsappLink(
    whatsapp,
    tipo === "paquete"
      ? `¡Hola El Isótopo! Quiero reservar el plan "${item.nombre}".`
      : `¡Hola El Isótopo! Quiero agregar la actividad "${item.nombre}" a mi plan.`
  );

  // Cerrar con Escape y bloquear el scroll del fondo mientras la hoja está abierta
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="animate-fade-in absolute inset-0 bg-abyss/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.nombre}
        className="animate-sheet-up absolute inset-x-0 bottom-0 mx-auto max-h-[86svh] w-full overflow-y-auto rounded-t-[2rem] bg-sand p-5 pb-8 sm:bottom-8 sm:max-w-md sm:rounded-[2rem]"
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink/15 sm:hidden" aria-hidden />

        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-abyss/40 text-foam backdrop-blur transition hover:bg-abyss/60"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {/* Imagen del plan */}
        <div className="relative mb-5 h-44 overflow-hidden rounded-3xl">
          {item.imagenUrl ? (
            <Image
              src={item.imagenUrl}
              alt={item.nombre}
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover"
            />
          ) : (
            <IslandArt seed={seed + 2} className="h-full w-full" />
          )}
          <span
            className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] ${
              vip ? "bg-gold text-abyss" : "bg-abyss/75 text-foam backdrop-blur"
            }`}
          >
            {vip
              ? "★ VIP"
              : paquete
                ? (CATEGORIA_LABEL[paquete.categoria] ?? "Plan")
                : "Actividad"}
          </span>
        </div>

        <h3 className="font-display text-2xl font-medium text-ink">{item.nombre}</h3>
        {paquete?.idealPara && (
          <p className={`mt-1 font-display italic ${vip ? "text-gold" : "text-lagoon-2"}`}>
            {paquete.idealPara}
          </p>
        )}
        {item.descripcion && (
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.descripcion}</p>
        )}

        {paquete?.incluye && paquete.incluye.length > 0 && (
          <>
            <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ink/45">
              Incluye
            </p>
            <ul className="mt-2 space-y-2">
              {paquete.incluye.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <CheckIcon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${vip ? "text-gold" : "text-lagoon-2"}`}
                  />
                  {inc}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ink/45">
            Precio
          </span>
          <span className="text-sm font-bold text-ink">
            {item.precio || "Consultar"}
          </span>
        </div>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25d366] py-4 font-bold text-white shadow-lg shadow-[#25d366]/30 transition hover:brightness-105 active:scale-[0.99]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Reservar por WhatsApp
        </a>
      </div>
    </div>
  );
}

/** Grid compacto de planes: cada tarjeta abre la hoja de detalle. */
export default function PlanesCompact({
  paquetes,
  actividades,
  settings,
}: {
  paquetes: Paquete[];
  actividades: Actividad[];
  settings: Settings;
}) {
  const [detalle, setDetalle] = useState<Detalle | null>(null);

  return (
    <section id="paquetes" className="px-4 pt-10">
      <Reveal className="text-center">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-coral">
          Planes &amp; Tours
        </p>
        <h2 className="mt-2 font-display text-[1.7rem] font-medium leading-tight text-ink">
          Elige tu día de <em className="text-lagoon-2">islas</em>
        </h2>
        <p className="mt-1.5 text-xs text-ink/50">
          Toca un plan para ver detalles y reservar.
        </p>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {paquetes.map((p, i) => {
          const vip = p.destacado || p.categoria === "vip";
          return (
            <Reveal
              key={p.nombre}
              delay={(i % 2) * 90}
              className={vip ? "col-span-2" : ""}
            >
              <button
                onClick={() => setDetalle({ tipo: "paquete", item: p, seed: i })}
                className={`group relative block w-full overflow-hidden rounded-3xl text-left shadow-md shadow-ink/10 transition active:scale-[0.97] ${
                  vip ? "aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                {p.imagenUrl ? (
                  <Image
                    src={p.imagenUrl}
                    alt={p.nombre}
                    fill
                    sizes={
                      vip ? "(max-width: 640px) 100vw, 448px" : "(max-width: 640px) 50vw, 224px"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <IslandArt seed={i + 2} className="h-full w-full" />
                  </span>
                )}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-abyss/85 via-abyss/10 to-transparent"
                  aria-hidden
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] ${
                    vip ? "bg-gold text-abyss" : "bg-abyss/70 text-foam backdrop-blur"
                  }`}
                >
                  {vip ? "★ VIP" : (CATEGORIA_LABEL[p.categoria] ?? "Plan")}
                </span>
                <span className="absolute inset-x-3 bottom-3">
                  <span className="block font-display text-base font-medium leading-tight text-foam">
                    {p.nombre}
                  </span>
                  <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.2em] text-foam/65">
                    Ver detalle →
                  </span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Actividades adicionales: chips deslizables */}
      {actividades.length > 0 && (
        <Reveal>
          <p className="mt-7 text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-ink/45">
            Complementa tu plan
          </p>
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
            {actividades.map((a, i) => {
              const Icon = actividadIcon(a.nombre);
              return (
                <button
                  key={a.nombre}
                  onClick={() =>
                    setDetalle({ tipo: "actividad", item: a, seed: i + 20 })
                  }
                  className="flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white/75 px-4 py-2.5 text-xs font-semibold text-ink transition hover:border-lagoon/50 hover:bg-foam active:scale-95"
                >
                  <Icon className="h-4 w-4 text-lagoon-2" />
                  {a.nombre}
                </button>
              );
            })}
          </div>
        </Reveal>
      )}

      <Reveal className="mt-5 text-center">
        <Link
          href="/catalogo"
          className="text-xs font-bold text-lagoon-2 underline-offset-4 transition hover:underline"
        >
          Ver el catálogo completo →
        </Link>
      </Reveal>

      {detalle && (
        <DetalleSheet
          detalle={detalle}
          whatsapp={settings.whatsapp}
          onClose={() => setDetalle(null)}
        />
      )}
    </section>
  );
}
