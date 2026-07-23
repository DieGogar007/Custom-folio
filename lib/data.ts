import { client } from "@/sanity/lib/client";
import {
  settingsQuery,
  destinosQuery,
  paquetesQuery,
  actividadesQuery,
  experienciasQuery,
  testimoniosQuery,
  logrosQuery,
} from "@/sanity/lib/queries";
import { FALLBACK } from "./fallback";
import type { HomeData, Settings } from "./types";

/** Elimina claves null/undefined para que no pisen el contenido de respaldo */
function clean<T extends object>(obj: T | null | undefined): Partial<T> {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
  ) as Partial<T>;
}

export async function getHomeData(): Promise<HomeData> {
  if (!client) return FALLBACK;

  try {
    const [settings, destinos, paquetes, actividades, experiencias, testimonios, logros] =
      await Promise.all([
        client.fetch<Settings | null>(settingsQuery),
        client.fetch(destinosQuery),
        client.fetch(paquetesQuery),
        client.fetch(actividadesQuery),
        client.fetch(experienciasQuery),
        client.fetch(testimoniosQuery),
        client.fetch(logrosQuery),
      ]);

    return {
      settings: { ...FALLBACK.settings, ...clean(settings) },
      destinos: destinos?.length ? destinos : FALLBACK.destinos,
      paquetes: paquetes?.length ? paquetes : FALLBACK.paquetes,
      actividades: actividades?.length ? actividades : FALLBACK.actividades,
      experiencias: experiencias?.length ? experiencias : FALLBACK.experiencias,
      testimonios: testimonios?.length ? testimonios : FALLBACK.testimonios,
      logros: logros?.length ? logros : FALLBACK.logros,
    };
  } catch {
    return FALLBACK;
  }
}
