import { defineField, defineType } from "sanity";

export const dividerSection = defineType({
  name: "dividerSection",
  title: "Divider / Spacer Section",
  type: "object",
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      initialValue: "line",
      options: {
        list: [
          { title: "Line", value: "line" },
          { title: "Space", value: "space" }
        ],
        layout: "radio"
      }
    })
  ],
  preview: {
    select: {
      subtitle: "style"
    },
    prepare({ subtitle }) {
      return {
        title: "Divider / Spacer Section",
        subtitle
      };
    }
  }
});
