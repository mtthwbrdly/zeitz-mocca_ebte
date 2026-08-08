import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, _ as renderHead, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createAstro } from "./server_DonCUobE.mjs";
import { t as createComponent } from "./compiler_6iB4aqA_.mjs";
import "./page-ssr_BBasgkfm.mjs";
import { s as cleanString } from "./queries_BGwuiVKX.mjs";
import { t as loadArticleBySlug } from "./loadArticleBySlug_BolyubxQ.mjs";
import { n as extractPullQuoteRuns, r as calculateReadTime, t as renderPortableText } from "./renderPortableText_BkPB0WH5.mjs";
//#region src/components/PrintArticleLayout.astro
createAstro("https://astro.build");
var $$PrintArticleLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PrintArticleLayout;
	const { article } = Astro.props;
	const title = cleanString(article.title);
	const subtitle = cleanString(article.subtitle);
	const authorName = cleanString(article.author?.name);
	const publishedAtValue = cleanString(article.publishedAt);
	const publishedAt = publishedAtValue ? new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	}).format(new Date(publishedAtValue)) : "";
	const readTime = calculateReadTime(article);
	const byline = [
		authorName,
		publishedAt,
		readTime ? `${readTime} read` : ""
	].filter(Boolean).join("   /   ");
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><title>${title || "Article"}</title>${renderHead($$result)}</head><body><div class="print-body"><header class="masthead"><h1 class="masthead__title">${title}</h1>${subtitle && renderTemplate`<p class="masthead__subtitle">${subtitle}</p>`}${byline && renderTemplate`<p class="masthead__byline">${byline}</p>`}</header>${article.contentSections.map((section) => {
		if (section._type === "richTextSection") {
			const html = renderPortableText(section.body);
			const placement = cleanString(section.pullQuotePlacement) || "top";
			const quoteBlocks = extractPullQuoteRuns(section.body).map((pullQuote) => renderTemplate`<figure class="print-pull-quote print-pull-quote--inline"><blockquote>${pullQuote.quote}</blockquote></figure>`);
			return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${placement === "top" && quoteBlocks}<div class="print-prose">${unescapeHTML(html)}</div>${placement === "bottom" && quoteBlocks}` })}`;
		}
		if (section._type === "pullQuoteSection") {
			const quote = cleanString(section.quote);
			const attribution = cleanString(section.attribution);
			return renderTemplate`<figure${addAttribute(`print-pull-quote print-pull-quote--${section.size || "normal"}`, "class")}><blockquote>${quote}</blockquote>${attribution && renderTemplate`<figcaption>— ${attribution}</figcaption>`}</figure>`;
		}
		if (section._type === "shareClippingSection") return renderTemplate`<figure class="print-share-clipping"><p class="print-share-clipping__label">${cleanString(section.label) || "Shareable clipping"}</p><blockquote>${cleanString(section.quote)}</blockquote></figure>`;
		if (section._type === "featureCardSection") {
			const eyebrow = cleanString(section.eyebrow);
			const cardTitle = cleanString(section.title);
			const description = cleanString(section.description);
			return renderTemplate`<aside class="print-card">${eyebrow && renderTemplate`<p class="print-card__eyebrow">${eyebrow}</p>`}${cardTitle && renderTemplate`<p class="print-card__title">${cardTitle}</p>`}${description && renderTemplate`<p class="print-card__description">${description}</p>`}</aside>`;
		}
		if (section._type === "imageSection") {
			const url = cleanString(section.image?.url);
			const caption = cleanString(section.image?.caption);
			const alt = cleanString(section.image?.alt) || caption;
			if (!url) return null;
			return renderTemplate`<figure class="print-image"><img${addAttribute(url, "src")}${addAttribute(alt, "alt")}>${caption && renderTemplate`<figcaption>${caption}</figcaption>`}</figure>`;
		}
		if (section._type === "dividerSection") {
			if (cleanString(section.style) === "space") return renderTemplate`<div class="print-spacer"></div>`;
			return renderTemplate`<hr class="print-divider">`;
		}
		return null;
	})}</div></body></html>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/PrintArticleLayout.astro", void 0);
//#endregion
//#region src/pages/articles/[slug]/print.astro
var print_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Print,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Print = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Print;
	const { slug = "" } = Astro.params;
	const article = await loadArticleBySlug(slug, Astro.cookies);
	if (!article) Astro.response.status = 404;
	return renderTemplate`${article ? renderTemplate`${renderComponent($$result, "PrintArticleLayout", $$PrintArticleLayout, { "article": article })}` : renderTemplate`${maybeRenderHead($$result)}<p>Article not found.</p>`}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/pages/articles/[slug]/print.astro", void 0);
var $$file = "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/pages/articles/[slug]/print.astro";
var $$url = "/articles/[slug]/print";
//#endregion
//#region \0virtual:astro:page:src/pages/articles/[slug]/print@_@astro
var page = () => print_exports;
//#endregion
export { page };
