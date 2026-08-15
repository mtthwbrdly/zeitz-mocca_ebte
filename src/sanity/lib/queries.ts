import groq from "groq";

const articleAuthorFields = groq`
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
  "authors": authors[]->{
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
  }
`;

const articleAuthorSummaryFields = groq`
  author->{
    _id,
    name,
    slug
  },
  "authors": authors[]->{
    _id,
    name,
    slug
  }
`;

const homeFeaturedArticleFields = groq`
  title,
  subtitle,
  excerpt,
  format,
  publishedAt,
  "slug": slug.current,
  "tags": tags[]->{
    _id,
    title,
    slug
  },
  ${articleAuthorSummaryFields},
  "thumbnail": {
    "url": thumbnail.asset->url,
    "alt": thumbnail.alt
  },
  contentSections[]{
    ...
  }
`;

export const homePageQuery = groq`
  *[_id == "homePage"][0]{
    _id,
    title,
    seoDescription,
    headerTitle,
    headerText,
    sections[]{
      _key,
      _type,
      ...,
      _type == "homeQuoteSection" => {
        ...,
        linkedArticle->{
          title,
          format,
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
          "authors": authors[]->{
            _id,
            name,
            slug
          }
        }
      },
      _type == "homeFeaturedArticleSection" => {
        ...,
        article->{
          ${homeFeaturedArticleFields}
        }
      },
      _type == "homeSplitFeatureSection" => {
        ...,
        "articles": articles[]->{
          ${homeFeaturedArticleFields}
        }
      }
    }
  }
`;

export const articleBySlugQuery = groq`
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
    ${articleAuthorFields},
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
        ${articleAuthorSummaryFields},
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
          "formattedCaption": formattedCaption
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

export const articlesIndexQuery = groq`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc, _updatedAt desc){
    _id,
    title,
    format,
    publishedAt,
    "slug": slug.current,
    ${articleAuthorSummaryFields},
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

export const authorsIndexQuery = groq`
  *[_type == "author" && defined(name)] | order(name asc){
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
  }
`;

export const relatedReadingFallbackArticlesQuery = groq`
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
    ${articleAuthorSummaryFields},
    "thumbnail": {
      "url": thumbnail.asset->url,
      "alt": thumbnail.alt
    }
  }
`;
