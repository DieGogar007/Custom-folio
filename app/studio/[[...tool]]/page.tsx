import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { hasSanity } from "../../../sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!hasSanity) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#071e2a",
          color: "#eaf6f3",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
            El panel de contenido aún no está conectado
          </h1>
          <p style={{ lineHeight: 1.7, opacity: 0.85 }}>
            Para activar el editor de contenido (Sanity Studio):
          </p>
          <ol style={{ lineHeight: 2, opacity: 0.85, paddingLeft: "1.2rem" }}>
            <li>
              Crea un proyecto gratis en{" "}
              <a href="https://www.sanity.io/manage" style={{ color: "#17b3a2" }}>
                sanity.io/manage
              </a>
            </li>
            <li>
              Copia el <strong>Project ID</strong> en el archivo{" "}
              <code>.env.local</code>
            </li>
            <li>Reinicia el servidor y vuelve a esta página</li>
          </ol>
          <p style={{ lineHeight: 1.7, opacity: 0.85 }}>
            Mientras tanto, la página funciona con contenido de ejemplo.
          </p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
