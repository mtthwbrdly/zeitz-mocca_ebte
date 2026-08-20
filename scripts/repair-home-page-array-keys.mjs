import { getCliClient } from "sanity/cli";

const isWrite = process.argv.includes("--write");
const client = getCliClient({ apiVersion: "2026-07-09" });

const homePages = await client.fetch(`*[_id in ["homePage", "drafts.homePage"]]{
  _id,
  title,
  sections[]{
    ...,
    cards[]{...}
  }
}`);

if (!homePages.length) {
  console.log("No Home Page documents found.");
  process.exit(0);
}

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uniqueKey = (base, usedKeys) => {
  const fallback = slugify(base) || "item";
  let key = fallback;
  let suffix = 2;

  while (usedKeys.has(key)) {
    key = `${fallback}-${suffix}`;
    suffix += 1;
  }

  usedKeys.add(key);
  return key;
};

const repairedDocuments = homePages.map((homePage) => {
  const usedSectionKeys = new Set();
  const changes = [];

  const sections = (homePage.sections || []).map((section, sectionIndex) => {
    const nextSection = { ...section };

    if (nextSection._key && !usedSectionKeys.has(nextSection._key)) {
      usedSectionKeys.add(nextSection._key);
    } else {
      nextSection._key = uniqueKey(
        `${nextSection._type || "section"}-${sectionIndex + 1}`,
        usedSectionKeys
      );
      changes.push(`sections[${sectionIndex}] -> ${nextSection._key}`);
    }

    if (Array.isArray(nextSection.cards)) {
      const usedCardKeys = new Set();

      nextSection.cards = nextSection.cards.map((card, cardIndex) => {
        const nextCard = { ...card };

        if (nextCard._key && !usedCardKeys.has(nextCard._key)) {
          usedCardKeys.add(nextCard._key);
          return nextCard;
        }

        const cardKeyBase =
          nextCard.category ||
          nextCard.title ||
          `${nextSection._key}-card-${cardIndex + 1}`;
        const cardKey = uniqueKey(cardKeyBase, usedCardKeys);

        nextCard._key = cardKey;
        changes.push(`sections[${sectionIndex}].cards[${cardIndex}] -> ${nextCard._key}`);
        return nextCard;
      });
    }

    return nextSection;
  });

  return {
    _id: homePage._id,
    sections,
    changes
  };
});

const documentsWithChanges = repairedDocuments.filter((document) => document.changes.length);

if (!documentsWithChanges.length) {
  console.log("No missing Home Page array keys found.");
  process.exit(0);
}

console.log(
  JSON.stringify(
    {
      mode: isWrite ? "write" : "dry-run",
      documents: documentsWithChanges.map(({ _id, changes }) => ({ _id, changes }))
    },
    null,
    2
  )
);

if (isWrite) {
  for (const document of documentsWithChanges) {
    await client.patch(document._id).set({ sections: document.sections }).commit({
      autoGenerateArrayKeys: false
    });
  }

  console.log("Updated Home Page array keys.");
} else {
  console.log("Dry run only. Re-run with --write to update.");
}
