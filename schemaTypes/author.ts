import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Authors",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "longBio",
      title: "Long bio",
      type: "text",
      rows: 8
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string"
    })
  ]
});
