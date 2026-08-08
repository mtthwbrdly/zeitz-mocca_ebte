import { defineField, defineType } from "sanity";

export const shareClippingSection = defineType({
  name: "shareClippingSection",
  title: "Share Clipping Section",
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
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "(+) Share Clipping"
    })
  ],
  preview: {
    select: {
      title: "quote",
      subtitle: "label"
    },
    prepare({ title, subtitle }) {
      return {
        title: subtitle || "Share Clipping Section",
        subtitle: title
      };
    }
  }
});
