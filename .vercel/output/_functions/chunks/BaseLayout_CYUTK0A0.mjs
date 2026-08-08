import { _ as renderHead, a as renderComponent, f as renderTemplate, g as maybeRenderHead, l as renderSlot, n as renderTransition, v as addAttribute, w as createAstro, y as createRenderInstruction } from "./server_DonCUobE.mjs";
import { t as createComponent } from "./compiler_6iB4aqA_.mjs";
import { s as cleanString } from "./queries_BGwuiVKX.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/sanity/lib/articleCategory.ts
function getArticleCategory(article = {}) {
	const categoryText = [article.format, ...(article.tags || []).flatMap((tag) => [tag.title, tag.slug?.current])].map((value) => cleanString(value).toLowerCase()).join(" ");
	if (categoryText.includes("footnote")) return "footnotes";
	if (categoryText.includes("voice")) return "voice-notes";
	return "process-notes";
}
function getArticleCategoryClass(article = {}) {
	return `article-category-${getArticleCategory(article)}`;
}
//#endregion
//#region node_modules/astro/components/ClientRouter.astro
createAstro("https://astro.build");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/node_modules/astro/components/ClientRouter.astro", void 0);
//#endregion
//#region src/components/ScrollProgress.astro
var $$ScrollProgress = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div data-astro-transition-persist="scroll-progress"${addAttribute(renderTransition($$result, "jxytsa2d", "none", ""), "data-astro-transition-scope")} class="scroll-progress" aria-hidden="true" data-astro-cid-hfrh22jg><span class="scroll-progress__bar" data-scroll-progress-bar data-astro-cid-hfrh22jg></span></div><script data-astro-rerun>
  (() => {
    if (!window.__initScrollProgress) {
      let progressFrame = 0;

      window.__initScrollProgress = () => {
        const bar = document.querySelector("[data-scroll-progress-bar]");

        if (!(bar instanceof HTMLElement)) {
          return;
        }

        const updateProgress = () => {
          progressFrame = 0;

          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollable > 0
            ? Math.min(1, Math.max(0, window.scrollY / scrollable))
            : 0;

          bar.style.transform = \`scaleX(\${progress})\`;
        };

        const requestUpdate = () => {
          if (progressFrame) {
            return;
          }

          progressFrame = window.requestAnimationFrame(updateProgress);
        };

        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        updateProgress();
      };

      document.addEventListener("astro:page-load", window.__initScrollProgress);
    }

    window.__initScrollProgress();
  })();
<\/script>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/ScrollProgress.astro", "self");
//#endregion
//#region src/components/SiteNav.astro
var $$SiteNav = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="site-nav-shell" data-astro-cid-rutobish><nav data-astro-transition-persist="site-nav"${addAttribute(renderTransition($$result, "cgvml55l", "none", ""), "data-astro-transition-scope")} class="site-nav" aria-label="Primary" data-astro-cid-rutobish><a class="site-nav__brand" href="/" data-astro-cid-rutobish>Everything but the Exhibition</a><button class="site-nav__menu-button" type="button" aria-expanded="false" aria-controls="site-menu-overlay" data-menu-toggle data-astro-cid-rutobish>Menu</button></nav><div data-astro-transition-persist="site-menu-overlay"${addAttribute(renderTransition($$result, "nql53ihh", "none", ""), "data-astro-transition-scope")} class="site-menu-overlay" id="site-menu-overlay" aria-hidden="true" data-menu-overlay data-astro-cid-rutobish><div class="site-menu-overlay__panel" role="dialog" aria-modal="true" aria-label="Site menu" data-astro-cid-rutobish><div class="site-menu-overlay__top" data-astro-cid-rutobish><a class="site-menu-overlay__brand" href="/" data-menu-link data-astro-cid-rutobish>Everything but the Exhibition</a><button class="site-menu-overlay__close" type="button" aria-label="Close menu" data-menu-close data-astro-cid-rutobish>Close</button></div><div class="site-menu-overlay__content" data-astro-cid-rutobish><div class="site-menu-overlay__links" data-astro-cid-rutobish>${[
		{
			href: "/",
			label: "Home"
		},
		{
			href: "/",
			label: "Index"
		},
		{
			href: "/",
			label: "Contact"
		}
	].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} data-menu-link data-astro-cid-rutobish>${link.label}</a>`)}</div></div></div></div></div>${renderScript($$result, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/SiteNav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/SiteNav.astro", "self");
//#endregion
//#region src/components/SmoothScroll.astro
var $$SmoothScroll = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/SmoothScroll.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/SmoothScroll.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://astro.build");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { bodyClass = "", description = "Everything but the Exhibition.", title = "Everything but the Exhibition" } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body${addAttribute(bodyClass, "class")}>${renderComponent($$result, "SmoothScroll", $$SmoothScroll, {})}${renderComponent($$result, "ScrollProgress", $$ScrollProgress, {})}${renderComponent($$result, "SiteNav", $$SiteNav, {})}${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { getArticleCategory as n, getArticleCategoryClass as r, $$BaseLayout as t };
