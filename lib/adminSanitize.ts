import "server-only";
import type { Campo } from "./adminConfig";

/**
 * Convierte lo que llega del formulario del panel en un objeto seguro
 * para Sanity: solo campos permitidos, con el tipo correcto.
 */
export function sanearDocumento(
  fields: Campo[],
  data: Record<string, unknown>
): Record<string, unknown> {
  const limpio: Record<string, unknown> = {};

  for (const campo of fields) {
    const v = data[campo.name];
    if (v === undefined) continue;

    switch (campo.kind) {
      case "text":
      case "textarea": {
        const s = String(v ?? "").trim();
        limpio[campo.name] = s || null;
        break;
      }
      case "select": {
        const s = String(v ?? "");
        if (campo.options?.some((o) => o.value === s)) limpio[campo.name] = s;
        break;
      }
      case "number": {
        if (v === null || v === "") {
          limpio[campo.name] = null;
        } else {
          const n = Number(v);
          if (Number.isFinite(n)) limpio[campo.name] = n;
        }
        break;
      }
      case "boolean":
        limpio[campo.name] = Boolean(v);
        break;
      case "lines": {
        const arr = Array.isArray(v) ? v : String(v ?? "").split("\n");
        limpio[campo.name] = arr
          .map((x) => String(x).trim())
          .filter((x) => x.length > 0);
        break;
      }
      case "image":
      case "video": {
        if (v === null) {
          limpio[campo.name] = null; // quitar la imagen/video
          break;
        }
        const ref =
          typeof v === "object" && v !== null
            ? String((v as { _ref?: unknown })._ref ?? "")
            : "";
        // Solo referencias de assets de Sanity (image-... / file-...)
        if (/^(image|file)-[a-zA-Z0-9-]+$/.test(ref)) {
          limpio[campo.name] = {
            _type: campo.kind === "image" ? "image" : "file",
            asset: { _type: "reference", _ref: ref },
          };
        }
        break;
      }
    }
  }

  return limpio;
}
