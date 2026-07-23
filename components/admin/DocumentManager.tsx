"use client";

import { useEffect, useState } from "react";
import { api } from "./api";
import DocForm, { docAValores, valoresAData, type Valores } from "./DocForm";
import type { TipoDoc } from "@/lib/adminConfig";

type Doc = Record<string, unknown> & { _id: string };

/** Lista + crear + editar + eliminar documentos de un tipo (planes, comentarios…). */
export default function DocumentManager({
  tipo,
  configured,
}: {
  tipo: TipoDoc;
  configured: boolean;
}) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  // Sube de a 1 para volver a pedir la lista tras guardar/eliminar
  const [recarga, setRecarga] = useState(0);
  // null = viendo lista · "nuevo" = creando · Doc = editando
  const [editando, setEditando] = useState<Doc | "nuevo" | null>(null);

  useEffect(() => {
    let cancelado = false;
    api<{ docs: Doc[] }>(`/api/admin/documents?type=${tipo.type}`)
      .then((r) => {
        if (cancelado) return;
        setDocs(r.docs ?? []);
        setError("");
        setCargando(false);
      })
      .catch((e) => {
        if (cancelado) return;
        setError(e instanceof Error ? e.message : "No se pudo cargar la lista");
        setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [tipo.type, recarga]);

  async function guardar(valores: Valores) {
    if (editando === "nuevo") {
      await api("/api/admin/documents", {
        method: "POST",
        body: JSON.stringify({ type: tipo.type, data: valoresAData(valores) }),
      });
    } else if (editando) {
      await api(`/api/admin/documents/${editando._id}`, {
        method: "PATCH",
        body: JSON.stringify({ type: tipo.type, data: valoresAData(valores) }),
      });
    }
    setCargando(true);
    setEditando(null);
    setRecarga((n) => n + 1);
  }

  async function eliminar(doc: Doc) {
    const nombre = String(doc[tipo.titleField] ?? tipo.singular.toLowerCase());
    if (!window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    try {
      await api(`/api/admin/documents/${doc._id}`, { method: "DELETE" });
      setCargando(true);
      setRecarga((n) => n + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar");
    }
  }

  if (editando !== null) {
    return (
      <DocForm
        titulo={
          editando === "nuevo"
            ? `Nuevo ${tipo.singular.toLowerCase()}`
            : `Editar ${tipo.singular.toLowerCase()}`
        }
        fields={tipo.fields}
        inicial={editando === "nuevo" ? {} : docAValores(tipo.fields, editando)}
        configured={configured}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-ink">
          {tipo.plural}
        </h2>
        <button
          onClick={() => setEditando("nuevo")}
          disabled={!configured}
          className="rounded-xl bg-coral px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          + Agregar
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-xl bg-coral/10 px-4 py-2.5 text-sm font-semibold text-coral">
          {error}
        </p>
      )}

      {cargando ? (
        <p className="py-10 text-center text-sm text-ink/45">Cargando…</p>
      ) : docs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ink/15 py-10 text-center text-sm text-ink/45">
          {configured
            ? `Aún no hay ${tipo.plural.toLowerCase()}. Usa “+ Agregar”.`
            : "La lista aparecerá cuando el almacenamiento esté conectado."}
        </p>
      ) : (
        <ul className="space-y-2.5">
          {docs.map((doc) => {
            const thumb = (doc.imagenUrl ?? doc.fotoUrl) as string | undefined;
            return (
              <li
                key={doc._id}
                className="flex items-center gap-3.5 rounded-2xl bg-white/85 p-3.5 shadow-sm shadow-ink/5 ring-1 ring-ink/5"
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- miniaturas del panel
                  <img
                    src={`${thumb}?w=96&h=96&fit=crop`}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink/5 text-lg">
                    {tipo.type === "testimonio" ? "💬" : "🏝️"}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">
                    {String(doc[tipo.titleField] ?? "(sin título)")}
                  </p>
                  {typeof doc.orden === "number" && (
                    <p className="text-xs text-ink/45">Orden: {doc.orden}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditando(doc)}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold text-lagoon-2 transition hover:bg-lagoon/10"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(doc)}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold text-coral transition hover:bg-coral/10"
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
