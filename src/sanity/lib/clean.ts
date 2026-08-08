import { stegaClean } from "@sanity/client/stega";

export function cleanString(value: string | null | undefined) {
  return typeof value === "string" ? stegaClean(value) : "";
}
