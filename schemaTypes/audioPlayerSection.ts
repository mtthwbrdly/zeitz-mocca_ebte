import { defineField, defineType } from "sanity";

export const audioPlayerSection = defineType({
  name: "audioPlayerSection",
  title: "Audio Player Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title shown above the player."
    }),
    defineField({
      name: "audioFile",
      title: "MP3 audio file",
      type: "file",
      options: {
        accept: ".mp3,audio/mpeg"
      },
      validation: (rule) => rule.required()
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
      filename: "audioFile.asset.originalFilename"
    },
    prepare({ title, filename }) {
      return {
        title: title || "Audio player",
        subtitle: filename || "MP3 audio file"
      };
    }
  }
});
