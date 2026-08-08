import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "p7t0rr17",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-07-09",
  useCdn: false
};

export const hasSanityConfig = Boolean(
  sanityConfig.projectId && sanityConfig.dataset
);

export const sanityClient = hasSanityConfig
  ? createClient(sanityConfig)
  : null;
