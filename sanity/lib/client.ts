import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, hasSanity } from "../env";

export const client: SanityClient | null = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
