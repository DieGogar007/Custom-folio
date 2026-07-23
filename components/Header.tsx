"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { whatsappLink } from "@/lib/utils";
import type { Settings } from "@/lib/types";

const LINKS = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Destinos", href: "/#destinos" },
  { label: "Paquetes", href: "/#paquetes" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Experiencias", href: "/#experiencias" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Header({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = whatsappLink(
    settings.whatsapp,
    "¡Hola El Isótopo! Quiero información sobre sus tours."
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-foam/10 bg-abyss/90 py-2 backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/#inicio" aria-label="El Isótopo — inicio" onClick={() => setOpen(false)}>
          <Logo logoUrl={settings.logoUrl} light />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-foam/80 transition hover:text-foam"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral/90"
          >
            Reservar
          </a>
        </nav>

        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-foam/25 text-foam lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-transform ${
              open ? "-translate-y-1 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 top-0 -z-10 flex flex-col justify-center bg-abyss/97 px-8 backdrop-blur-lg transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-foam/10 py-4 font-display text-3xl text-foam transition hover:pl-2 hover:text-lagoon"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-full bg-coral px-6 py-4 text-center text-lg font-semibold text-white"
        >
          Reservar por WhatsApp
        </a>
      </div>
    </header>
  );
}
