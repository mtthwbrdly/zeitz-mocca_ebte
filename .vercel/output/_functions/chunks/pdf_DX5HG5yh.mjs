import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { s as cleanString } from "./queries_BGwuiVKX.mjs";
import { t as loadArticleBySlug } from "./loadArticleBySlug_BolyubxQ.mjs";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
//#region src/server/pdfBrowser.ts
var browserPromise = null;
async function getPdfBrowser() {
	if (browserPromise) {
		const browser = await browserPromise;
		if (browser.connected) return browser;
		browserPromise = null;
	}
	const launchOptions = Boolean(process.env.VERCEL) ? {
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath(),
		headless: chromium.headless,
		ignoreHTTPSErrors: true
	} : { headless: true };
	browserPromise = puppeteer.launch(launchOptions);
	return browserPromise;
}
//#endregion
//#region src/pages/api/articles/[slug]/pdf.ts
var pdf_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var HEADER_TEMPLATE = `
  <div></div>
`;
var FOOTER_TEMPLATE = `
  <div style="width: 100%; display: flex; justify-content: space-between; font-family: 'Courier New', Courier, monospace; font-size: 8px; padding: 0 28pt; color: #555;">
    <span>EVERYTHING BUT THE EXHIBITION</span>
    <span><span class="pageNumber"></span>&nbsp;/&nbsp;<span class="totalPages"></span></span>
  </div>
`;
function slugifyFilename(value) {
	return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "article";
}
var GET = async ({ params, cookies, url }) => {
	const slug = cleanString(params.slug);
	if (!slug) return new Response("Not found", { status: 404 });
	const article = await loadArticleBySlug(slug, cookies);
	if (!article) return new Response("Article not found", { status: 404 });
	const page = await (await getPdfBrowser()).newPage();
	try {
		const printUrl = new URL(`/articles/${slug}/print`, url.origin);
		await page.goto(printUrl.toString(), { waitUntil: "networkidle0" });
		await page.evaluate(() => document.fonts.ready);
		const pdfBuffer = await page.pdf({
			printBackground: true,
			preferCSSPageSize: true,
			displayHeaderFooter: true,
			headerTemplate: HEADER_TEMPLATE,
			footerTemplate: FOOTER_TEMPLATE
		});
		const filename = `${slugifyFilename(cleanString(article.title) || slug)}.pdf`;
		return new Response(pdfBuffer, { headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${filename}"`
		} });
	} finally {
		await page.close();
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/articles/[slug]/pdf@_@ts
var page = () => pdf_exports;
//#endregion
export { page };
