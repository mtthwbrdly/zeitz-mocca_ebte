import { defineField, defineType } from "sanity";

export const featureCardSection = defineType({
  name: "featureCardSection",
  title: "Feature Card Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow / Label",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "linkedArticle",
      title: "Linked article",
      type: "reference",
      to: [{ type: "article" }]
    }),
    defineField({
      name: "linkText",
      title: "Link text",
      type: "string"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow"
    }
  }
});
