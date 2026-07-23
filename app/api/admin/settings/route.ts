import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, cookieValida } from "@/lib/adminAuth";
import { sanearDocumento } from "@/lib/adminSanitize";
import { SETTINGS_FIELDS, validarDocumento } from "@/lib/adminConfig";
import { writeClient, hasWriteAccess } from "@/sanity/lib/writeClient";

const SETTINGS_ID = "siteSettings";

/** Lee la configuración general del sitio. */
export async function GET(req: NextRequest) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!writeClient) {
    return NextResponse.json({ configured: false, doc: null });
  }

  const doc = await writeClient.fetch(
    `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
      ...,
      "logoUrl": logo.asset->url,
      "heroVideoUrl": heroVideo.asset->url,
      "heroPosterUrl": heroPoster.asset->url
    }`
  );

  return NextResponse.json({ configured: true, doc });
}

/** Guarda la configuración general (documento único). */
export async function PUT(req: NextRequest) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasWriteAccess || !writeClient) {
    return NextResponse.json(
      { error: "El almacenamiento aún no está conectado." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  if (typeof body?.data !== "object" || body.data === null) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const limpio = sanearDocumento(SETTINGS_FIELDS, body.data);
  const errores = validarDocumento(SETTINGS_FIELDS, limpio);
  if (errores.length > 0) {
    return NextResponse.json(
      { error: errores.map((e) => `${e.campo}: ${e.mensaje}`).join(" · ") },
      { status: 400 }
    );
  }
  const aQuitar = Object.keys(limpio).filter((k) => limpio[k] === null);
  const aPoner = Object.fromEntries(
    Object.entries(limpio).filter(([, v]) => v !== null)
  );

  const existe = await writeClient.fetch(`defined(*[_id == $id][0])`, {
    id: SETTINGS_ID,
  });

  if (existe) {
    let patch = writeClient.patch(SETTINGS_ID).set(aPoner);
    if (aQuitar.length > 0) patch = patch.unset(aQuitar);
    await patch.commit();
  } else {
    await writeClient.create({
      _id: SETTINGS_ID,
      _type: "siteSettings",
      ...aPoner,
    });
  }

  revalidatePath("/");
  revalidatePath("/catalogo");
  return NextResponse.json({ ok: true });
}
