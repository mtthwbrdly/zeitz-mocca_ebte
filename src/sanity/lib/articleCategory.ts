import { cleanString } from "./clean";
import type { Tag } from "./types";

export type ArticleCategory = "process-notes" | "footnotes" | "voice-notes";

interface ArticleCategoryInput {
  format?: string;
  tags?: Tag[];
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

  if (categoryText.includes("footnote")) {
    return "footnotes";
  }

  if (categoryText.includes("voice")) {
    return "voice-notes";
  }

  return "process-notes";
}

export function getArticleCategoryClass(article: ArticleCategoryInput = {}) {
  return `article-category-${getArticleCategory(article)}`;
}
