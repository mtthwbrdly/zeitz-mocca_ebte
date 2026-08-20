import footnoteIconSvg from "../assets/icons/footnote-outline.svg?raw";
import indexIconSvg from "../assets/icons/index-icon.svg?raw";
import processNoteIconSvg from "../assets/icons/processnote-outline.svg?raw";
import voiceNoteIconSvg from "../assets/icons/voice-outline.svg?raw";
import { normalizeArticleCategory, type ArticleCategory } from "../sanity/lib/articleCategory";

type CategoryIconKey = ArticleCategory | "all";

const categoryIconSvgs: Record<CategoryIconKey, string> = {
  all: indexIconSvg,
  "process-note": processNoteIconSvg,
  "foot-note": footnoteIconSvg,
  "voice-note": voiceNoteIconSvg
};

export function getCategoryIconSvg(category?: string) {
  if (category === "all") {
    return categoryIconSvgs.all;
  }

  return categoryIconSvgs[normalizeArticleCategory(category)];
}
