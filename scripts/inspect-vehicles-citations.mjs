import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-07-09" });

const article = await client.fetch(`*[_type == "article" && title == "Vehicles of the Highest Mischief"][0]{
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
}`);

const renderPlain = (blocks = []) =>
  blocks
    .map((block) => block.children?.map((child) => child.text || "").join("") || "")
    .join(" ");

let number = 1;

for (const section of article?.contentSections || []) {
  const fieldName = section._type === "pullQuoteSection" ? "quote" : "body";
  for (const block of section[fieldName] || []) {
    const usedMarks = new Set(block.children?.flatMap((child) => child.marks || []));
    for (const markDef of block.markDefs || []) {
      if (markDef._type !== "citation" || !usedMarks.has(markDef._key)) continue;

      console.log(JSON.stringify({
        number,
        sectionKey: section._key,
        fieldName,
        blockKey: block._key,
        citationKey: markDef._key,
        text: renderPlain(markDef.formattedSource),
        formattedSource: markDef.formattedSource
      }, null, 2));
      number += 1;
    }
  }
}
