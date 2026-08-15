import { getCliClient } from "sanity/cli";

const isWrite = process.argv.includes("--write");
const client = getCliClient({ apiVersion: "2026-07-09" });

const layoutMap = {
  inline: "caption-left",
  wide: "landscape",
  full: "landscape"
};

const query = `*[_type == "article" && count(contentSections[_type == "imageSection" && layout in ["inline", "wide", "full"]]) > 0]{
  _id,
  title,
  "images": contentSections[_type == "imageSection" && layout in ["inline", "wide", "full"]]{
    _key,
    layout
  }
}`;

const articles = await client.fetch(query);

if (!articles.length) {
  console.log("No legacy image layout values found.");
  process.exit(0);
}

for (const article of articles) {
  console.log(`${article.title || article._id}`);

  for (const image of article.images || []) {
    const nextLayout = layoutMap[image.layout];

    if (!nextLayout) {
      continue;
    }

    console.log(`  ${image._key}: ${image.layout} -> ${nextLayout}`);

    if (isWrite) {
      await client
        .patch(article._id)
        .set({ [`contentSections[_key=="${image._key}"].layout`]: nextLayout })
        .commit();
    }
  }
}

console.log(isWrite ? "Updated legacy image layout values." : "Dry run only. Re-run with --write to update.");
