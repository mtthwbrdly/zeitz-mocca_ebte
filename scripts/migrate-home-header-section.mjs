import { getCliClient } from "sanity/cli";

const isWrite = process.argv.includes("--write");
const client = getCliClient({ apiVersion: "2026-07-09" });

const homePages = await client.fetch(`*[_id in ["homePage", "drafts.homePage"]]{
  _id,
  title,
  headerText,
  sections[]{...}
}`);

const textToPortableText = (text) => [
  {
    _key: "home-header-text",
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: "home-header-text-content",
        _type: "span",
        marks: [],
        text
      }
    ]
  }
];

const patches = homePages
  .map((document) => {
    const hasHeaderSection = (document.sections || []).some(
      (section) => section?._type === "homeHeaderSection"
    );
    const headerText = typeof document.headerText === "string" ? document.headerText.trim() : "";

    if (hasHeaderSection && !headerText) {
      return null;
    }

    const sets = {};
    const unsets = [];

    if (!hasHeaderSection) {
      sets.sections = [
        {
          _key: "header-text",
          _type: "homeHeaderSection",
          text: headerText ? textToPortableText(headerText) : undefined
        },
        ...(document.sections || [])
      ];
    }

    if (headerText || Object.prototype.hasOwnProperty.call(document, "headerText")) {
      unsets.push("headerText");
    }

    return {
      _id: document._id,
      addsHeaderSection: !hasHeaderSection,
      migratesHeaderText: Boolean(headerText),
      sets,
      unsets
    };
  })
  .filter(Boolean);

if (!patches.length) {
  console.log("No Home Page header migration needed.");
  process.exit(0);
}

console.log(
  JSON.stringify(
    {
      mode: isWrite ? "write" : "dry-run",
      patches: patches.map(({ _id, addsHeaderSection, migratesHeaderText, unsets }) => ({
        _id,
        addsHeaderSection,
        migratesHeaderText,
        unsets
      }))
    },
    null,
    2
  )
);

if (isWrite) {
  for (const patch of patches) {
    let transaction = client.patch(patch._id);

    if (Object.keys(patch.sets).length) {
      transaction = transaction.set(patch.sets);
    }

    if (patch.unsets.length) {
      transaction = transaction.unset(patch.unsets);
    }

    await transaction.commit({ autoGenerateArrayKeys: false });
  }

  console.log("Migrated Home Page header sections.");
} else {
  console.log("Dry run only. Re-run with --write to update.");
}
