import footnoteIconSvg from "../assets/icons/footnote-outline.svg?raw";
import indexIconSvg from "../assets/icons/index-icon.svg?raw";
import processNoteIconSvg from "../assets/icons/processnote-outline.svg?raw";
import voiceNoteIconSvg from "../assets/icons/voice-outline.svg?raw";
import type { ArticleCategory } from "../sanity/lib/articleCategory";

type CategoryIconKey = ArticleCategory | "all";

const categoryIconSvgs: Record<CategoryIconKey, string> = {
  all: indexIconSvg,
  "process-notes": processNoteIconSvg,
  footnotes: footnoteIconSvg,
  "voice-notes": voiceNoteIconSvg
};

export function getCategoryIconSvg(category?: string) {
  if (category === "process-notes" || category === "footnotes" || category === "voice-notes") {
    return categoryIconSvgs[category];
  }

  return categoryIconSvgs.all;
}
