import { getCliClient } from "sanity/cli";

const WRITE = process.argv.includes("--write");
const client = getCliClient({ apiVersion: "2026-07-09" });
const ARTICLE_TITLE = "Vehicles of the Highest Mischief";

const italicRangesByNumber = {
  1: ["Making Space: The Counter publics of Post-Apartheid Independent Literary Publishing Activities (1994–2004)"],
  2: ["Imagined Communities: Reflections on the Origin and Spread of Nationalism"],
  3: ["The Archaeology of Knowledge and the Discourse on Language"],
  4: ["The Politics of Publishing in South Africa"],
  5: ["The Politics of Publishing in South Africa"],
  6: ["Scholarly Publishing in South Africa"],
  7: ["Mémoires du livre / Studies in Book Culture"],
  8: ["Making Space: The Counter publics of Post-Apartheid Independent Literary Publishing Activities (1994–2004)"],
  11: ["Mémoires du livre / Studies in Book Culture"],
  12: ["Making Space"],
  14: ["Christian Science Monitor"],
  16: ["Making Space"],
  19: ["Art Monthly"],
  20: ["Publics and Counterpublics"],
  21: ["Publishing Manifestos: An International Anthology from Artists and Writers"]
};

const articleQuery = `*[_type == "article" && title == $title][0]{
  _id,
  title,
  contentSections[]{
    _key,
    _type,
    body[]{
      _key,
      markDefs[]{...},
      children[]{text, marks}
    },
    quote[]{
      _key,
      markDefs[]{...},
      children[]{text, marks}
    }
  }
}`;

function plainText(blocks = []) {
  return blocks
    .map((block) => block.children?.map((child) => child.text || "").join("") || "")
    .join(" ");
}

function keyPart(value) {
  return String(value || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 96);
}

function createFormattedSource(markDef, citationNumber, italicRanges) {
  const text = plainText(markDef.formattedSource);
  const ranges = [];

  for (const rangeText of italicRanges) {
    const start = text.indexOf(rangeText);
    if (start === -1) {
      throw new Error(`Citation ${citationNumber}: could not find italic text: ${rangeText}`);
    }
    ranges.push({ start, end: start + rangeText.length });
  }

  ranges.sort((a, b) => a.start - b.start);

  const children = [];
  let cursor = 0;
  let spanIndex = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      children.push({
        _key: keyPart(`${markDef._key}-roman-${spanIndex}`),
        _type: "span",
        text: text.slice(cursor, range.start),
        marks: []
      });
      spanIndex += 1;
    }

    children.push({
      _key: keyPart(`${markDef._key}-em-${spanIndex}`),
      _type: "span",
      text: text.slice(range.start, range.end),
      marks: ["em"]
    });
    spanIndex += 1;
    cursor = range.end;
  }

  if (cursor < text.length) {
    children.push({
      _key: keyPart(`${markDef._key}-roman-${spanIndex}`),
      _type: "span",
      text: text.slice(cursor),
      marks: []
    });
  }

  const currentBlock = markDef.formattedSource?.[0];

  return [
    {
      _key: currentBlock?._key || keyPart(`${markDef._key}-formatted-source-block`),
      _type: "block",
      style: "normal",
      markDefs: [],
      children
    }
  ];
}

const article = await client.fetch(articleQuery, { title: ARTICLE_TITLE });

if (!article?._id) {
  throw new Error(`Article not found: ${ARTICLE_TITLE}`);
}

const sets = {};
const report = [];
let citationNumber = 1;

for (const section of article.contentSections || []) {
  const fieldName = section._type === "pullQuoteSection" ? "quote" : "body";
  for (const block of section[fieldName] || []) {
    const usedMarks = new Set(block.children?.flatMap((child) => child.marks || []));
    for (const markDef of block.markDefs || []) {
      if (markDef._type !== "citation" || !usedMarks.has(markDef._key)) continue;

      const italicRanges = italicRangesByNumber[citationNumber] || [];
      if (italicRanges.length > 0) {
        const path = `contentSections[_key=="${section._key}"].${fieldName}[_key=="${block._key}"].markDefs[_key=="${markDef._key}"].formattedSource`;
        const formattedSource = createFormattedSource(markDef, citationNumber, italicRanges);
        sets[path] = formattedSource;
        report.push({
          citationNumber,
          citationKey: markDef._key,
          italicRanges,
          text: plainText(markDef.formattedSource)
        });
      }

      citationNumber += 1;
    }
  }
}

if (WRITE && Object.keys(sets).length > 0) {
  await client.patch(article._id).set(sets).commit({ autoGenerateArrayKeys: false });
}

console.log(JSON.stringify({
  mode: WRITE ? "write" : "dry-run",
  articleId: article._id,
  articleTitle: article.title,
  citationsSeen: citationNumber - 1,
  citationsPatched: Object.keys(sets).length,
  patches: report
}, null, 2));
