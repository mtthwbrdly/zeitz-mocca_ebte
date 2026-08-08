import { defineField, defineType } from "sanity";

export const imageSection = defineType({
  name: "imageSection",
  title: "Image Section",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string"
    }),
    defineField({
      name: "altText",
      title: "Alt text",
      type: "string"
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: "inline",
      options: {
        list: [
          { title: "Inline", value: "inline" },
          { title: "Wide", value: "wide" },
          { title: "Full", value: "full" }
        ],
        layout: "radio"
      }
    })
  ],
  preview: {
    select: {
      media: "image",
      title: "caption",
      subtitle: "layout"
    }
  }
});
