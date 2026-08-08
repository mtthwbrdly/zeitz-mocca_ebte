import { defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      select: {
        title: "headerTitle"
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Home Page",
            href: "/"
          }
        ]
      })
    }),
    article: defineLocations({
      select: {
        title: "title",
        slug: "slug.current"
      },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc.title || "Untitled article",
                href: `/articles/${doc.slug}`
              },
              {
                title: "Index",
                href: "/"
              }
            ]
          : []
      })
    })
  }
};
