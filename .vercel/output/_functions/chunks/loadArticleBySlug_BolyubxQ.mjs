import { a as loadQuery, i as relatedReadingFallbackArticlesQuery, o as getDraftModeProps, s as cleanString, t as articleBySlugQuery } from "./queries_BGwuiVKX.mjs";
//#region src/sanity/lib/loadArticleBySlug.ts
async function loadFallbackRelatedArticle(article, cookies) {
	const articleSlug = cleanString(article.slug?.current);
	if (!articleSlug) return null;
	try {
		const articles = (await loadQuery({
			query: relatedReadingFallbackArticlesQuery,
			...getDraftModeProps(cookies)
		})).data || [];
		const currentIndex = articles.findIndex((item) => cleanString(item.slug) === articleSlug);
		const fallbackArticle = currentIndex >= 0 ? articles[currentIndex + 1] || articles[0] : articles.find((item) => cleanString(item.slug) !== articleSlug);
		return fallbackArticle && cleanString(fallbackArticle.slug) !== articleSlug ? fallbackArticle : null;
	} catch (error) {
		console.error("Sanity fallback related article fetch failed.", error);
		return null;
	}
}
async function loadArticleBySlug(slug, cookies) {
	try {
		const article = (await loadQuery({
			query: articleBySlugQuery,
			params: { slug },
			...getDraftModeProps(cookies)
		})).data || null;
		if (!article) return null;
		if (!Boolean(article.furtherReading?.articles?.some((item) => cleanString(item?.slug)))) {
			const fallbackArticle = await loadFallbackRelatedArticle(article, cookies);
			if (fallbackArticle) article.furtherReading = {
				_type: "relatedReadingSection",
				articles: [fallbackArticle]
			};
		}
		return article;
	} catch (error) {
		console.error("Sanity article fetch failed.", error);
		return null;
	}
}
//#endregion
export { loadArticleBySlug as t };
