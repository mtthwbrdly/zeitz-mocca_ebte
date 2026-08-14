import { cleanString } from "./clean";
import type {
  ArticleSection,
  PortableTextBlock,
  PortableTextCitationMarkDef,
  PortableTextMarkDef
} from "./types";

export interface CitationReference {
  _key: string;
  id: string;
  note?: string;
  number: number;
  source: string;
  targetId: string;
  url?: string;
}

export type CitationReferenceMap = Record<string, CitationReference>;

export function citationReferenceId(citationKey: string) {
  return `citation-reference-${citationKey.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

export function citationPanelId(citationKey: string) {
  return `citation-panel-${citationKey.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

function isCitationMarkDef(markDef: PortableTextMarkDef | undefined): markDef is PortableTextCitationMarkDef {
  return markDef?._type === "citation";
}

function getUsedCitationKeys(block: PortableTextBlock) {
  const usedMarks = new Set<string>();

  block.children?.forEach((child) => {
    child.marks?.forEach((mark) => usedMarks.add(mark));
  });

  return usedMarks;
}

export function extractCitationsFromBlocks(blocks: PortableTextBlock[] = []) {
  const citations: PortableTextCitationMarkDef[] = [];
  const seenKeys = new Set<string>();

  blocks.forEach((block) => {
    const usedCitationKeys = getUsedCitationKeys(block);

    block.markDefs?.forEach((markDef) => {
      if (!isCitationMarkDef(markDef) || seenKeys.has(markDef._key)) {
        return;
      }

      if (!usedCitationKeys.has(markDef._key) || !cleanString(markDef.source).trim()) {
        return;
      }

      seenKeys.add(markDef._key);
      citations.push(markDef);
    });
  });

  return citations;
}

export function extractArticleCitations(sections: ArticleSection[] = []) {
  const citations: CitationReference[] = [];
  const citationMap: CitationReferenceMap = {};

  sections.forEach((section) => {
    const blocks =
      section._type === "richTextSection"
        ? section.body
        : section._type === "pullQuoteSection" && Array.isArray(section.quote)
          ? section.quote
          : [];

    if (blocks.length === 0) {
      return;
    }

    extractCitationsFromBlocks(blocks).forEach((citation) => {
      if (citationMap[citation._key]) {
        return;
      }

      const reference: CitationReference = {
        _key: citation._key,
        id: citationPanelId(citation._key),
        note: cleanString(citation.note).trim(),
        number: citations.length + 1,
        source: cleanString(citation.source).trim(),
        targetId: citationReferenceId(citation._key),
        url: cleanString(citation.url).trim()
      };

      citations.push(reference);
      citationMap[citation._key] = reference;
    });
  });

  return { citationMap, citations };
}
