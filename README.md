# Everything but the Exhibition

An Astro + Sanity editorial site for Everything but the Exhibition.

The frontend is intentionally lightweight:

- Semantic Astro templates
- Modern CSS for layout and typography
- Small amounts of vanilla browser JavaScript only where useful
- Sanity used for structured editorial content, not a single long rich-text field

## What is included

- A Sanity-driven article route at `/articles/[slug]`
- An embedded Sanity Studio at `/studio`
- Reorderable modular article sections
- Sanity-controlled homepage sections

## Project structure

- `src/components/ArticleLayout.astro`
- `src/components/ArticleHeader.astro`
- `src/components/ArticleMeta.astro`
- `src/components/AuthorInfo.astro`
- `src/components/article-sections/*`
- `src/components/home/*`
- `src/pages/index.astro`
- `src/pages/articles/[slug].astro`
- `schemaTypes/*`
- `src/sanity/lib/queries.ts`

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your Sanity project details to `.env` if you want to override the default project settings:

   ```bash
   cp .env.example .env
   ```

   Then set:

   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`

3. Start the Astro dev server:

   ```bash
   npm run dev
   ```

4. Visit:

   - `http://localhost:4321/`
   - `http://localhost:4321/articles/[article-slug]`
   - `http://localhost:4321/studio`

You can also run the Studio directly from the project root:

```bash
npm run studio
```

## Sanity content model

The project includes these schema types:

- `homePage`
- `articleIndexSection`
- `article`
- `author`
- `tag`
- `richTextSection`
- `pullQuoteSection`
- `shareClippingSection`
- `featureCardSection`
- `relatedReadingSection`
- `imageSection`
- `commentsSection`
- `dividerSection`

The key idea is the `contentSections` array on the `article` document. Each array item maps directly to an Astro component.

`Read Time` is not authored manually in Sanity. It is calculated automatically on the frontend from the article's textual content and shown in the metadata panel.

Further Reading is also editor-friendly now: the section only stores one or two linked article references, while each article document provides its own `thumbnail`, `title`, and `slug`.
It is configured on the article document itself, not inside the reorderable article stream, so it always renders as the full-width footer section after the main content.

## How to author and reorder sections

1. Run `npm run dev` and open `/studio`.
2. Create or open an `Article`.
3. Fill in the metadata fields at the top.
4. Add section blocks to `contentSections`.
5. Drag the array items up or down to reorder them.
6. Reload the article route to confirm the frontend updates in the same order.

To enable comments for a specific article:

1. Add a `commentsSection` block to that article's `contentSections`.
2. Set `PUBLIC_OPEN_REMARK_SITE_KEY` in your environment.
3. Leave the slug override blank unless you want a custom comment-thread key.

## Notes

- The frontend itself avoids React, Vue, or client-side frameworks.
- `@astrojs/react` is included only because the embedded Sanity Studio currently depends on it.
- The share interaction uses a small vanilla script with the Web Share API and clipboard fallback.
- The root `sanity.config.ts`, `sanity.cli.ts`, and `schemaTypes/` folder are the canonical Studio setup for this project.
- The comments integration uses Open Remark's documented embed pattern: `data-open-remark`, `data-site-key`, `data-slug`, and `https://open-remark.zeon.studio/embed.js`.
