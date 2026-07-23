import "server-only";
import { createHmac } from "crypto";
import { cookies } from "next/headers";

/**
 * Acceso al panel /admin: una sola clave (ADMIN_PASSWORD en .env.local).
 * Al entrar bien, se guarda una cookie firmada que dura 30 días.
 * Si cambias la clave, todas las sesiones se invalidan solas.
 */

export const ADMIN_COOKIE = "isotopo_admin";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

function firma(texto: string): string {
  return createHmac("sha256", "el-isotopo-panel-v1").update(texto).digest("hex");
}

/** Valor esperado de la cookie de sesión (o null si no hay clave configurada). */
export function cookieEsperada(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw ? firma(`sesion:${pw}`) : null;
}

/** Comparación en tiempo constante vía HMAC (evita filtrar longitud). */
function iguales(a: string, b: string): boolean {
  return firma(a) === firma(b);
}

/** ¿La clave escrita en el login es correcta? */
export function claveCorrecta(intento: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && iguales(intento, pw);
}

/** ¿El valor de cookie recibido corresponde a una sesión válida? */
export function cookieValida(valor: string | undefined): boolean {
  const esperada = cookieEsperada();
  return !!esperada && !!valor && iguales(valor, esperada);
}

/** Para Server Components: ¿hay sesión de administrador activa? */
export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return cookieValida(jar.get(ADMIN_COOKIE)?.value);
}
