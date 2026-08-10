import { defineField, defineType } from "sanity";

export const homeFeaturedArticleSection = defineType({
  name: "homeFeaturedArticleSection",
  title: "Featured Article Section",
  type: "object",
  fields: [
    defineField({
      name: "article",
      title: "Article",
      type: "reference",
      to: [{ type: "article" }],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: "article.title",
      subtitle: "article.format"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Featured Article Section",
        subtitle: subtitle || "One full-page article feature"
      };
    }
  }
});
