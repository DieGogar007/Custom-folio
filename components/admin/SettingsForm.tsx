"use client";

import { useEffect, useState } from "react";
import { api } from "./api";
import DocForm, { docAValores, valoresAData, type Valores } from "./DocForm";
import { SETTINGS_FIELDS } from "@/lib/adminConfig";

/** Configuración general del sitio: un solo documento con todo lo global. */
export default function SettingsForm({ configured }: { configured: boolean }) {
  const [inicial, setInicial] = useState<Valores | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await api<{ doc: Record<string, unknown> | null }>(
          "/api/admin/settings"
        );
        setInicial(r.doc ? docAValores(SETTINGS_FIELDS, r.doc) : {});
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo cargar");
        setInicial({});
      }
    })();
  }, []);

  if (inicial === null) {
    return <p className="py-10 text-center text-sm text-ink/45">Cargando…</p>;
  }

  return (
    <div>
      {error && (
        <p className="mb-4 rounded-xl bg-coral/10 px-4 py-2.5 text-sm font-semibold text-coral">
          {error}
        </p>
      )}
      <DocForm
        titulo="Configuración del sitio"
        fields={SETTINGS_FIELDS}
        inicial={inicial}
        configured={configured}
        onGuardar={async (valores) => {
          await api("/api/admin/settings", {
            method: "PUT",
            body: JSON.stringify({ data: valoresAData(valores) }),
          });
        }}
      />
    </div>
  );
}
