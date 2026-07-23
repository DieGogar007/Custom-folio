import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  claveCorrecta,
  cookieEsperada,
} from "@/lib/adminAuth";

/** Iniciar sesión en el panel con la clave del administrador. */
export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Falta definir ADMIN_PASSWORD en .env.local" },
      { status: 500 }
    );
  }

  let clave = "";
  try {
    const body = await req.json();
    clave = String(body?.clave ?? "");
  } catch {
    /* cuerpo inválido → clave vacía */
  }

  if (!claveCorrecta(clave)) {
    return NextResponse.json({ error: "Clave incorrecta" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, cookieEsperada()!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}

/** Cerrar sesión. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
