import { defineField, defineType } from "sanity";

export const homeQuoteSection = defineType({
  name: "homeQuoteSection",
  title: "Home Quote Section",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "linkedArticle",
      title: "Linked article",
      type: "reference",
      to: [{ type: "article" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "linkText",
      title: "Link text",
      type: "string",
      initialValue: "Read more"
    })
  ],
  preview: {
    select: {
      title: "linkedArticle.title",
      subtitle: "quote"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Home Quote Section",
        subtitle
      };
    }
  }
});
