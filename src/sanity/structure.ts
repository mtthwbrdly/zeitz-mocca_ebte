import type { StructureResolver } from "sanity/structure";

const hiddenTypes = ["homePage", "media.tag"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenTypes.includes(listItem.getId() || "")
      )
    ]);
