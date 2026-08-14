import { cleanString } from "./clean";
import type { CitationReferenceMap } from "./citations";
import { renderPortableText } from "./renderPortableText";
import type { PortableTextBlock } from "./types";

export type PullQuoteValue = string | PortableTextBlock[];

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export function pullQuoteToPlainText(value: PullQuoteValue | undefined) {
  if (Array.isArray(value)) {
    return value
      .map((block) =>
        (block.children || []).map((child) => cleanString(child.text)).join("")
      )
      .filter(Boolean)
      .join(" ");
  }

  return cleanString(value);
}

export function renderPullQuote(
  value: PullQuoteValue | undefined,
  citationMap: CitationReferenceMap = {}
) {
  if (Array.isArray(value)) {
    return renderPortableText(value, citationMap);
  }

  const quote = cleanString(value);
  return quote ? `<p>${escapeHtml(quote)}</p>` : "";
}
