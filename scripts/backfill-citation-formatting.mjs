import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const API_VERSION = "2026-07-09";
const WRITE = process.argv.includes("--write");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const [key, ...rest] = trimmed.split("=");
    if (process.env[key]) continue;

    const rawValue = rest.join("=").trim();
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

loadEnvFile(path.join(ROOT, ".env"));
loadEnvFile(path.join(ROOT, ".env.local"));

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || "p7t0rr17";
const dataset = process.env.PUBLIC_SANITY_DATASET || "production";

async function getClient() {
  try {
    const { getCliClient } = await import("sanity/cli");
    return getCliClient({ apiVersion: API_VERSION });
  } catch {
    return createClient({
      projectId,
      dataset,
      apiVersion: API_VERSION,
      token,
      useCdn: false
    });
  }
}

const articleQuery = `*[_type == "article" && !(_id in path("versions.**"))]{
  _id,
  title,
  contentSections[]{
    _key,
    _type,
    body[]{
      _key,
      _type,
      markDefs[]{...},
      children[]{_key, _type, text, marks}
    },
    quote[]{
      _key,
      _type,
      markDefs[]{...},
      children[]{_key, _type, text, marks}
    }
  }
}`;

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const hasFormattedText = (value) =>
  Array.isArray(value) &&
  value.some((block) =>
    block?.children?.some((child) => isNonEmptyString(child?.text))
  );

function keyPart(value) {
  return String(value || "").replace(/[^a-zA-Z0-9_-]/g, "");
}

function blockFromText(text, fieldName, citationKey) {
  return [
    {
      _key: keyPart(`${citationKey}-${fieldName}-block`).slice(0, 96),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: keyPart(`${citationKey}-${fieldName}-span`).slice(0, 96),
          _type: "span",
          text: text.trim(),
          marks: []
        }
      ]
    }
  ];
}

function inspectBlocks(blocks = [], basePath) {
  const sets = {};
  const stats = {
    citationCount: 0,
    formattedSourceBackfills: 0
  };

  if (!Array.isArray(blocks)) return { sets, stats };

  for (const block of blocks) {
    if (!block?._key || !Array.isArray(block.markDefs)) continue;

    for (const markDef of block.markDefs) {
      if (markDef?._type !== "citation" || !markDef._key) continue;

      const isUsed = block.children?.some((child) => child.marks?.includes(markDef._key));
      if (!isUsed) continue;

      stats.citationCount += 1;
      const markPath = `${basePath}[_key=="${block._key}"].markDefs[_key=="${markDef._key}"]`;

      if (isNonEmptyString(markDef.source) && !hasFormattedText(markDef.formattedSource)) {
        sets[`${markPath}.formattedSource`] = blockFromText(
          markDef.source,
          "formatted-source",
          markDef._key
        );
        stats.formattedSourceBackfills += 1;
      }
    }
  }

  return { sets, stats };
}

function inspectArticle(article) {
  const sets = {};
  const stats = {
    citationCount: 0,
    formattedSourceBackfills: 0
  };

  article.contentSections?.forEach((section) => {
    if (!section?._key) return;

    const sectionPath = `contentSections[_key=="${section._key}"]`;
    const fieldName = section._type === "pullQuoteSection" ? "quote" : "body";
    const blocks = section[fieldName];
    const result = inspectBlocks(blocks, `${sectionPath}.${fieldName}`);

    Object.assign(sets, result.sets);
    stats.citationCount += result.stats.citationCount;
    stats.formattedSourceBackfills += result.stats.formattedSourceBackfills;
  });

  return { sets, stats };
}

async function main() {
  if (WRITE && !token) {
    try {
      await import("sanity/cli");
    } catch {
      throw new Error(
        "Missing SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN. Add a write token to .env.local, or run with `npx sanity exec scripts/backfill-citation-formatting.mjs --with-user-token -- --write`."
      );
    }
  }

  const client = await getClient();
  const articles = await client.fetch(articleQuery);
  const report = {
    articlesChecked: articles.length,
    articlesWithCitationBackfills: 0,
    citationMarksFound: 0,
    formattedSourceBackfills: 0,
    patches: []
  };

  for (const article of articles) {
    const { sets, stats } = inspectArticle(article);
    const setCount = Object.keys(sets).length;

    report.citationMarksFound += stats.citationCount;
    report.formattedSourceBackfills += stats.formattedSourceBackfills;

    if (setCount === 0) continue;

    report.articlesWithCitationBackfills += 1;
    report.patches.push({
      _id: article._id,
      title: article.title,
      setCount,
      formattedSourceBackfills: stats.formattedSourceBackfills
    });

    if (WRITE) {
      await client.patch(article._id).set(sets).commit({ autoGenerateArrayKeys: false });
    }
  }

  console.log(JSON.stringify({ mode: WRITE ? "write" : "dry-run", ...report }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
