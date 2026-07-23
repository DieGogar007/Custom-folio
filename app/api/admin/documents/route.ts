import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, cookieValida } from "@/lib/adminAuth";
import { sanearDocumento } from "@/lib/adminSanitize";
import { tipoPorNombre } from "@/lib/adminConfig";
import { writeClient, hasWriteAccess } from "@/sanity/lib/writeClient";

function noAutorizado() {
  return NextResponse.json({ error: "No autorizado" }, { status: 401 });
}

function sinSanity() {
  return NextResponse.json(
    { error: "El almacenamiento aún no está conectado." },
    { status: 503 }
  );
}

function revalidar() {
  revalidatePath("/");
  revalidatePath("/catalogo");
}

/** Lista los documentos de un tipo, en el mismo orden en que salen en la página. */
export async function GET(req: NextRequest) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) return noAutorizado();

  const tipo = tipoPorNombre(req.nextUrl.searchParams.get("type") ?? "");
  if (!tipo) {
    return NextResponse.json({ error: "Tipo desconocido" }, { status: 400 });
  }
  if (!writeClient) {
    return NextResponse.json({ configured: false, docs: [] });
  }

  const docs = await writeClient.fetch(
    `*[_type == $type && !(_id in path("drafts.**"))] | order(orden asc){
      ...,
      "imagenUrl": imagen.asset->url,
      "fotoUrl": foto.asset->url,
      "videoUrl": video.asset->url
    }`,
    { type: tipo.type }
  );

  return NextResponse.json({ configured: true, docs });
}

/** Crea un documento nuevo. */
export async function POST(req: NextRequest) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) return noAutorizado();
  if (!hasWriteAccess || !writeClient) return sinSanity();

  const body = await req.json().catch(() => null);
  const tipo = tipoPorNombre(String(body?.type ?? ""));
  if (!tipo || typeof body?.data !== "object" || body.data === null) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const limpio = sanearDocumento(tipo.fields, body.data);
  const creado = await writeClient.create({ _type: tipo.type, ...limpio });
  revalidar();
  return NextResponse.json({ ok: true, id: creado._id });
}
