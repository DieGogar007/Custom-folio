"use client";

import { useState } from "react";
import FieldInput, { type ValorCampo, type MediaValor } from "./FieldInput";
import type { Campo } from "@/lib/adminConfig";

export type Valores = Record<string, ValorCampo>;

/**
 * Convierte un documento de Sanity en valores del formulario
 * (las imágenes/videos pasan a { _ref, url } con su vista previa).
 */
export function docAValores(
  fields: Campo[],
  doc: Record<string, unknown>
): Valores {
  const v: Valores = {};
  for (const campo of fields) {
    const crudo = doc[campo.name];
    if (campo.kind === "image" || campo.kind === "video") {
      const ref = (crudo as { asset?: { _ref?: string } } | undefined)?.asset
        ?._ref;
      if (ref) {
        const urlKey =
          campo.name === "foto"
            ? "fotoUrl"
            : campo.name === "video"
              ? "videoUrl"
              : campo.name === "logo"
                ? "logoUrl"
                : campo.name === "heroVideo"
                  ? "heroVideoUrl"
                  : campo.name === "heroPoster"
                    ? "heroPosterUrl"
                    : "imagenUrl";
        v[campo.name] = { _ref: ref, url: doc[urlKey] as string | undefined };
      }
    } else if (crudo !== undefined && crudo !== null) {
      v[campo.name] = crudo as ValorCampo;
    }
  }
  return v;
}

/** Prepara los valores del formulario para enviarlos a la API. */
export function valoresAData(valores: Valores): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(valores)) {
    if (v === undefined) continue;
    data[k] =
      v !== null && typeof v === "object" && "_ref" in v
        ? { _ref: (v as MediaValor)._ref }
        : v;
  }
  return data;
}

/** Formulario genérico: pinta los campos y maneja guardar/cancelar. */
export default function DocForm({
  titulo,
  fields,
  inicial,
  configured,
  onGuardar,
  onCancelar,
}: {
  titulo: string;
  fields: Campo[];
  inicial: Valores;
  configured: boolean;
  onGuardar: (valores: Valores) => Promise<void>;
  onCancelar?: () => void;
}) {
  const [valores, setValores] = useState<Valores>(inicial);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(
    null
  );

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setMensaje(null);
    try {
      await onGuardar(valores);
      setMensaje({ ok: true, texto: "✓ Guardado. La página ya está actualizada." });
    } catch (err) {
      setMensaje({
        ok: false,
        texto: err instanceof Error ? err.message : "No se pudo guardar",
      });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form
      onSubmit={guardar}
      className="rounded-[1.5rem] bg-white/85 p-5 shadow-md shadow-ink/5 ring-1 ring-ink/5"
    >
      <h3 className="mb-4 font-display text-xl font-medium text-ink">{titulo}</h3>

      <div className="space-y-4">
        {fields.map((campo) => (
          <FieldInput
            key={campo.name}
            campo={campo}
            valor={valores[campo.name]}
            onChange={(v) => setValores((prev) => ({ ...prev, [campo.name]: v }))}
            disabled={!configured || guardando}
          />
        ))}
      </div>

      {mensaje && (
        <p
          className={`mt-4 rounded-xl px-4 py-2.5 text-sm font-semibold ${
            mensaje.ok ? "bg-lagoon/10 text-lagoon-2" : "bg-coral/10 text-coral"
          }`}
        >
          {mensaje.texto}
        </p>
      )}

      <div className="mt-5 flex items-center gap-2.5">
        <button
          type="submit"
          disabled={!configured || guardando}
          className="rounded-xl bg-lagoon px-6 py-2.5 text-sm font-bold text-white transition hover:bg-lagoon-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {guardando ? "Guardando…" : "Guardar"}
        </button>
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            disabled={guardando}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-ink/55 transition hover:bg-ink/5"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
