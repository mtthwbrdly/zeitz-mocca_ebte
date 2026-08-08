import { defineField, defineType } from "sanity";

export const relatedReadingSection = defineType({
  name: "relatedReadingSection",
  title: "Further Reading Section",
  type: "object",
  fields: [
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }]
        }
      ],
      validation: (rule) => rule.required().min(1).max(1),
 
    })
  ],
  preview: {
    select: {
      articles: "articles"
    },
    prepare({ articles }) {
      const count = Array.isArray(articles) ? articles.length : 0;
      return {
        title: "Further Reading Section",
        subtitle:
          count > 0
            ? `${count} linked article`
            : "Select one article"
      };
    }
  }
});
