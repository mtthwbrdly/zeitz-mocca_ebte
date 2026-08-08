import { t as sanityClient } from "./_sanity_client_CP4pqz5_.mjs";
import { stegaClean } from "@sanity/client/stega";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import groq from "groq";
//#region src/sanity/lib/clean.ts
function cleanString(value) {
	return typeof value === "string" ? stegaClean(value) : "";
}
//#endregion
//#region src/sanity/lib/draft-mode.ts
function getDraftModeProps(cookies) {
	return { perspectiveCookie: cookies.get(perspectiveCookieName)?.value ?? void 0 };
}
//#endregion
//#region src/sanity/lib/load-query.ts
var token = "sk7YTZiAwjdMBIuQE6sjI3xOnAEuhXHJ3AudQIXDe9eGakmUDzg2eOIrg272jFm7D1gE2cbEMCVhqpo3iApiam5C0LfmyHHO5TrelKPdDH4ZBjuSumiE38IfZ277Fggv0Q2QagzxHwpi9LTvw9a9jCYQD6AAWXFyC9HTZDE7Vq8KEXGYZEVZ";
function parsePerspective(raw) {
	if (!raw) return;
	const decoded = decodeURIComponent(raw);
	if (decoded.startsWith("[")) try {
		return JSON.parse(decoded);
	} catch {
		return;
	}
	return decoded;
}
async function loadQuery({ query, params, perspectiveCookie = void 0 }) {
	const draftMode = Boolean(perspectiveCookie);
	const perspective = draftMode ? parsePerspective(perspectiveCookie) ?? "drafts" : "published";
	const { result, resultSourceMap } = await sanityClient.fetch(query, params ?? {}, {
		filterResponse: false,
		perspective,
		resultSourceMap: draftMode ? "withKeyArraySelector" : false,
		stega: draftMode,
		...draftMode ? { token } : {}
	});
	return {
		data: result,
		perspective,
		sourceMap: resultSourceMap
	};
}
//#endregion
//#region src/sanity/lib/queries.ts
var homePageQuery = groq`
  *[_id == "homePage"][0]{
    _id,
    title,
    seoDescription,
    headerTitle,
    headerText,
    sections[]{
      _key,
      _type,
      ...
    }
  }
`;
var articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    format,
    series,
    publishedAt,
    "thumbnail": {
      "url": thumbnail.asset->url,
      "alt": thumbnail.alt
    },
    "downloadablePdf": {
      "url": downloadablePdf.asset->url,
      "originalFilename": downloadablePdf.asset->originalFilename
    },
    author->{
      _id,
      name,
      slug,
      shortBio,
      longBio,
      role,
      "portrait": {
        "url": portrait.asset->url,
        "alt": portrait.alt
      }
    },
    "tags": tags[]->{
      _id,
      title,
      slug
    },
    "furtherReading": furtherReading{
      ...,
      "articles": articles[]->{
        title,
        format,
        publishedAt,
        "slug": slug.current,
        "tags": tags[]->{
          _id,
          title,
          slug
        },
        author->{
          _id,
          name,
          slug
        },
        "thumbnail": {
          "url": thumbnail.asset->url,
          "alt": thumbnail.alt
        }
      }
    },
    contentSections[]{
      ...,
      _type == "featureCardSection" => {
        ...,
        linkedArticle->{
          title,
          "slug": slug.current
        }
      },
      _type == "imageSection" => {
        ...,
        "image": {
          "url": image.asset->url,
          "alt": altText,
          "caption": caption
        }
      },
      _type == "audioPlayerSection" => {
        ...,
        "audioFile": {
          "url": audioFile.asset->url,
          "originalFilename": audioFile.asset->originalFilename
        }
      },
      _type == "videoSection" => {
        ...,
        "videoFile": {
          "url": videoFile.asset->url,
          "originalFilename": videoFile.asset->originalFilename
        }
      }
    }
  }
`;
var articlesIndexQuery = groq`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc){
    _id,
    title,
    format,
    publishedAt,
    "slug": slug.current,
    author->{
      _id,
      name,
      slug
    },
    "downloadablePdf": {
      "size": downloadablePdf.asset->size
    },
    "tags": tags[]->{
      _id,
      title,
      slug
    }
  }
`;
var relatedReadingFallbackArticlesQuery = groq`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc){
    _id,
    title,
    format,
    publishedAt,
    "slug": slug.current,
    "tags": tags[]->{
      _id,
      title,
      slug
    },
    author->{
      _id,
      name,
      slug
    },
    "thumbnail": {
      "url": thumbnail.asset->url,
      "alt": thumbnail.alt
    }
  }
`;
//#endregion
export { loadQuery as a, relatedReadingFallbackArticlesQuery as i, articlesIndexQuery as n, getDraftModeProps as o, homePageQuery as r, cleanString as s, articleBySlugQuery as t };
