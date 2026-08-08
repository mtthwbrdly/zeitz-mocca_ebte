import { defineField, defineType } from "sanity";

export const commentsSection = defineType({
  name: "commentsSection",
  title: "Comments Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Comments"
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description:
        "Optional text shown above the comments widget."
    }),
    defineField({
      name: "slugOverride",
      title: "Comment thread slug override",
      type: "string",
      description:
        "Optional custom thread key. Leave empty to use the article URL path automatically."
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slugOverride"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Comments Section",
        subtitle: subtitle || "Uses article slug automatically"
      };
    }
  }
});
