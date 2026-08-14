import { defineArrayMember, defineField, defineType } from "sanity";
import {
  CitationAnnotation,
  CitationIcon
} from "./components/CitationAnnotation";

export const pullQuoteSection = defineType({
  name: "pullQuoteSection",
  title: "Pull Quote Section",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote text",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italics", value: "em" }
            ],
            annotations: [
              {
                name: "citation",
                title: "Citation",
                type: "object",
                icon: CitationIcon,
                components: {
                  annotation: CitationAnnotation
                },
                options: {
                  modal: {
                    type: "popover"
                  }
                },
                fields: [
                  defineField({
                    name: "source",
                    title: "Citation",
                    type: "text",
                    rows: 3,
                    validation: (rule) => rule.required()
                  }),
                  defineField({
                    name: "url",
                    title: "URL",
                    type: "url"
                  }),
                  defineField({
                    name: "note",
                    title: "Note",
                    type: "text",
                    rows: 2
                  })
                ]
              }
            ]
          }
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string"
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      initialValue: "normal",
      options: {
        list: [
          { title: "Normal", value: "normal" },
          { title: "Large", value: "large" }
        ],
        layout: "radio"
      }
    })
  ],
  preview: {
    select: {
      title: "quote"
    },
    prepare({ title }) {
      const subtitle = Array.isArray(title)
        ? title
            .map((block) =>
              Array.isArray(block?.children)
                ? block.children.map((child) => child?.text || "").join("")
                : ""
            )
            .filter(Boolean)
            .join(" ")
        : title;

      return {
        title: "Pull Quote Section",
        subtitle
      };
    }
  }
});
