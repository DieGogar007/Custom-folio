import "server-only";
import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, hasSanity } from "../env";

const token = process.env.SANITY_API_WRITE_TOKEN || "";

/** True cuando el panel puede guardar cambios (proyecto + token configurados). */
export const hasWriteAccess = hasSanity && token.length > 0;

/** Cliente con permisos de escritura. Solo se usa en el servidor (panel /admin). */
export const writeClient: SanityClient | null = hasWriteAccess
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    })
  : null;
