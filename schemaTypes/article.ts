import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Articles",
  type: "document",
  groups: [
    {
      name: "meta",
      title: "Article meta",
      default: true
    },
    {
      name: "content",
      title: "Content sections"
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "meta",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Deck",
      type: "text",
      group: "meta",
      rows: 3
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta"
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })]
    }),
    defineField({
      name: "format",
      title: "Format / Category",
      type: "string",
      group: "meta"
    }),
    defineField({
      name: "series",
      title: "Series / Project",
      type: "string",
      group: "meta"
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "meta",
      rows: 4
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "meta",
      description: "Used for Further Reading cards and article previews.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "downloadablePdf",
      title: "Downloadable PDF",
      type: "file",
      group: "meta",
      options: {
        accept: ".pdf"
      }
    }),
    defineField({
      name: "contentSections",
      title: "Content sections",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "pullQuoteSection" }),
        defineArrayMember({ type: "shareClippingSection" }),
        defineArrayMember({ type: "featureCardSection" }),
        defineArrayMember({ type: "imageSection" }),
        defineArrayMember({ type: "audioPlayerSection" }),
        defineArrayMember({ type: "videoSection" }),
        defineArrayMember({ type: "commentsSection" }),
        defineArrayMember({ type: "dividerSection" })
      ],
      validation: (rule) => rule.min(1)
    }),
    defineField({
      name: "furtherReading",
      title: "Further Reading",
      type: "relatedReadingSection",
      group: "content",
      description:
        "Select one related article."
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "format",
      media: "thumbnail"
    }
  }
});
