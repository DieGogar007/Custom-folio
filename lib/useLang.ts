"use client";

import { useSyncExternalStore } from "react";
import { TEXTOS, type Lang, type Textos } from "./i18n";

/**
 * Idioma de la página, guardado en el navegador del visitante.
 * useSyncExternalStore evita desajustes de hidratación: el servidor
 * siempre pinta en español y el navegador ajusta si el visitante
 * había elegido inglés.
 */

const KEY = "isotopo-lang";
const oyentes = new Set<() => void>();

function getLang(): Lang {
  try {
    return window.localStorage.getItem(KEY) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export function setLang(lang: Lang) {
  try {
    window.localStorage.setItem(KEY, lang);
  } catch {
    /* navegación privada sin localStorage: el cambio dura la sesión */
  }
  oyentes.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  oyentes.add(fn);
  return () => {
    oyentes.delete(fn);
  };
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void; t: Textos } {
  const lang = useSyncExternalStore(subscribe, getLang, () => "es" as Lang);
  return { lang, setLang, t: TEXTOS[lang] };
}
