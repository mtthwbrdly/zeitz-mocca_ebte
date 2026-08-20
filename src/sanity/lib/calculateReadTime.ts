import { cleanString } from "./clean";
import { portableTextToPlainText } from "./renderInlinePortableText";
import { pullQuoteToPlainText } from "./renderPullQuote";
import type { Article, ArticleSection, PortableTextBlock } from "./types";

const WORDS_PER_MINUTE = 220;

type ReadTimeArticle = Partial<Pick<Article, "title" | "excerpt">> & {
  contentSections?: ArticleSection[];
};

function countWords(value: unknown = "") {
  if (typeof value !== "string") {
    return 0;
  }

  const normalized = cleanString(value).trim();
  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

function portableTextWordCount(blocks: PortableTextBlock[] = []) {
  return blocks.reduce((total, block) => {
    const blockText = (block.children || []).map((child) => child.text || "").join(" ");
    return total + countWords(blockText);
  }, 0);
}

function sectionWordCount(section: ArticleSection) {
  switch (section._type) {
    case "richTextSection":
      return portableTextWordCount(section.body);
    case "pullQuoteSection":
      return (
        countWords(pullQuoteToPlainText(section.quote)) +
        countWords(section.attribution)
      );
    case "imageSection":
      return (
        countWords(portableTextToPlainText(section.image?.formattedCaption)) +
        countWords(section.image?.alt)
      );
    case "dividerSection":
    default:
      return 0;
  }
}

export function calculateReadTime(article: ReadTimeArticle = {}) {
  const totalWords =
    countWords(cleanString(article.title)) +
    countWords(cleanString(article.excerpt)) +
    (article.contentSections || []).reduce(
      (total, section) => total + sectionWordCount(section),
      0
    );

  const minutes = Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
  return `${minutes} min`;
}
