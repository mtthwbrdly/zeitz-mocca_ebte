import { article } from "./article.ts";
import { articleIndexSection } from "./articleIndexSection.ts";
import { audioPlayerSection } from "./audioPlayerSection.ts";
import { author } from "./author.ts";
import { categoryCardsSection } from "./categoryCardsSection.ts";
import { commentsSection } from "./commentsSection.ts";
import { dividerSection } from "./dividerSection.ts";
import { featureCardSection } from "./featureCardSection.ts";
import { imageSection } from "./imageSection.ts";
import { homePage } from "./homePage.ts";
import { portableText } from "./portableText.ts";
import { pullQuoteSection } from "./pullQuoteSection.ts";
import { relatedReadingSection } from "./relatedReadingSection.ts";
import { richTextSection } from "./richTextSection.ts";
import { shareClippingSection } from "./shareClippingSection.ts";
import { tag } from "./tag.ts";
import { videoSection } from "./videoSection.ts";

export const schemaTypes = [
  homePage,
  article,
  articleIndexSection,
  categoryCardsSection,
  audioPlayerSection,
  videoSection,
  author,
  tag,
  portableText,
  richTextSection,
  pullQuoteSection,
  shareClippingSection,
  featureCardSection,
  relatedReadingSection,
  imageSection,
  commentsSection,
  dividerSection
];
