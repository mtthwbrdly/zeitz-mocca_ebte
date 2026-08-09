import type { AstroCookies } from "astro";
import { getDraftModeProps } from "./draft-mode";
import { loadQuery } from "./load-query";
import { authorsIndexQuery } from "./queries";
import type { Author } from "./types";

export async function loadAuthors(cookies: AstroCookies): Promise<Author[]> {
  try {
    const response = await loadQuery<Author[]>({
      query: authorsIndexQuery,
      ...getDraftModeProps(cookies)
    });

    return response.data || [];
  } catch (error) {
    console.error("Sanity authors index fetch failed.", error);
    return [];
  }
}
