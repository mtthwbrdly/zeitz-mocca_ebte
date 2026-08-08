import type { AstroCookies } from "astro";
import { getDraftModeProps } from "./draft-mode";
import { loadQuery } from "./load-query";
import { articlesIndexQuery } from "./queries";
import type { ArticleIndexItem } from "./types";

export async function loadArticleIndex(cookies: AstroCookies): Promise<ArticleIndexItem[]> {
  try {
    const response = await loadQuery<ArticleIndexItem[]>({
      query: articlesIndexQuery,
      ...getDraftModeProps(cookies)
    });

    return response.data || [];
  } catch (error) {
    console.error("Sanity article index fetch failed.", error);
    return [];
  }
}
