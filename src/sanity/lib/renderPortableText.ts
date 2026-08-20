import { cleanString } from "./clean";
import type { CitationReferenceMap } from "./citations";
import type {
  PortableTextBlock,
  PortableTextMarkDef,
  PortableTextSpan
} from "./types";
import {
  extractPullQuoteRuns,
  PULL_QUOTE_MARK,
  type PullQuoteRun
} from "./pullQuotes";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

function wrapMarks(
  text: string,
  marks: string[] = [],
  markDefs: PortableTextMarkDef[] = [],
  citationMap: CitationReferenceMap = {}
) {
  return marks.reduce((output, mark) => {
    if (mark === "strong") {
      return `<strong>${output}</strong>`;
    }
    if (mark === "em") {
      return `<em>${output}</em>`;
    }
    if (mark === "code") {
      return `<code>${output}</code>`;
    }
    if (mark === "underline") {
      return `<span class="u-underline">${output}</span>`;
    }
    if (mark === PULL_QUOTE_MARK) {
      return output;
    }

    const definition = markDefs.find((item) => item._key === mark);
    if (definition?._type === "link") {
      return `<a href="${escapeHtml(cleanString(definition.href))}" target="_blank" rel="noreferrer">${output}</a>`;
    }
    if (definition?._type === "citation") {
      return output;
    }

    return output;
  }, text);
}

function getCitationMark(
  child: PortableTextSpan,
  markDefs: PortableTextMarkDef[] = [],
  citationMap: CitationReferenceMap = {}
) {
  return child.marks?.find((mark) => {
    const definition = markDefs.find((item) => item._key === mark);
    return definition?._type === "citation" && Boolean(citationMap[definition._key]);
  });
}

function renderCitationReference(citationMap: CitationReferenceMap, citationKey: string) {
  const citation = citationMap[citationKey];

  if (!citation) {
    return "";
  }

  return `<sup class="u-citation-ref"><button id="${escapeHtml(citation.targetId)}" type="button" aria-label="Show citation ${citation.number}" data-citation-number="${citation.number}" data-citation-inline data-citation-panel-link>[${citation.number}]</button></sup>`;
}

function renderChildRange(
  children: PortableTextSpan[] = [],
  markDefs: PortableTextMarkDef[] = [],
  citationMap: CitationReferenceMap = {}
) {
  const output: string[] = [];
  let childIndex = 0;

  while (childIndex < children.length) {
    const child = children[childIndex];
    const citationMark = getCitationMark(child, markDefs, citationMap);

    if (citationMark) {
      const citedChildren: PortableTextSpan[] = [];

      while (
        childIndex < children.length &&
        getCitationMark(children[childIndex], markDefs, citationMap) === citationMark
      ) {
        citedChildren.push(children[childIndex]);
        childIndex += 1;
      }

      const citedHtml = citedChildren
        .map((citedChild) =>
          wrapMarks(
            escapeHtml(citedChild.text),
            (citedChild.marks || []).filter(
              (mark) => mark !== PULL_QUOTE_MARK && mark !== citationMark
            ),
            markDefs,
            citationMap
          )
        )
        .join("");

      output.push(
        `<span class="u-citation-target">${citedHtml}${renderCitationReference(citationMap, citationMark)}</span>`
      );
      continue;
    }

    output.push(
      wrapMarks(
        escapeHtml(child.text),
        (child.marks || []).filter((mark) => mark !== PULL_QUOTE_MARK),
        markDefs,
        citationMap
      )
    );
    childIndex += 1;
  }

  return output.join("");
}

function renderChildren(
  children: PortableTextSpan[],
  markDefs: PortableTextMarkDef[] = [],
  pullQuoteRuns: PullQuoteRun[] = [],
  citationMap: CitationReferenceMap = {}
) {
  const output: string[] = [];
  let childIndex = 0;

  while (childIndex < children.length) {
    const pullQuoteRun = pullQuoteRuns.find((item) => item.startChildIndex === childIndex);

    if (pullQuoteRun) {
      const quotedChildren = children.slice(
        pullQuoteRun.startChildIndex,
        pullQuoteRun.endChildIndex
      );

      const quotedHtml = renderChildRange(quotedChildren, markDefs, citationMap);

      output.push(
        `<span class="u-pull-quote-target" id="${escapeHtml(pullQuoteRun.targetId)}" tabindex="-1">${quotedHtml}</span>`
      );
      childIndex = pullQuoteRun.endChildIndex;
      continue;
    }

    const child = children[childIndex];
    const citationMark = getCitationMark(child, markDefs, citationMap);

    if (citationMark) {
      const citedChildren: PortableTextSpan[] = [];

      while (
        childIndex < children.length &&
        getCitationMark(children[childIndex], markDefs, citationMap) === citationMark
      ) {
        citedChildren.push(children[childIndex]);
        childIndex += 1;
      }

      output.push(renderChildRange(citedChildren, markDefs, citationMap));
      continue;
    }

    output.push(renderChildRange([child], markDefs, citationMap));
    childIndex += 1;
  }

  return output.join("");
}

function blockTag(style = "normal") {
  const cleanStyle = cleanString(style);

  if (cleanStyle === "h2") {
    return "h2";
  }
  if (cleanStyle === "h3") {
    return "h3";
  }
  if (cleanStyle === "blockquote") {
    return "blockquote";
  }

  return "p";
}

function renderList(
  blocks: Array<{ block: PortableTextBlock; pullQuoteRuns: PullQuoteRun[] }>,
  type: "bullet" | "number",
  citationMap: CitationReferenceMap = {}
) {
  const tag = type === "number" ? "ol" : "ul";
  const items = blocks
    .map(
      ({ block, pullQuoteRuns }) =>
        `<li>${renderChildren(block.children, block.markDefs, pullQuoteRuns, citationMap)}</li>`
    )
    .join("");

  return `<${tag}>${items}</${tag}>`;
}

export function renderPortableText(
  blocks: PortableTextBlock[] = [],
  citationMap: CitationReferenceMap = {}
) {
  const pullQuoteRuns = extractPullQuoteRuns(blocks);
  const output: string[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    const blockRuns = pullQuoteRuns.filter((item) => item.blockIndex === index);

    const listItem = cleanString(block.listItem);

    if (listItem === "bullet" || listItem === "number") {
      const listGroup = [{ block, pullQuoteRuns: blockRuns }];
      while (
        index + 1 < blocks.length &&
        cleanString(blocks[index + 1].listItem) === listItem
      ) {
        index += 1;
        listGroup.push({
          block: blocks[index],
          pullQuoteRuns: pullQuoteRuns.filter((item) => item.blockIndex === index)
        });
      }
      output.push(renderList(listGroup, listItem, citationMap));
      continue;
    }

    const tag = blockTag(block.style);
    output.push(`<${tag}>${renderChildren(block.children, block.markDefs, blockRuns, citationMap)}</${tag}>`);
  }

  return output.join("");
}
