import type { APIRoute } from "astro";
import { cleanString } from "../../../../sanity/lib/clean";
import { loadArticleBySlug } from "../../../../sanity/lib/loadArticleBySlug";
import { getPdfBrowser } from "../../../../server/pdfBrowser";

export const prerender = false;

const HEADER_TEMPLATE = `
  <div></div>
`;

const FOOTER_TEMPLATE = `
  <div style="width: 100%; display: flex; justify-content: space-between; font-family: 'Courier New', Courier, monospace; font-size: 8px; padding: 0 28pt; color: #555;">
    <span>EVERYTHING BUT THE EXHIBITION</span>
    <span><span class="pageNumber"></span>&nbsp;/&nbsp;<span class="totalPages"></span></span>
  </div>
`;

function slugifyFilename(value: string) {
  const cleaned = value.trim().toLowerCase();
  return cleaned.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "article";
}

export const GET: APIRoute = async ({ params, cookies, url }) => {
  const slug = cleanString(params.slug);

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const article = await loadArticleBySlug(slug, cookies);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  const browser = await getPdfBrowser();
  const page = await browser.newPage();

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

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } finally {
    await page.close();
  }
};
