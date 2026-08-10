import { defineArrayMember, defineField, defineType } from "sanity";

export const defaultCategoryCards = [
  {
    _type: "categoryCard",
    category: "process-notes",
    label: "Process Note",
    title: "Process Notes",
    description:
      "Research fragments, working documents, and reflections tracing how the publication takes shape.",
    linkText: "All Process Notes"
  },
  {
    _type: "categoryCard",
    category: "footnotes",
    label: "Footnote",
    title: "Footnotes",
    description:
      "Behind-the-scenes conversations and interviews exploring the ideas, research, and making of the Publishing Atelier. A space where curators, fellows, and collaborators share the thinking behind the work.",
    linkText: "All Footnotes"
  },
  {
    _type: "categoryCard",
    category: "voice-notes",
    label: "Voice Note",
    title: "Voice Notes",
    description:
      "Audio-led notes, recordings, and spoken reflections from the people thinking around the exhibition.",
    linkText: "All Voice Notes"
  }
];

export const categoryCardsSection = defineType({
  name: "categoryCardsSection",
  title: "Category Cards Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Categories",
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
                  { title: "Process Notes", value: "process-notes" },
                  { title: "Footnotes", value: "footnotes" },
                  { title: "Voice Notes", value: "voice-notes" }
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
      initialValue: defaultCategoryCards,
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
