import type { AstroCookies } from "astro";
import { cleanString } from "./clean";
import { getDraftModeProps } from "./draft-mode";
import { loadQuery } from "./load-query";
import { articleBySlugQuery, relatedReadingFallbackArticlesQuery } from "./queries";
import type { Article, LinkedArticleSummary } from "./types";

async function loadFallbackRelatedArticle(
  article: Article,
  cookies: AstroCookies,
): Promise<LinkedArticleSummary | null> {
  const articleSlug = cleanString(article.slug?.current);

  if (!articleSlug) {
    return null;
  }

  try {
    const response = await loadQuery<LinkedArticleSummary[]>({
      query: relatedReadingFallbackArticlesQuery,
      ...getDraftModeProps(cookies),
    });

    const articles = response.data || [];
    const currentIndex = articles.findIndex((item) => cleanString(item.slug) === articleSlug);
    const fallbackArticle = currentIndex >= 0
      ? articles[currentIndex + 1] || articles[0]
      : articles.find((item) => cleanString(item.slug) !== articleSlug);

    return fallbackArticle && cleanString(fallbackArticle.slug) !== articleSlug
      ? fallbackArticle
      : null;
  } catch (error) {
    console.error("Sanity fallback related article fetch failed.", error);
    return null;
  }
}

export async function loadArticleBySlug(
  slug: string,
  cookies: AstroCookies,
): Promise<Article | null> {
  try {
    const response = await loadQuery<Article | null>({
      query: articleBySlugQuery,
      params: { slug },
      ...getDraftModeProps(cookies),
    });

    const article = response.data || null;

    if (!article) {
      return null;
    }

    const hasSelectedRelatedArticle = Boolean(
      article.furtherReading?.articles?.some((item) => cleanString(item?.slug))
    );

    if (!hasSelectedRelatedArticle) {
      const fallbackArticle = await loadFallbackRelatedArticle(article, cookies);

      if (fallbackArticle) {
        article.furtherReading = {
          _type: "relatedReadingSection",
          articles: [fallbackArticle],
        };
      }
    }

    return article;
  } catch (error) {
    console.error("Sanity article fetch failed.", error);
    return null;
  }
}
