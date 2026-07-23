import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, cookieValida } from "@/lib/adminAuth";
import { sanearDocumento } from "@/lib/adminSanitize";
import { tipoPorNombre } from "@/lib/adminConfig";
import { writeClient, hasWriteAccess } from "@/sanity/lib/writeClient";

type Ctx = { params: Promise<{ id: string }> };

function revalidar() {
  revalidatePath("/");
  revalidatePath("/catalogo");
}

/** Actualiza un documento existente. */
export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasWriteAccess || !writeClient) {
    return NextResponse.json(
      { error: "El almacenamiento aún no está conectado." },
      { status: 503 }
    );
  }

  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const tipo = tipoPorNombre(String(body?.type ?? ""));
  if (!tipo || typeof body?.data !== "object" || body.data === null) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const limpio = sanearDocumento(tipo.fields, body.data);

  // Los campos en null se eliminan del documento (ej: quitar una foto)
  const aQuitar = Object.keys(limpio).filter((k) => limpio[k] === null);
  const aPoner = Object.fromEntries(
    Object.entries(limpio).filter(([, v]) => v !== null)
  );

  let patch = writeClient.patch(id).set(aPoner);
  if (aQuitar.length > 0) patch = patch.unset(aQuitar);
  await patch.commit();

  revalidar();
  return NextResponse.json({ ok: true });
}

/** Elimina un documento. */
export async function DELETE(req: NextRequest, ctx: Ctx) {
  if (!cookieValida(req.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!hasWriteAccess || !writeClient) {
    return NextResponse.json(
      { error: "El almacenamiento aún no está conectado." },
      { status: 503 }
    );
  }

  const { id } = await ctx.params;
  await writeClient.delete(id);
  revalidar();
  return NextResponse.json({ ok: true });
}
