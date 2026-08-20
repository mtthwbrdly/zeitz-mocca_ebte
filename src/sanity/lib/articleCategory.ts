import { cleanString } from "./clean";
import type { Tag } from "./types";

export type ArticleCategory = "process-note" | "foot-note" | "voice-note";

interface ArticleCategoryInput {
  format?: string;
  tags?: Tag[];
}

export function normalizeArticleCategory(category?: string): ArticleCategory {
  const value = cleanString(category).toLowerCase();

  if (value === "foot-note" || value === "foot-notes" || value === "footnote" || value === "footnotes") {
    return "foot-note";
  }

  if (value === "voice-note" || value === "voice-notes") {
    return "voice-note";
  }

  return "process-note";
}

export function getArticleCategory(article: ArticleCategoryInput = {}): ArticleCategory {
  const categoryText = [
    article.format,
    ...(article.tags || []).flatMap((tag) => [
      tag.title,
      tag.slug?.current
    ])
  ]
    .map((value) => cleanString(value).toLowerCase())
    .join(" ");

  const directCategory = normalizeArticleCategory(article.format);
  if (article.format && directCategory !== "process-note") {
    return directCategory;
  }

  if (categoryText.includes("foot-note") || categoryText.includes("foot note") || categoryText.includes("footnote")) {
    return "foot-note";
  }

  if (categoryText.includes("voice")) {
    return "voice-note";
  }

  return normalizeArticleCategory(article.format);
}

export function getArticleCategoryClass(article: ArticleCategoryInput = {}) {
  return `article-category-${getArticleCategory(article)}`;
}

export function getFormatTitle(format?: string) {
  if (!format) return undefined;
  const map: Record<string, string> = {
    "foot-note": "Foot Note",
    "process-note": "Process Note",
    "voice-note": "Voice Note"
  };

  return map[format] || format;
}
