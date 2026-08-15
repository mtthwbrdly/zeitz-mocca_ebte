import { getCliClient } from "sanity/cli";

const WRITE = process.argv.includes("--write");
const client = getCliClient({ apiVersion: "2026-07-09" });

const articleQuery = `*[_type == "article" && !(_id in path("versions.**"))]{
  _id,
  title,
  contentSections[]{
    _key,
    _type,
    caption,
    formattedCaption
  }
}`;

const hasFormattedText = (value) =>
  Array.isArray(value) &&
  value.some((block) =>
    block?.children?.some((child) => typeof child?.text === "string" && child.text.trim())
  );

const articles = await client.fetch(articleQuery);
const report = {
  mode: WRITE ? "write" : "dry-run",
  articlesChecked: articles.length,
  articlesWithPlainCaptions: 0,
  plainCaptionsFound: 0,
  plainCaptionsUnset: 0,
  skippedWithoutFormattedCaption: 0,
  patches: []
};

for (const article of articles) {
  const unsetPaths = [];
  let plainCaptionsFound = 0;
  let skippedWithoutFormattedCaption = 0;

  for (const section of article.contentSections || []) {
    if (section?._type !== "imageSection" || !section._key || !section.caption) continue;

    plainCaptionsFound += 1;

    if (!hasFormattedText(section.formattedCaption)) {
      skippedWithoutFormattedCaption += 1;
      continue;
    }

    unsetPaths.push(`contentSections[_key=="${section._key}"].caption`);
  }

  report.plainCaptionsFound += plainCaptionsFound;
  report.plainCaptionsUnset += unsetPaths.length;
  report.skippedWithoutFormattedCaption += skippedWithoutFormattedCaption;

  if (plainCaptionsFound > 0) {
    report.articlesWithPlainCaptions += 1;
    report.patches.push({
      _id: article._id,
      title: article.title,
      plainCaptionsFound,
      plainCaptionsUnset: unsetPaths.length,
      skippedWithoutFormattedCaption
    });
  }

  if (WRITE && unsetPaths.length > 0) {
    await client.patch(article._id).unset(unsetPaths).commit();
  }
}

console.log(JSON.stringify(report, null, 2));
