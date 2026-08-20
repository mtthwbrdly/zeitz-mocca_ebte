export interface SlugValue {
  current: string;
}

export interface Tag {
  _id?: string;
  title: string;
  slug: SlugValue;
}

export interface AssetFile {
  url?: string;
  originalFilename?: string;
}

export interface MediaAsset {
  url?: string;
  alt?: string;
  formattedCaption?: PortableTextBlock[];
}

export interface LinkedArticleSummary {
  title?: string;
  format?: string;
  slug?: string;
  publishedAt?: string;
  author?: Author;
  authors?: Author[];
  tags?: Tag[];
  coverImage?: MediaAsset;
}

export interface Author {
  _id?: string;
  name: string;
  slug: SlugValue;
  shortBio?: string;
  longBio?: string;
  role?: string;
  portrait?: MediaAsset;
}

export interface PortableTextSpan {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
}

export interface PortableTextLinkMarkDef {
  _key: string;
  _type: "link";
  href: string;
}

export interface PortableTextCitationMarkDef {
  _key: string;
  _type: "citation";
  formattedSource?: PortableTextBlock[];
  url?: string;
}

export type PortableTextMarkDef =
  | PortableTextLinkMarkDef
  | PortableTextCitationMarkDef;

export interface PortableTextBlock {
  _key?: string;
  _type: "block";
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  markDefs?: PortableTextMarkDef[];
  children: PortableTextSpan[];
}

export interface RichTextSection {
  _key?: string;
  _type: "richTextSection";
  body: PortableTextBlock[];
  pullQuotePlacement?: "top" | "bottom";
  width?: "standard" | "wide" | "narrow";
}

export interface PullQuoteSection {
  _key?: string;
  _type: "pullQuoteSection";
  quote: string | PortableTextBlock[];
  attribution?: string;
  size?: "normal" | "large";
}

export interface RelatedReadingSection {
  _key?: string;
  _type: "relatedReadingSection";
  articles: LinkedArticleSummary[];
}

export interface ImageSection {
  _key?: string;
  _type: "imageSection";
  image: MediaAsset;
  layout?:
    | "portrait"
    | "caption-left"
    | "landscape"
    | "inline"
    | "wide"
    | "full";
}

export interface AudioPlayerSection {
  _key?: string;
  _type: "audioPlayerSection";
  title?: string;
  audioFile: AssetFile;
  transcription?: string;
}

export interface VideoSection {
  _key?: string;
  _type: "videoSection";
  title?: string;
  sourceType?: "upload" | "youtube";
  videoFile?: AssetFile;
  youtubeUrl?: string;
  caption?: string;
  transcription?: string;
}

export interface DividerSection {
  _key?: string;
  _type: "dividerSection";
  style?: "line" | "space";
}

export interface CommentsSection {
  _key?: string;
  _type: "commentsSection";
  title?: string;
  intro?: string;
  slugOverride?: string;
}

export type ArticleSection =
  | RichTextSection
  | PullQuoteSection
  | ImageSection
  | AudioPlayerSection
  | VideoSection
  | CommentsSection
  | DividerSection;

export interface Article {
  _id?: string;
  title: string;
  slug: SlugValue;
  excerpt?: string;
  format?: string;
  series?: string;
  publishedAt?: string;
  author?: Author;
  authors?: Author[];
  tags: Tag[];
  coverImage?: MediaAsset;
  contentSections: ArticleSection[];
  furtherReading?: RelatedReadingSection;
}

export interface ArticleIndexItem {
  _id?: string;
  title?: string;
  format?: string;
  slug?: string;
  publishedAt?: string;
  author?: Author;
  authors?: Author[];
  tags?: Tag[];
}

export interface ArticleIndexHomeSection {
  _key?: string;
  _type: "articleIndexSection";
  title?: string;
  intro?: string;
  categoryFilter?: "all" | "process-notes" | "footnotes" | "voice-notes";
  showCategoryFilter?: boolean;
  maxItems?: number;
}

export type HomeFeaturedArticle = Omit<LinkedArticleSummary, "slug"> & {
  slug?: string;
  excerpt?: string;
  contentSections?: ArticleSection[];
};

export interface HomeFeaturedArticleSection {
  _key?: string;
  _type: "homeFeaturedArticleSection";
  article?: HomeFeaturedArticle;
}

export interface HomeSplitFeatureSection {
  _key?: string;
  _type: "homeSplitFeatureSection";
  articles?: HomeFeaturedArticle[];
}

export interface HomeCategoryCard {
  _key?: string;
  _type?: "categoryCard";
  category?: "process-notes" | "footnotes" | "voice-notes";
  label?: string;
  title?: string;
  description?: string;
  linkText?: string;
}

export interface CategoryCardsHomeSection {
  _key?: string;
  _type: "categoryCardsSection";
  title?: string;
  intro?: string;
  cards?: HomeCategoryCard[];
}

export interface HomeQuoteSection {
  _key?: string;
  _type: "homeQuoteSection";
  quote?: string;
  linkText?: string;
  linkedArticle?: {
    title?: string;
    format?: string;
    slug?: string;
    tags?: Tag[];
    author?: Author;
    authors?: Author[];
  };
}

export type HomePageSection =
  | ArticleIndexHomeSection
  | CategoryCardsHomeSection
  | HomeQuoteSection
  | HomeFeaturedArticleSection
  | HomeSplitFeatureSection;

export interface HomePage {
  _id?: string;
  title?: string;
  seoDescription?: string;
  headerTitle?: string;
  headerText?: string;
  sections: HomePageSection[];
}
