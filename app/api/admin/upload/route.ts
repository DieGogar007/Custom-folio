import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, cookieValida } from "@/lib/adminAuth";
import { writeClient, hasWriteAccess } from "@/sanity/lib/writeClient";

/** Límite de subida: 200 MB (videos de portada incluidos). */
const MAX_BYTES = 200 * 1024 * 1024;

/**
 * Sube una foto o un video a Sanity y devuelve la referencia del asset.
 * El formulario del panel la incluye luego al guardar el documento.
 */
export async function POST(req: NextRequest) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasWriteAccess || !writeClient) {
    return NextResponse.json(
      { error: "El almacenamiento aún no está conectado." },
      { status: 503 }
    );
  }

  const form = await req.formData().catch(() => null);
  const archivo = form?.get("file");
  const kind = form?.get("kind") === "file" ? "file" : "image";

  if (!(archivo instanceof File) || archivo.size === 0) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }
  if (archivo.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "El archivo supera el límite de 200 MB" },
      { status: 413 }
    );
  }
  if (kind === "image" && !archivo.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "El archivo debe ser una imagen" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await archivo.arrayBuffer());
  const asset = await writeClient.assets.upload(kind, buffer, {
    filename: archivo.name,
  });

  return NextResponse.json({ ok: true, assetId: asset._id, url: asset.url });
}
