"use client";

import { useState } from "react";
import { IsotopoMark } from "../Logo";
import { api } from "./api";
import DocumentManager from "./DocumentManager";
import SettingsForm from "./SettingsForm";
import { TIPOS } from "@/lib/adminConfig";

const TAB_SETTINGS = "__settings__";

/** Estructura del panel: encabezado, pestañas y el editor activo. */
export default function AdminShell({ configured }: { configured: boolean }) {
  const [tab, setTab] = useState(TAB_SETTINGS);

  async function salir() {
    await api("/api/admin/login", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <main className="min-h-svh bg-sand pb-16">
      {/* Encabezado */}
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3.5">
          <span className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-abyss">
              <IsotopoMark className="h-5 w-5 text-foam" />
            </span>
            <span className="font-display text-lg font-semibold text-ink">
              Panel administrativo
            </span>
          </span>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-semibold text-ink/70 transition hover:border-lagoon/50 hover:text-lagoon-2"
            >
              Ver la página ↗
            </a>
            <button
              onClick={salir}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink/50 transition hover:text-coral"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4">
        {!configured && (
          <p className="mt-5 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm leading-relaxed text-ink/75">
            ⚠️ El almacenamiento aún no está conectado: puedes explorar el
            panel, pero los cambios no se guardarán. (Falta configurar el
            proyecto de Sanity y su token en <code>.env.local</code>.)
          </p>
        )}

        {/* Pestañas */}
        <nav className="no-scrollbar -mx-4 mt-5 flex gap-1.5 overflow-x-auto px-4">
          <button
            onClick={() => setTab(TAB_SETTINGS)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === TAB_SETTINGS
                ? "bg-abyss text-foam"
                : "text-ink/60 hover:bg-ink/5"
            }`}
          >
            Configuración
          </button>
          {TIPOS.map((t) => (
            <button
              key={t.type}
              onClick={() => setTab(t.type)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t.type ? "bg-abyss text-foam" : "text-ink/60 hover:bg-ink/5"
              }`}
            >
              {t.plural}
            </button>
          ))}
        </nav>

        {/* Contenido */}
        <div className="mt-6">
          {tab === TAB_SETTINGS ? (
            <SettingsForm configured={configured} />
          ) : (
            <DocumentManager
              key={tab}
              tipo={TIPOS.find((t) => t.type === tab)!}
              configured={configured}
            />
          )}
        </div>
      </div>
    </main>
  );
}
