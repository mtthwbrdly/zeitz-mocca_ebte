import { defineField, defineType } from "sanity";

export const pullQuoteSection = defineType({
  name: "pullQuoteSection",
  title: "Pull Quote Section",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote text",
      type: "text",
      rows: 4,
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
      return {
        title: "Pull Quote Section",
        subtitle: title
      };
    }
  }
});
