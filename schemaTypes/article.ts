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
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      description: "Please click generate to generate a slug for the article.",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "author",
      title: "Legacy author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      description: "Deprecated fallback for older articles. Use Authors instead.",
      hidden: true
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      group: "meta",
      description: "Select one or more Authors, or create a new one",
      of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })],
      validation: (rule) =>
        rule
          .unique()
          .custom((value, context) => {
            if ((value || []).length > 0 || context.document?.author) {
              return true;
            }

            return "Select at least one author.";
          })
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
      description: "Enter the date of article publication (this will affect sorting).",
      validation: (rule) => rule.required()
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
      group: "meta",
      description: "Select a Category.",
      options: {
        list: [
          { title: "Foot Note", value: "foot-note" },
          { title: "Process Note", value: "process-note" },
          { title: "Voice Note", value: "voice-note" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "meta",
      description: "Please enter a short description or summary of the article.",
      rows: 4
    }),
    defineField({
      name: "thumbnail",
      title: "Cover image",
      type: "image",
      group: "meta",
      description: "Used as the article cover image across the site.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string"
        })
      ]
    }),
    defineField({
      name: "contentSections",
      title: "Content sections",
      type: "array",
      group: "content",
      description:
        "Build the article from top to bottom. Use Rich Text for body copy, Pull Quote for highlighted excerpts, Image for visuals and captions, Audio Player for MP3s, Video for uploads or YouTube embeds, Comments to add a discussion area, and Divider / Spacer to create a visual break.",
      of: [
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "pullQuoteSection" }),
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
        "(Optional) Select an article to feature at the bottom of this page. If left blank, the next most recent article will be featured automatically."
    })
  ],
preview: {
  select: {
    title: "title",
    firstAuthorName: "authors.0.name",
    secondAuthorName: "authors.1.name",
    thirdAuthorName: "authors.2.name",
    legacyAuthorName: "author.name",
    format: "format",
    media: "thumbnail"
  },
  prepare({ title, firstAuthorName, secondAuthorName, thirdAuthorName, legacyAuthorName, format, media }) {
    const formatTitles: Record<string, string> = {
      "foot-note": "Foot Note",
      "process-note": "Process Note",
      "voice-note": "Voice Note"
    };

    const formatLabel = format ? formatTitles[format] || format : undefined;
    const authorNames = [firstAuthorName, secondAuthorName, thirdAuthorName].filter(Boolean);
    const authorLabel = authorNames.length
      ? `${authorNames.join(", ")}${authorNames.length === 3 ? "+" : ""}`
      : legacyAuthorName;
    const subtitleParts: string[] = [];
    if (formatLabel) subtitleParts.push(formatLabel);
    if (authorLabel) subtitleParts.push(`by ${authorLabel}`);

    return {
      title,
      subtitle: subtitleParts.length ? subtitleParts.join(" ") : undefined,
      media
    };
  }
}
});
