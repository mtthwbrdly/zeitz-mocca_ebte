import { defineArrayMember, defineField, defineType } from "sanity";

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
      name: "formattedCaption",
      title: "Formatted caption",
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
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url"
                  })
                ]
              }
            ]
          }
        })
      ]
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
      initialValue: "portrait",
      options: {
        list: [
          { title: "Portrait", value: "portrait" },
          { title: "Portrait (Caption Left)", value: "caption-left" },
          { title: "Landscape", value: "landscape" }
        ],
        layout: "radio"
      }
    })
  ],
  preview: {
    select: {
      media: "image",
      title: "formattedCaption",
      subtitle: "layout"
    },
    prepare({ media, title, subtitle }) {
      const layoutLabels: Record<string, string> = {
        portrait: "Portrait",
        "caption-left": "Portrait (Caption Left)",
        landscape: "Landscape",
        inline: "Portrait (Caption Left)",
        wide: "Landscape",
        full: "Landscape"
      };
      const caption = Array.isArray(title)
        ? title
            .map((block) =>
              Array.isArray(block?.children)
                ? block.children.map((child) => child?.text || "").join("")
                : ""
            )
            .filter(Boolean)
            .join(" ")
        : "";

      return {
        media,
        title: caption || "Image Section",
        subtitle: subtitle ? layoutLabels[subtitle] || subtitle : undefined
      };
    }
  }
});
