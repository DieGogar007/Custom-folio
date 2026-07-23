import type { Metadata } from "next";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminShell from "@/components/admin/AdminShell";
import { isAdmin } from "@/lib/adminAuth";
import { hasWriteAccess } from "@/sanity/lib/writeClient";

export const metadata: Metadata = {
  title: "Panel administrativo",
  robots: { index: false, follow: false },
};

/**
 * Panel administrativo de El Isótopo. El administrador entra con una clave
 * propia (ADMIN_PASSWORD) — nunca ve ni necesita una cuenta de Sanity.
 */
export default async function AdminPage() {
  const sesion = await isAdmin();

  if (!sesion) {
    return <AdminLogin claveConfigurada={Boolean(process.env.ADMIN_PASSWORD)} />;
  }

  return <AdminShell configured={hasWriteAccess} />;
}
