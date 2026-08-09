import { defineArrayMember, defineField, defineType } from "sanity";
import { icons } from "@sanity/icons";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: icons.home,
  groups: [
    {
      name: "header",
      title: "Header",
      default: true
    },
    {
      name: "content",
      title: "Sections"
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "header",
      initialValue: "Home Page",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      group: "header",
      rows: 3
    }),
    defineField({
      name: "headerTitle",
      title: "Header title",
      type: "string",
      group: "header",
      initialValue: "Everything but the Exhibition",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "headerText",
      title: "Header text",
      type: "text",
      group: "header",
      rows: 3
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "categoryCardsSection"
        }),
        defineArrayMember({
          type: "homeQuoteSection"
        }),
        defineArrayMember({
          type: "articleIndexSection"
        })
      ],
      validation: (rule) => rule.required().min(1)
    })
  ],
  initialValue: {
    title: "Home Page",
    headerTitle: "Everything but the Exhibition",
    sections: [
      {
        _type: "categoryCardsSection",
        title: "Categories"
      },
      {
        _type: "articleIndexSection",
        title: "Latest",
        categoryFilter: "all"
      }
    ]
  },
  preview: {
    select: {
      title: "headerTitle"
    },
    prepare({ title }) {
      return {
        title: title || "Home Page"
      };
    }
  }
});
