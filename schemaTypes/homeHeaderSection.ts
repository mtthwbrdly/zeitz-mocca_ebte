import { defineArrayMember, defineField, defineType } from "sanity";
import { defaultHomeHeaderText } from "../src/sanity/lib/homeHeaderText";

export const homeHeaderSection = defineType({
  name: "homeHeaderSection",
  title: "Header Section",
  type: "object",
  initialValue: {
    text: defaultHomeHeaderText
  },
  fields: [
    defineField({
      name: "text",
      title: "Header text",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Paragraph", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" }
            ],
            annotations: []
          }
        })
      ],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      text: "text"
    },
    prepare({ text }) {
      const firstBlock = text?.find?.((item: { _type?: string }) => item._type === "block");
      const excerpt =
        firstBlock?.children?.map?.((child: { text?: string }) => child.text).join("") ??
        "Header text";

      return {
        title: "Header Section",
        subtitle: excerpt.slice(0, 80)
      };
    }
  }
});
