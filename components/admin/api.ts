"use client";

/** Llamadas del panel a las rutas API, con errores legibles en español. */
export async function api<T = Record<string, unknown>>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(path, {
    headers:
      init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : undefined,
    ...init,
  });

  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    /* respuesta sin JSON */
  }

  if (!res.ok) {
    throw new Error(
      String(data.error ?? `Error ${res.status}. Intenta de nuevo.`)
    );
  }
  return data as T;
}
