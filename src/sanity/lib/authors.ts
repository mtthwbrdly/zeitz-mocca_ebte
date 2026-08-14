import { cleanString } from "./clean";
import type { Author } from "./types";

export type ArticleWithAuthors = {
  author?: Author;
  authors?: Author[];
};

export function getArticleAuthors(article: ArticleWithAuthors | undefined) {
  const authors = Array.isArray(article?.authors)
    ? article.authors.filter((author): author is Author => Boolean(author?.name))
    : [];

  if (authors.length > 0) {
    return authors;
  }

  return article?.author?.name ? [article.author] : [];
}

export function formatAuthorNames(article: ArticleWithAuthors | undefined) {
  const names = getArticleAuthors(article)
    .map((author) => cleanString(author.name))
    .filter(Boolean);

  if (names.length <= 2) {
    return names.join(" and ");
  }

  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
