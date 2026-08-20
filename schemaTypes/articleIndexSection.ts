import { defineField, defineType } from "sanity";

export const articleIndexSection = defineType({
  name: "articleIndexSection",
  title: "Article Index Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Latest",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "categoryFilter",
      title: "Category filter",
      type: "string",
      initialValue: "all",
      options: {
        list: [
          { title: "All articles", value: "all" },
          { title: "Process Notes", value: "process-note" },
          { title: "Foot Notes", value: "foot-note" },
          { title: "Voice Notes", value: "voice-note" }
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "maxItems",
      title: "Maximum articles",
      type: "number",
      description: "Leave empty to show all matching articles.",
      validation: (rule) => rule.integer().min(1)
    })
  ],
  preview: {
    select: {
      title: "title",
      categoryFilter: "categoryFilter",
      maxItems: "maxItems"
    },
    prepare({ title, categoryFilter, maxItems }) {
      const filterLabel = categoryFilter && categoryFilter !== "all"
        ? categoryFilter
        : "all articles";

      return {
        title: title || "Article Index Section",
        subtitle: `${filterLabel}${maxItems ? ` / ${maxItems} max` : ""}`
      };
    }
  }
});
