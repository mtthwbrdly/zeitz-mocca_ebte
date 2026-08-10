import { defineArrayMember, defineField, defineType } from "sanity";

export const homeSplitFeatureSection = defineType({
  name: "homeSplitFeatureSection",
  title: "Split Feature Section",
  type: "object",
  fields: [
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }]
        })
      ],
      validation: (rule) => rule.required().min(2).max(2)
    })
  ],
  preview: {
    select: {
      articles: "articles"
    },
    prepare({ articles }) {
      return {
        title: "Split Feature Section",
        subtitle: `${articles?.length || 0} selected article${articles?.length === 1 ? "" : "s"}`
      };
    }
  }
});
