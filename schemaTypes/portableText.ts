import { defineArrayMember, defineField, defineType } from "sanity";
import {
  CitationAnnotation,
  CitationToolbarLabel
} from "./components/CitationAnnotation";
import { CompactPortableTextInput } from "./components/CompactPortableTextInput";
import {
  PullQuoteDecorator,
  PullQuoteToolbarLabel
} from "./components/PullQuoteDecorator";

export const portableText = defineType({
  name: "portableText",
  title: "Portable Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Blockquote", value: "blockquote" }
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" }
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          {
            title: "Quote",
            value: "pullQuote",
            icon: PullQuoteToolbarLabel,
            component: PullQuoteDecorator
          }
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url"
              }
            ]
          },
          {
            name: "citation",
            title: "Cite",
            type: "object",
            icon: CitationToolbarLabel,
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
                name: "formattedSource",
                title: "Citation",
                type: "array",
                components: {
                  input: CompactPortableTextInput
                },
                of: [
                  defineArrayMember({
                    type: "block",
                    styles: [{ title: "Paragraph", value: "normal" }],
                    lists: [],
                    marks: {
                      decorators: [
                        { title: "Strong", value: "strong" },
                        { title: "Emphasis", value: "em" }
                      ],
                      annotations: []
                    }
                  })
                ],
                validation: (rule) => rule.required()
              }),
              defineField({
                name: "url",
                title: "URL",
                type: "url"
              })
            ]
          }
        ]
      }
    })
  ]
});
