import { defineField, defineType } from "sanity";

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text Section",
  type: "object",
  fields: [
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "width",
      title: "Alignment / Width",
      type: "string",
      initialValue: "standard",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Wide", value: "wide" },
          { title: "Narrow", value: "narrow" }
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "pullQuotePlacement",
      title: "Derived Pull Quote Placement",
      type: "string",
      initialValue: "top",
      description:
        "Choose whether pull quotes derived from quoted text appear above or below this rich text section.",
      options: {
        list: [
          { title: "Top", value: "top" },
          { title: "Bottom", value: "bottom" }
        ],
        layout: "radio"
      }
    })
  ],
  preview: {
    select: {
      body: "body"
    },
    prepare({ body }) {
      const firstBlock = body?.find?.((item: { _type?: string }) => item._type === "block");
      const excerpt = firstBlock?.children?.map?.((child: { text?: string }) => child.text).join("") ?? "Rich text";
      return {
        title: "Rich Text Section",
        subtitle: excerpt.slice(0, 80)
      };
    }
  }
});
