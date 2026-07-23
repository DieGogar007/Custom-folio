export const apiVersion = "2026-07-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True cuando hay un proyecto de Sanity configurado en .env.local */
export const hasSanity = projectId.length > 0;
