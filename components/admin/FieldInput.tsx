"use client";

import { useRef, useState } from "react";
import { api } from "./api";
import type { Campo } from "@/lib/adminConfig";

/** Valor de un campo multimedia en el formulario */
export interface MediaValor {
  _ref: string;
  url?: string;
}

export type ValorCampo =
  | string
  | number
  | boolean
  | string[]
  | MediaValor
  | null
  | undefined;

const inputCls =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:ring-2";

function inputTone(conError: boolean) {
  return conError
    ? `${inputCls} border-coral/60 focus:border-coral focus:ring-coral/20`
    : `${inputCls} border-ink/15 focus:border-lagoon focus:ring-lagoon/20`;
}

/** Tipo de input HTML según el formato declarado (mejora teclado móvil y autocompletado) */
function tipoInput(campo: Campo): string {
  if (campo.formato === "email") return "email";
  if (campo.formato === "telefono") return "tel";
  if (campo.formato === "url") return "url";
  return "text";
}

function MediaInput({
  campo,
  valor,
  onChange,
  disabled,
}: {
  campo: Campo;
  valor: MediaValor | null | undefined;
  onChange: (v: MediaValor | null) => void;
  disabled: boolean;
}) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const esImagen = campo.kind === "image";

  async function subir(archivo: File) {
    setSubiendo(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", archivo);
      fd.append("kind", esImagen ? "image" : "file");
      const r = await api<{ assetId: string; url: string }>(
        "/api/admin/upload",
        { method: "POST", body: fd }
      );
      onChange({ _ref: r.assetId, url: r.url });
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir el archivo");
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div>
      {valor?.url && esImagen && (
        // eslint-disable-next-line @next/next/no-img-element -- vista previa de un asset recién subido
        <img
          src={valor.url}
          alt="Vista previa"
          className="mb-2 h-24 w-full rounded-xl object-cover"
        />
      )}
      {valor && !esImagen && (
        <p className="mb-2 truncate rounded-xl bg-ink/5 px-3 py-2 text-xs text-ink/70">
          🎬 Video cargado
        </p>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept={esImagen ? "image/*" : "video/*"}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) subir(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={disabled || subiendo}
          onClick={() => fileRef.current?.click()}
          className="rounded-xl border border-lagoon/40 px-4 py-2 text-xs font-bold text-lagoon-2 transition hover:bg-lagoon hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {subiendo
            ? "Subiendo…"
            : valor
              ? "Cambiar archivo"
              : esImagen
                ? "Subir foto"
                : "Subir video"}
        </button>
        {valor && (
          <button
            type="button"
            disabled={disabled || subiendo}
            onClick={() => onChange(null)}
            className="rounded-xl px-3 py-2 text-xs font-semibold text-coral transition hover:bg-coral/10 disabled:opacity-40"
          >
            Quitar
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-coral">{error}</p>}
    </div>
  );
}

/** Un campo del formulario, según su tipo. */
export default function FieldInput({
  campo,
  valor,
  onChange,
  disabled = false,
  error,
}: {
  campo: Campo;
  valor: ValorCampo;
  onChange: (v: ValorCampo) => void;
  disabled?: boolean;
  error?: string;
}) {
  const cls = inputTone(Boolean(error));

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink/60">
        {campo.label}
        {campo.required && <span className="ml-0.5 text-coral">*</span>}
      </span>

      {campo.kind === "text" && (
        <input
          type={tipoInput(campo)}
          className={cls}
          value={String(valor ?? "")}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}

      {campo.kind === "textarea" && (
        <textarea
          rows={3}
          className={cls}
          value={String(valor ?? "")}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}

      {campo.kind === "lines" && (
        <textarea
          rows={4}
          className={cls}
          value={Array.isArray(valor) ? valor.join("\n") : String(valor ?? "")}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          disabled={disabled}
          placeholder={"Una cosa por línea"}
        />
      )}

      {campo.kind === "number" && (
        <input
          type="number"
          className={cls}
          min={campo.min}
          max={campo.max}
          value={valor === null || valor === undefined ? "" : String(valor)}
          onChange={(e) =>
            onChange(e.target.value === "" ? null : Number(e.target.value))
          }
          disabled={disabled}
        />
      )}

      {campo.kind === "select" && (
        <select
          className={cls}
          value={String(valor ?? campo.options?.[0]?.value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {campo.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {campo.kind === "boolean" && (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(valor)}
          disabled={disabled}
          onClick={() => onChange(!valor)}
          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition ${
            valor
              ? "border-lagoon/50 bg-lagoon/10 text-lagoon-2"
              : "border-ink/15 bg-white text-ink/60"
          }`}
        >
          <span
            className={`h-4 w-7 rounded-full p-0.5 transition ${valor ? "bg-lagoon" : "bg-ink/20"}`}
          >
            <span
              className={`block h-3 w-3 rounded-full bg-white transition ${valor ? "translate-x-3" : ""}`}
            />
          </span>
          {valor ? "Sí" : "No"}
        </button>
      )}

      {(campo.kind === "image" || campo.kind === "video") && (
        <MediaInput
          campo={campo}
          valor={valor as MediaValor | null | undefined}
          onChange={onChange}
          disabled={disabled}
        />
      )}

      {error && <p className="mt-1.5 text-xs font-semibold text-coral">{error}</p>}
      {campo.help && <p className="mt-1.5 text-xs text-ink/45">{campo.help}</p>}
    </label>
  );
}
