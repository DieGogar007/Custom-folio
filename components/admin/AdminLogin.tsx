"use client";

import { useState } from "react";
import { IsotopoMark } from "../Logo";
import { api } from "./api";

/** Pantalla de entrada al panel: una sola clave, sin cuentas externas. */
export default function AdminLogin({ claveConfigurada }: { claveConfigurada: boolean }) {
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError("");
    try {
      await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ clave }),
      });
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo entrar");
      setCargando(false);
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-sand px-4">
      <div className="w-full max-w-sm rounded-[2rem] bg-white/90 p-8 shadow-xl shadow-ink/10 ring-1 ring-ink/5">
        <div className="mb-5 flex justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-abyss">
            <IsotopoMark className="h-9 w-9 text-foam" />
          </span>
        </div>
        <h1 className="text-center font-display text-2xl font-semibold text-ink">
          Panel de El Isótopo
        </h1>
        <p className="mt-1.5 text-center text-sm text-ink/55">
          Escribe tu clave para administrar la página.
        </p>

        {!claveConfigurada ? (
          <p className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-4 text-xs leading-relaxed text-ink/75">
            Aún no hay una clave configurada. Define{" "}
            <code className="font-bold">ADMIN_PASSWORD</code> en el archivo{" "}
            <code className="font-bold">.env.local</code> y reinicia el sitio.
          </p>
        ) : (
          <form onSubmit={entrar} className="mt-6 space-y-3">
            <input
              type="password"
              autoFocus
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Clave de acceso"
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-center text-ink outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
            />
            {error && <p className="text-center text-xs text-coral">{error}</p>}
            <button
              type="submit"
              disabled={cargando || clave.length === 0}
              className="w-full rounded-xl bg-lagoon py-3 font-bold text-white transition hover:bg-lagoon-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {cargando ? "Entrando…" : "Entrar"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
