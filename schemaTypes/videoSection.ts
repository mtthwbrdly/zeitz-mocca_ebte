import { icons } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const videoSection = defineType({
  name: "videoSection",
  title: "Video Section",
  type: "object",
  icon: icons.video,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title shown above the video."
    }),
    defineField({
      name: "sourceType",
      title: "Video source",
      type: "string",
      initialValue: "upload",
      options: {
        list: [
          { title: "Upload video", value: "upload" },
          { title: "YouTube URL", value: "youtube" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      hidden: ({ parent }) => parent?.sourceType === "youtube",
      options: {
        accept: "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const sourceType = (context.parent as { sourceType?: string })?.sourceType;
          return sourceType === "youtube" || value ? true : "Upload a video file.";
        })
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      hidden: ({ parent }) => parent?.sourceType !== "youtube",
      validation: (rule) =>
        rule.custom((value, context) => {
          const sourceType = (context.parent as { sourceType?: string })?.sourceType;

          if (sourceType !== "youtube") {
            return true;
          }

          if (!value) {
            return "Paste a YouTube URL.";
          }

          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(value)
            ? true
            : "Use a valid YouTube URL.";
        })
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string"
    }),
    defineField({
      name: "transcription",
      title: "Transcription",
      type: "text",
      rows: 10,
      description: "Optional. Leave empty to hide the transcription on the article page."
    })
  ],
  preview: {
    select: {
      title: "title",
      sourceType: "sourceType",
      filename: "videoFile.asset.originalFilename",
      youtubeUrl: "youtubeUrl"
    },
    prepare({ title, sourceType, filename, youtubeUrl }) {
      const sourceLabel = sourceType === "youtube" ? youtubeUrl : filename;

      return {
        title: title || "Video",
        subtitle: sourceLabel || "Video section"
      };
    }
  }
});
