import type { StructureResolver } from "sanity/structure";

const singletonTypes = ["homePage"];

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
        (listItem) => !singletonTypes.includes(listItem.getId() || "")
      )
    ]);
