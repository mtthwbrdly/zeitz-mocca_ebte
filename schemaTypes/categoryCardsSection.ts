import { defineArrayMember, defineField, defineType } from "sanity";

export const categoryCardsSection = defineType({
  name: "categoryCardsSection",
  title: "Category Cards Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 5
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "categoryCard",
          title: "Category Card",
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Process Notes", value: "process-note" },
                  { title: "Foot Notes", value: "foot-note" },
                  { title: "Voice Notes", value: "voice-note" }
                ],
                layout: "radio"
              },
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required()
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4
            }),
            defineField({
              name: "linkText",
              title: "Link text",
              type: "string"
            })
          ],
          preview: {
            select: {
              title: "title",
              category: "category"
            },
            prepare({ title, category }) {
              return {
                title: title || "Category Card",
                subtitle: category
              };
            }
          }
        })
      ],
      validation: (rule) => rule.required().min(1).max(3)
    })
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards"
    },
    prepare({ title, cards }) {
      return {
        title: title || "Category Cards Section",
        subtitle: `${cards?.length || 0} cards`
      };
    }
  }
});
