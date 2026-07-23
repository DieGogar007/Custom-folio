"use client";

import { useLang } from "@/lib/useLang";
import type { Lang } from "@/lib/i18n";

const OPCIONES: { valor: Lang; label: string }[] = [
  { valor: "es", label: "ES" },
  { valor: "en", label: "EN" },
];

/** Pastilla ES | EN para cambiar el idioma de la página. */
export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="inline-flex rounded-full border border-foam/25 bg-abyss/40 p-0.5 backdrop-blur"
      role="group"
      aria-label="Idioma / Language"
    >
      {OPCIONES.map((o) => (
        <button
          key={o.valor}
          onClick={() => setLang(o.valor)}
          aria-pressed={lang === o.valor}
          className={`rounded-full px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.15em] transition ${
            lang === o.valor
              ? "bg-foam text-ink"
              : "text-foam/70 hover:text-foam"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
