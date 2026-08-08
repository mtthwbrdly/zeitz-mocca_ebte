import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, a as renderComponent, f as renderTemplate, g as maybeRenderHead, l as renderSlot, n as renderTransition, o as Fragment, v as addAttribute, w as createAstro } from "./server_DonCUobE.mjs";
import { t as createComponent } from "./compiler_6iB4aqA_.mjs";
import { r as getArticleCategoryClass, t as $$BaseLayout } from "./BaseLayout_CYUTK0A0.mjs";
import "./page-ssr_BBasgkfm.mjs";
import { o as getDraftModeProps, s as cleanString } from "./queries_BGwuiVKX.mjs";
import { t as loadArticleBySlug } from "./loadArticleBySlug_BolyubxQ.mjs";
import { n as extractPullQuoteRuns, r as calculateReadTime, t as renderPortableText } from "./renderPortableText_BkPB0WH5.mjs";
//#region src/sanity/lib/citations.ts
function citationReferenceId(citationKey) {
	return `citation-reference-${citationKey.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
function citationPanelId(citationKey) {
	return `citation-panel-${citationKey.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
function isCitationMarkDef(markDef) {
	return markDef?._type === "citation";
}
function getUsedCitationKeys(block) {
	const usedMarks = /* @__PURE__ */ new Set();
	block.children?.forEach((child) => {
		child.marks?.forEach((mark) => usedMarks.add(mark));
	});
	return usedMarks;
}
function extractCitationsFromBlocks(blocks = []) {
	const citations = [];
	const seenKeys = /* @__PURE__ */ new Set();
	blocks.forEach((block) => {
		const usedCitationKeys = getUsedCitationKeys(block);
		block.markDefs?.forEach((markDef) => {
			if (!isCitationMarkDef(markDef) || seenKeys.has(markDef._key)) return;
			if (!usedCitationKeys.has(markDef._key) || !cleanString(markDef.source).trim()) return;
			seenKeys.add(markDef._key);
			citations.push(markDef);
		});
	});
	return citations;
}
function extractArticleCitations(sections = []) {
	const citations = [];
	const citationMap = {};
	sections.forEach((section) => {
		if (section._type !== "richTextSection") return;
		extractCitationsFromBlocks(section.body).forEach((citation) => {
			if (citationMap[citation._key]) return;
			const reference = {
				_key: citation._key,
				id: citationPanelId(citation._key),
				note: cleanString(citation.note).trim(),
				number: citations.length + 1,
				source: cleanString(citation.source).trim(),
				targetId: citationReferenceId(citation._key),
				url: cleanString(citation.url).trim()
			};
			citations.push(reference);
			citationMap[citation._key] = reference;
		});
	});
	return {
		citationMap,
		citations
	};
}
//#endregion
//#region src/components/ArticleHeader.astro
createAstro("https://astro.build");
var $$ArticleHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleHeader;
	const { article, href, variant = "page" } = Astro.props;
	const publishedAtValue = cleanString(article?.publishedAt);
	const isRelated = variant === "related";
	const articleSlug = cleanString(article?.slug?.current || article?.slug);
	const transitionName = articleSlug ? `article-header-${articleSlug}` : void 0;
	const thumbnailUrl = cleanString(article.thumbnail?.url);
	const thumbnailAlt = cleanString(article.thumbnail?.alt);
	const publishedAt = publishedAtValue ? new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(publishedAtValue)) : null;
	const readTime = isRelated ? null : calculateReadTime(article);
	return renderTemplate`${maybeRenderHead($$result)}<header${addAttribute(renderTransition($$result, "iidvxdtg", "", transitionName), "data-astro-transition-scope")}${addAttribute(["article-header", isRelated && "article-header--related"], "class:list")} data-astro-cid-est43gev><div class="article-header__media"${addAttribute(thumbnailUrl ? void 0 : "true", "aria-hidden")} data-astro-cid-est43gev>${thumbnailUrl && renderTemplate`<img class="article-header__image"${addAttribute(thumbnailUrl, "src")}${addAttribute(thumbnailAlt, "alt")} loading="lazy" data-astro-cid-est43gev>`}</div><div class="article-header__inner" data-astro-cid-est43gev><div class="article-header__eyebrow" data-astro-cid-est43gev><p class="article-header__eyebrow-label" data-astro-cid-est43gev>${article.format}</p></div><div class="article-header__title" data-astro-cid-est43gev><h1 data-astro-cid-est43gev>${href ? renderTemplate`<a${addAttribute(href, "href")} data-astro-cid-est43gev>${article.title}</a>` : article.title}</h1>${article.author?.name && renderTemplate`<p class="article-header__author" data-astro-cid-est43gev>${article.author.name}</p>`}</div>${(publishedAt || readTime) && renderTemplate`<p class="article-header__meta" data-astro-cid-est43gev>${publishedAt && renderTemplate`<span data-astro-cid-est43gev>${publishedAt}</span>`}${publishedAt && readTime && renderTemplate`<span aria-hidden="true" data-astro-cid-est43gev>/</span>`}${readTime && renderTemplate`<span data-astro-cid-est43gev>Read time: ${readTime}</span>`}</p>`}</div></header>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/ArticleHeader.astro", "self");
//#endregion
//#region src/components/AuthorInfo.astro
createAstro("https://astro.build");
var $$AuthorInfo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AuthorInfo;
	const { author } = Astro.props;
	return renderTemplate`${Boolean(author?.role || author?.longBio) ? renderTemplate`${maybeRenderHead($$result)}<details class="author-info" data-astro-cid-uo7fhfbj><summary class="author-name" data-astro-cid-uo7fhfbj><span class="author-name__arrow" aria-hidden="true" data-astro-cid-uo7fhfbj></span><span data-astro-cid-uo7fhfbj>${author?.name}</span></summary><div class="author-info__body" data-lenis-prevent data-astro-cid-uo7fhfbj>${author?.role && renderTemplate`<p class="author-role" data-astro-cid-uo7fhfbj>${author.role}</p>`}${author?.longBio && renderTemplate`<p class="author-bio" data-astro-cid-uo7fhfbj>${author.longBio}</p>`}</div></details>` : renderTemplate`<section class="author-info" aria-label="Author information" data-astro-cid-uo7fhfbj><p class="author-name author-name--static" data-astro-cid-uo7fhfbj>${author?.name}</p></section>`}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/AuthorInfo.astro", void 0);
//#endregion
//#region src/components/ArticleMeta.astro
createAstro("https://astro.build");
var $$ArticleMeta = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleMeta;
	const { article, citations = [] } = Astro.props;
	const publishedAtValue = cleanString(article?.publishedAt);
	const publishedAt = publishedAtValue ? new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	}).format(new Date(publishedAtValue)) : null;
	const readTime = calculateReadTime(article);
	const articleSlug = cleanString(article?.slug?.current);
	return renderTemplate`${maybeRenderHead($$result)}<details class="article-meta" open data-sidebar-panel="information" data-astro-cid-pu3vu6e3><summary class="meta-kicker" data-astro-cid-pu3vu6e3><span class="meta-kicker__state" aria-hidden="true" data-astro-cid-pu3vu6e3></span><span data-astro-cid-pu3vu6e3>Article Information</span></summary><div class="meta-stack" data-lenis-prevent data-astro-cid-pu3vu6e3><p class="meta-title" data-astro-cid-pu3vu6e3>${article.title}</p>${renderComponent($$result, "AuthorInfo", $$AuthorInfo, {
		"author": article.author,
		"data-astro-cid-pu3vu6e3": true
	})}${publishedAt && renderTemplate`<p class="meta-item" data-astro-cid-pu3vu6e3>${publishedAt}</p>`}${article.tags?.length > 0 && renderTemplate`<p class="meta-item" data-astro-cid-pu3vu6e3><span data-astro-cid-pu3vu6e3>Tags:</span>${" "}${article.tags.map((tag, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<a${addAttribute(`/tags/${cleanString(tag.slug?.current)}`, "href")} data-astro-cid-pu3vu6e3>${tag.title}</a>${index < article.tags.length - 1 ? ", " : ""}` })}`)}</p>`}<p class="meta-item" data-astro-cid-pu3vu6e3>Read Time: ${readTime}</p><div class="meta-actions" data-astro-cid-pu3vu6e3><button type="button" class="meta-link" data-share-link data-astro-cid-pu3vu6e3>(+) Share</button><button type="button" class="meta-link" data-download-pdf${addAttribute(articleSlug, "data-slug")} data-astro-cid-pu3vu6e3>(↓) Download PDF</button></div></div></details>${citations.length > 0 && renderTemplate`<details class="article-meta citations-panel " data-sidebar-panel="citations" data-astro-cid-pu3vu6e3><summary class="meta-kicker" data-astro-cid-pu3vu6e3><span class="meta-kicker__state" aria-hidden="true" data-astro-cid-pu3vu6e3></span><span data-astro-cid-pu3vu6e3>Citations</span></summary><ol data-lenis-prevent data-astro-cid-pu3vu6e3>${citations.map((citation) => renderTemplate`<li${addAttribute(citation.id, "id")} data-astro-cid-pu3vu6e3><button class="citations-panel__back" type="button"${addAttribute(`Back to citation ${citation.number}`, "aria-label")}${addAttribute(citation.number, "data-citation-number")} data-citation-scroll data-astro-cid-pu3vu6e3>[${citation.number}]</button><span data-astro-cid-pu3vu6e3><span data-astro-cid-pu3vu6e3>${citation.source}</span>${citation.url && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${" "}<a class="citations-panel__visit"${addAttribute(citation.url, "href")} target="_blank" rel="noreferrer" data-astro-cid-pu3vu6e3>(Visit ↗)</a>` })}`}${citation.note && renderTemplate`<small data-astro-cid-pu3vu6e3>${citation.note}</small>`}</span></li>`)}</ol></details>`}<aside class="pdf-status" data-pdf-status hidden aria-live="polite" data-astro-cid-pu3vu6e3><p class="pdf-status__title" data-pdf-status-title data-astro-cid-pu3vu6e3>Preparing PDF...</p><p class="pdf-status__body" data-pdf-status-body data-astro-cid-pu3vu6e3>Formatting this article into a print-ready layout.</p><button type="button" class="pdf-status__close" data-pdf-status-close hidden data-astro-cid-pu3vu6e3>Dismiss</button></aside><script data-astro-rerun>
  (() => {
    const getPanelContent = (panel) =>
      panel.querySelector(":scope > .meta-stack, :scope > ol");

    const finishPanelContent = (content) => {
      content.style.height = "";
      content.style.opacity = "";
      content.style.overflow = "";
      content.style.transform = "";
    };

    if (!window.__initArticleMeta) {
      window.__initArticleMeta = () => {
        window.__articleMetaController?.abort?.();
        window.__articleMetaController = new AbortController();
        const articleMetaSignal = window.__articleMetaController.signal;

        const shareButton = document.querySelector("[data-share-link]");
        const downloadButton = document.querySelector("[data-download-pdf]");
        const statusPanel = document.querySelector("[data-pdf-status]");
        const statusTitle = document.querySelector("[data-pdf-status-title]");
        const statusBody = document.querySelector("[data-pdf-status-body]");
        const statusCloseButton = document.querySelector(
          "[data-pdf-status-close]",
        );
        const informationPanel = document.querySelector(
          '[data-sidebar-panel="information"]',
        );
        const citationsPanel = document.querySelector(
          '[data-sidebar-panel="citations"]',
        );
        const animatedPanels = [informationPanel, citationsPanel].filter(
          (panel) => panel instanceof HTMLDetailsElement,
        );
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const setPdfStatus = (title, body, dismissible = false) => {
          if (
            !(statusPanel instanceof HTMLElement) ||
            !(statusTitle instanceof HTMLElement) ||
            !(statusBody instanceof HTMLElement) ||
            !(statusCloseButton instanceof HTMLButtonElement)
          ) {
            return;
          }

          statusTitle.textContent = title;
          statusBody.textContent = body;
          statusPanel.hidden = false;
          statusCloseButton.hidden = !dismissible;
        };

        const hidePdfStatus = () => {
          if (statusPanel instanceof HTMLElement) {
            statusPanel.hidden = true;
          }
        };

        const animatePanelOpen = async (panel) => {
          const content = getPanelContent(panel);

          if (!(content instanceof HTMLElement)) {
            panel.open = true;
            return;
          }

          content.getAnimations().forEach((animation) => animation.cancel());
          panel.open = true;

          if (prefersReducedMotion) {
            finishPanelContent(content);
            return;
          }

          content.style.height = "0px";
          content.style.opacity = "0";
          content.style.overflow = "hidden";
          content.style.transform = "translateY(-0.25rem)";

          await new Promise((resolve) => window.requestAnimationFrame(resolve));

          const animation = content.animate(
            [
              { height: "0px", opacity: 0, transform: "translateY(-0.25rem)" },
              {
                height: \`\${content.scrollHeight}px\`,
                opacity: 1,
                transform: "translateY(0)",
              },
            ],
            { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );

          try {
            await animation.finished;
          } catch {
            return;
          }

          finishPanelContent(content);
        };

        const animatePanelClose = async (panel) => {
          const content = getPanelContent(panel);

          if (!(content instanceof HTMLElement)) {
            panel.open = false;
            return;
          }

          content.getAnimations().forEach((animation) => animation.cancel());

          if (prefersReducedMotion) {
            panel.open = false;
            finishPanelContent(content);
            return;
          }

          content.style.height = \`\${content.offsetHeight}px\`;
          content.style.opacity = "1";
          content.style.overflow = "hidden";
          content.style.transform = "translateY(0)";

          await new Promise((resolve) => window.requestAnimationFrame(resolve));

          const animation = content.animate(
            [
              {
                height: \`\${content.offsetHeight}px\`,
                opacity: 1,
                transform: "translateY(0)",
              },
              { height: "0px", opacity: 0, transform: "translateY(-0.25rem)" },
            ],
            { duration: 220, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          );

          try {
            await animation.finished;
          } catch {
            return;
          }

          panel.open = false;
          finishPanelContent(content);
        };

        const setPanelOpen = (panel, open) => {
          if (open) {
            animatedPanels.forEach((item) => {
              if (item !== panel && item.open) {
                animatePanelClose(item);
              }
            });

            if (!panel.open) {
              animatePanelOpen(panel);
            }
            return;
          }

          if (panel.open) {
            animatePanelClose(panel);
          }
        };

        if (shareButton instanceof HTMLButtonElement) {
          shareButton.addEventListener(
            "click",
            async () => {
              const url = window.location.href;

              if (navigator.share) {
                try {
                  await navigator.share({ title: document.title, url });
                  return;
                } catch {
                  // Fall through to clipboard copy.
                }
              }

              if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                shareButton.textContent = "(+) Link copied";
                window.setTimeout(() => {
                  shareButton.textContent = "(+) Share";
                }, 1800);
              }
            },
            { signal: articleMetaSignal },
          );
        }

        if (downloadButton instanceof HTMLButtonElement) {
          downloadButton.addEventListener(
            "click",
            async () => {
              const slug = downloadButton.dataset.slug;

              if (!slug) {
                setPdfStatus(
                  "PDF unavailable",
                  "We could not find the article to export. Refresh and try again.",
                  true,
                );
                return;
              }

              const originalLabel = downloadButton.textContent;
              downloadButton.disabled = true;
              downloadButton.textContent = "(↓) Preparing PDF...";
              setPdfStatus(
                "Generating PDF...",
                "This can take a few seconds for long articles with images.",
              );

              try {
                const response = await fetch(\`/api/articles/\${slug}/pdf\`);

                if (!response.ok) {
                  throw new Error(\`Server responded with \${response.status}\`);
                }

                const disposition =
                  response.headers.get("Content-Disposition") || "";
                const filenameMatch = disposition.match(/filename="([^"]+)"/);
                const filename = filenameMatch
                  ? filenameMatch[1]
                  : \`\${slug}.pdf\`;
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = downloadUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(downloadUrl);

                setPdfStatus(
                  "Download started",
                  "Next steps: open the file from your Downloads folder to review layout, then share or print.",
                  true,
                );
              } catch (error) {
                const detail =
                  error instanceof Error && error.message
                    ? \` Details: \${error.message}\`
                    : "";

                setPdfStatus(
                  "PDF failed",
                  \`The export did not complete. Try again, or use your browser's Print to PDF fallback.\${detail}\`,
                  true,
                );
              } finally {
                downloadButton.disabled = false;
                downloadButton.textContent = originalLabel;
              }
            },
            { signal: articleMetaSignal },
          );
        }

        statusCloseButton?.addEventListener("click", hidePdfStatus, {
          signal: articleMetaSignal,
        });

        animatedPanels.forEach((panel) => {
          const summary = panel.querySelector(":scope > summary");

          summary?.addEventListener(
            "click",
            (event) => {
              event.preventDefault();
              setPanelOpen(panel, !panel.open);
            },
            { signal: articleMetaSignal },
          );
        });

        document.addEventListener(
          "click",
          (event) => {
            const link =
              event.target instanceof Element
                ? event.target.closest("[data-citation-scroll]")
                : null;

            if (!(link instanceof HTMLElement)) {
              return;
            }

            const citationNumber = link.dataset.citationNumber;
            const target = citationNumber
              ? document.querySelector(
                  \`[data-citation-inline][data-citation-number="\${citationNumber}"]\`,
                )
              : null;

            if (!(target instanceof HTMLElement)) {
              return;
            }

            event.preventDefault();

            const containingDetails = target.closest("details");
            if (containingDetails instanceof HTMLDetailsElement) {
              setPanelOpen(containingDetails, true);
            }

            window.requestAnimationFrame(() => {
              target.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });

              window.history.pushState(null, "", \`#\${target.id}\`);
            });
          },
          { signal: articleMetaSignal },
        );

        document.addEventListener(
          "click",
          (event) => {
            const link =
              event.target instanceof Element
                ? event.target.closest("[data-citation-panel-link]")
                : null;

            if (!(link instanceof HTMLElement)) {
              return;
            }

            event.preventDefault();

            if (citationsPanel instanceof HTMLDetailsElement) {
              setPanelOpen(citationsPanel, true);
            }
          },
          { signal: articleMetaSignal },
        );

        const articlePage = document.querySelector(".article-page");
        const closeInformationThreshold = 1080;
        let hasAutoClosedInformation = false;
        let scrollFrame = 0;

        const closeInformationOnScroll = () => {
          scrollFrame = 0;

          if (
            hasAutoClosedInformation ||
            !(articlePage instanceof HTMLElement) ||
            !(informationPanel instanceof HTMLDetailsElement) ||
            !informationPanel.open
          ) {
            return;
          }

          const scrolledIntoArticle = Math.max(
            0,
            window.scrollY - articlePage.offsetTop,
          );

          if (scrolledIntoArticle >= closeInformationThreshold) {
            hasAutoClosedInformation = true;
            setPanelOpen(informationPanel, false);
          }
        };

        window.addEventListener(
          "scroll",
          () => {
            if (scrollFrame) {
              return;
            }

            scrollFrame = window.requestAnimationFrame(
              closeInformationOnScroll,
            );
          },
          { passive: true, signal: articleMetaSignal },
        );

        closeInformationOnScroll();
      };

      document.addEventListener("astro:page-load", window.__initArticleMeta);
    }

    window.__initArticleMeta();
  })();
<\/script>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/ArticleMeta.astro", void 0);
//#endregion
//#region src/components/article-sections/AudioPlayerSection.astro
createAstro("https://astro.build");
var $$AudioPlayerSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AudioPlayerSection;
	const { section } = Astro.props;
	const title = cleanString(section.title).trim();
	const audioUrl = cleanString(section.audioFile?.url);
	const transcription = cleanString(section.transcription).trim();
	return renderTemplate`${audioUrl && renderTemplate`${maybeRenderHead($$result)}<section class="audio-section" data-astro-cid-wyle2c6i><div class="audio-section__player" data-astro-cid-wyle2c6i>${title && renderTemplate`<div class="section-title-row audio-section__title-row" data-astro-cid-wyle2c6i><h2 data-astro-cid-wyle2c6i>${title}</h2><div class="section-header-icon audio-player__decorative-icon" data-astro-cid-wyle2c6i>${unescapeHTML("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\">\n  <path d=\"M2 6.25h2.6L8.25 3v10L4.6 9.75H2v-3.5Z\" />\n  <path d=\"M10 5.25c.75.68 1.2 1.64 1.2 2.75s-.45 2.07-1.2 2.75\" />\n  <path d=\"M11.65 3.75A5.8 5.8 0 0 1 13.5 8a5.8 5.8 0 0 1-1.85 4.25\" />\n</svg>\n")}</div></div>`}<div class="audio-player" data-audio-player data-astro-cid-wyle2c6i><audio preload="metadata"${addAttribute(audioUrl, "src")}${addAttribute(title || "Audio player", "aria-label")} data-audio-element data-astro-cid-wyle2c6i><a${addAttribute(audioUrl, "href")} data-astro-cid-wyle2c6i>Download audio</a></audio><div class="audio-player__controls" data-astro-cid-wyle2c6i><button class="audio-player__button audio-player__toggle" type="button" aria-label="Play audio" data-audio-toggle data-astro-cid-wyle2c6i><svg class="audio-player__icon audio-player__icon--play" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-wyle2c6i><path d="M5 3.5v9l7-4.5-7-4.5Z" data-astro-cid-wyle2c6i></path></svg><svg class="audio-player__icon audio-player__icon--pause" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-wyle2c6i><path d="M4.5 3.25h2.25v9.5H4.5v-9.5Zm4.75 0h2.25v9.5H9.25v-9.5Z" data-astro-cid-wyle2c6i></path></svg><span class="audio-player__loader" aria-hidden="true" data-astro-cid-wyle2c6i></span></button><span class="audio-player__time" data-audio-current data-astro-cid-wyle2c6i>0:00</span><div class="audio-player__timeline" data-astro-cid-wyle2c6i><div class="audio-player__waveform" aria-hidden="true" data-audio-waveform data-astro-cid-wyle2c6i><canvas class="audio-player__waveform-canvas" data-audio-waveform-track data-astro-cid-wyle2c6i></canvas><canvas class="audio-player__waveform-canvas audio-player__waveform-canvas--played" data-audio-waveform-played data-astro-cid-wyle2c6i></canvas></div><input class="audio-player__range audio-player__progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Audio progress" data-audio-progress data-astro-cid-wyle2c6i></div><span class="audio-player__time" data-audio-duration data-astro-cid-wyle2c6i>--:--</span><button class="audio-player__button audio-player__mute" type="button" aria-label="Mute audio" data-audio-mute data-astro-cid-wyle2c6i><svg class="audio-player__icon audio-player__icon--volume" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-wyle2c6i><path d="M2 6.25h2.6L8.25 3v10L4.6 9.75H2v-3.5Z" data-astro-cid-wyle2c6i></path><path d="M10 5.25c.75.68 1.2 1.64 1.2 2.75s-.45 2.07-1.2 2.75" data-astro-cid-wyle2c6i></path><path d="M11.65 3.75A5.8 5.8 0 0 1 13.5 8a5.8 5.8 0 0 1-1.85 4.25" data-astro-cid-wyle2c6i></path></svg><svg class="audio-player__icon audio-player__icon--muted" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-wyle2c6i><path d="M2 6.25h2.6L8.25 3v10L4.6 9.75H2v-3.5Z" data-astro-cid-wyle2c6i></path><path d="m10.25 6.25 3 3m0-3-3 3" data-astro-cid-wyle2c6i></path></svg></button><input class="audio-player__range audio-player__volume" type="range" min="0" max="1" value="1" step="0.01" aria-label="Audio volume" data-audio-volume data-astro-cid-wyle2c6i></div></div></div>${transcription && renderTemplate`<details class="audio-section__transcription" data-astro-cid-wyle2c6i><summary class="audio-section__transcription-heading" data-astro-cid-wyle2c6i><span class="audio-section__transcription-arrow" aria-hidden="true" data-astro-cid-wyle2c6i></span><span data-astro-cid-wyle2c6i>Transcription</span></summary><div class="audio-section__transcription-body" data-astro-cid-wyle2c6i>${transcription}</div></details>`}</section>`}<script data-astro-rerun>
  (() => {
    if (!window.__initAudioPlayers) {
      const formatAudioTime = (seconds) => {
        if (!Number.isFinite(seconds) || seconds < 0) {
          return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");

        return \`\${minutes}:\${remainingSeconds}\`;
      };

      window.__initAudioPlayers = () => {
        document.querySelectorAll("[data-audio-player]").forEach((player) => {
    if (!(player instanceof HTMLElement) || player.dataset.audioBound === "true") {
      return;
    }

    const audio = player.querySelector("[data-audio-element]");
    const toggle = player.querySelector("[data-audio-toggle]");
    const progress = player.querySelector("[data-audio-progress]");
    const mute = player.querySelector("[data-audio-mute]");
    const volume = player.querySelector("[data-audio-volume]");
    const waveform = player.querySelector("[data-audio-waveform]");
    const waveformTrack = player.querySelector("[data-audio-waveform-track]");
    const waveformPlayed = player.querySelector("[data-audio-waveform-played]");
    const currentTime = player.querySelector("[data-audio-current]");
    const duration = player.querySelector("[data-audio-duration]");

    if (!(audio instanceof HTMLAudioElement) || !(toggle instanceof HTMLButtonElement) || !(progress instanceof HTMLInputElement)) {
      return;
    }

    player.dataset.audioBound = "true";

    let previousVolume = audio.volume || 1;
    let progressFrame = 0;
    let waveformPeaks = [];

    const setRangeFill = (range, value) => {
      range.style.setProperty("--range-fill", \`\${value}%\`);
      range.parentElement?.style.setProperty("--range-fill", \`\${value}%\`);
      waveform?.style.setProperty("--range-fill", \`\${value}%\`);
    };

    const updateProgressFill = () => {
      setRangeFill(progress, Number(progress.value));
    };

    const updateVolumeFill = () => {
      if (volume instanceof HTMLInputElement) {
        setRangeFill(volume, Number(volume.value) * 100);
      }
    };

    const updateToggle = () => {
      const isPlaying = !audio.paused;
      toggle.classList.toggle("is-playing", isPlaying);
      toggle.setAttribute("aria-label", isPlaying ? "Pause audio" : "Play audio");
    };

    const updateBuffering = (isBuffering) => {
      player.classList.toggle("is-buffering", isBuffering);
    };

    const updateMute = () => {
      const isMuted = audio.muted || audio.volume === 0;
      player.classList.toggle("is-muted", isMuted);

      if (mute instanceof HTMLButtonElement) {
        mute.setAttribute("aria-label", isMuted ? "Unmute audio" : "Mute audio");
      }
    };

    const updateDuration = () => {
      if (duration) {
        duration.textContent = Number.isFinite(audio.duration) ? formatAudioTime(audio.duration) : "--:--";
      }
    };

    const updateProgress = () => {
      const percentage = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      progress.value = String(percentage);
      updateProgressFill();

      if (currentTime) {
        currentTime.textContent = formatAudioTime(audio.currentTime);
      }
    };

    const getCssColor = (name, fallback) => {
      const color = window.getComputedStyle(player).getPropertyValue(name).trim();
      return color || fallback;
    };

    const resizeCanvas = (canvas, width, height) => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = \`\${width}px\`;
      canvas.style.height = \`\${height}px\`;

      const context = canvas.getContext("2d");
      context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      return context;
    };

    const drawWaveform = () => {
      if (
        !(waveform instanceof HTMLElement) ||
        !(waveformTrack instanceof HTMLCanvasElement) ||
        !(waveformPlayed instanceof HTMLCanvasElement)
      ) {
        return;
      }

      const bounds = waveform.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));
      const trackContext = resizeCanvas(waveformTrack, width, height);
      const playedContext = resizeCanvas(waveformPlayed, width, height);

      if (!trackContext || !playedContext) {
        return;
      }

      const trackColor = getCssColor("--audio-waveform-track", "rgba(23, 23, 23, 0.22)");
      const playedColor = getCssColor("--audio-waveform-played", "rgb(23, 23, 23)");
      const centerY = height / 2;
      const barWidth = 1;
      const gap = 2;
      const step = barWidth + gap;
      const barCount = Math.max(1, Math.floor(width / step));
      const peaks = waveformPeaks.length > 0
        ? waveformPeaks
        : Array.from({ length: barCount }, (_, index) => {
            const randomSeed = Math.sin((index + 1) * 12.9898) * 43758.5453;
            const random = randomSeed - Math.floor(randomSeed);
            const neighbourSeed = Math.sin((index + 7) * 78.233) * 19341.17;
            const neighbourRandom = neighbourSeed - Math.floor(neighbourSeed);
            const softEnvelope = Math.sin(index * 0.09) * 0.5 + 0.5;

            return 0.12 + random * 0.58 + neighbourRandom * 0.18 + softEnvelope * 0.12;
          });
      const drawBars = (context, color) => {
        context.clearRect(0, 0, width, height);
        context.fillStyle = color;

        for (let index = 0; index < barCount; index += 1) {
          const peakIndex = Math.min(peaks.length - 1, Math.floor((index / barCount) * peaks.length));
          const peak = Math.max(0.12, peaks[peakIndex] || 0);
          const barHeight = Math.max(2, peak * height * 0.92);
          const x = index * step;
          const y = centerY - barHeight / 2;

          context.fillRect(x, y, barWidth, barHeight);
        }
      };

      drawBars(trackContext, trackColor);
      drawBars(playedContext, playedColor);
    };

    const extractPeaks = (audioBuffer) => {
      const channelCount = Math.min(2, audioBuffer.numberOfChannels);
      const sampleCount = 900;
      const blockSize = Math.max(1, Math.floor(audioBuffer.length / sampleCount));
      const peaks = [];

      for (let blockIndex = 0; blockIndex < sampleCount; blockIndex += 1) {
        const blockStart = blockIndex * blockSize;
        let peak = 0;

        for (let channelIndex = 0; channelIndex < channelCount; channelIndex += 1) {
          const channelData = audioBuffer.getChannelData(channelIndex);
          const blockEnd = Math.min(channelData.length, blockStart + blockSize);

          for (let sampleIndex = blockStart; sampleIndex < blockEnd; sampleIndex += 1) {
            peak = Math.max(peak, Math.abs(channelData[sampleIndex]));
          }
        }

        peaks.push(peak);
      }

      const maxPeak = Math.max(...peaks, 0.01);
      return peaks.map((peak) => Math.pow(peak / maxPeak, 0.72));
    };

    const loadWaveform = async () => {
      drawWaveform();

      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

      if (!AudioContextConstructor) {
        return;
      }

      try {
        const response = await fetch(audio.currentSrc || audio.src);
        const audioData = await response.arrayBuffer();
        const audioContext = new AudioContextConstructor();
        const audioBuffer = await audioContext.decodeAudioData(audioData.slice(0));
        waveformPeaks = extractPeaks(audioBuffer);
        await audioContext.close();
        drawWaveform();
      } catch {
        drawWaveform();
      }
    };

    const startProgressLoop = () => {
      window.cancelAnimationFrame(progressFrame);

      const tick = () => {
        updateProgress();

        if (!audio.paused && !audio.ended) {
          progressFrame = window.requestAnimationFrame(tick);
        }
      };

      progressFrame = window.requestAnimationFrame(tick);
    };

    const stopProgressLoop = () => {
      window.cancelAnimationFrame(progressFrame);
      progressFrame = 0;
      updateProgress();
    };

    const primeAudioMetadata = () => {
      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
        updateDuration();
        updateProgress();
        return;
      }

      try {
        audio.load();
      } catch (error) {
        console.error("Audio metadata load failed.", error);
      }
    };

    toggle.addEventListener("click", async () => {
      if (audio.paused) {
        updateBuffering(true);

        if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) {
          primeAudioMetadata();
        }

        try {
          await audio.play();
        } catch (error) {
          updateBuffering(false);
          console.error("Audio playback failed.", error);
        }
      } else {
        audio.pause();
      }
    });

    progress.addEventListener("input", () => {
      if (!audio.duration) {
        return;
      }

      audio.currentTime = (Number(progress.value) / 100) * audio.duration;
      updateProgressFill();
    });

    if (mute instanceof HTMLButtonElement) {
      mute.addEventListener("click", () => {
        if (audio.muted || audio.volume === 0) {
          audio.muted = false;
          audio.volume = previousVolume || 1;

          if (volume instanceof HTMLInputElement) {
            volume.value = String(audio.volume);
          }
        } else {
          previousVolume = audio.volume;
          audio.muted = true;
        }

        updateMute();
        updateVolumeFill();
      });
    }

    if (volume instanceof HTMLInputElement) {
      volume.addEventListener("input", () => {
        const nextVolume = Number(volume.value);
        audio.volume = nextVolume;
        audio.muted = nextVolume === 0;

        if (nextVolume > 0) {
          previousVolume = nextVolume;
        }

        updateMute();
        updateVolumeFill();
      });
    }

    audio.addEventListener("loadedmetadata", () => {
      updateDuration();
      updateProgress();
      loadWaveform();
    });

    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", () => {
      updateToggle();
      startProgressLoop();
    });
    audio.addEventListener("pause", () => {
      updateToggle();
      stopProgressLoop();
    });
    audio.addEventListener("waiting", () => updateBuffering(true));
    audio.addEventListener("canplay", () => updateBuffering(false));
    audio.addEventListener("playing", () => updateBuffering(false));
    audio.addEventListener("volumechange", () => {
      if (volume instanceof HTMLInputElement) {
        volume.value = String(audio.muted ? 0 : audio.volume);
      }

      updateMute();
      updateVolumeFill();
    });
    audio.addEventListener("ended", () => {
      updateToggle();
      stopProgressLoop();
    });

    updateDuration();
    updateProgress();
    updateVolumeFill();
    updateMute();
    updateToggle();
    primeAudioMetadata();
    loadWaveform();

    window.requestAnimationFrame(drawWaveform);
    window.requestAnimationFrame(primeAudioMetadata);

    if (window.ResizeObserver && waveform instanceof HTMLElement) {
      const resizeObserver = new ResizeObserver(drawWaveform);
      resizeObserver.observe(waveform);
    } else {
      window.addEventListener("resize", drawWaveform);
    }
  });
      };

      document.addEventListener("astro:page-load", window.__initAudioPlayers);
    }

    window.__initAudioPlayers();
  })();
<\/script>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/AudioPlayerSection.astro", void 0);
//#endregion
//#region src/assets/icons/comment-outline.svg?raw
var comment_outline_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\">\n  <path d=\"M2.5 3.25h11v7.5h-5L5.25 13v-2.25H2.5v-7.5Z\" />\n</svg>\n";
//#endregion
//#region src/components/article-sections/CommentsSection.astro
createAstro("https://astro.build");
var $$CommentsSection = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$CommentsSection;
	const { section, article } = Astro2.props;
	const siteKey = "cmrdcf9s3000104l7yf3kgokb";
	const articleSlug = article?.slug?.current ? `/articles/${cleanString(article.slug.current)}` : "/";
	const commentSlug = cleanString(section.slugOverride).trim() || articleSlug;
	const title = section.title || "Comments";
	return renderTemplate`${maybeRenderHead($$result)}<section class="comments-section"${addAttribute(title, "aria-label")} data-astro-cid-s3ndeguf><div class="comments-section__inner" data-astro-cid-s3ndeguf><div class="comments-section__header" data-astro-cid-s3ndeguf><div class="section-title-row comments-section__title-row" data-astro-cid-s3ndeguf><h2 data-astro-cid-s3ndeguf>${title}</h2><div class="section-header-icon comments-section__decorative-icon" data-astro-cid-s3ndeguf>${unescapeHTML(comment_outline_default)}</div></div>${section.intro && renderTemplate`<p data-astro-cid-s3ndeguf>${section.intro}</p>`}</div>${renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<div class="comments-section__widget" data-open-remark${addAttribute(siteKey, "data-site-key")}${addAttribute(commentSlug, "data-slug")} data-astro-cid-s3ndeguf></div><script data-astro-rerun>
            (() => {
              if (!window.__initOpenRemarkComments) {
                window.__initOpenRemarkComments = () => {
                  const widgets = document.querySelectorAll("[data-open-remark]");

                  if (widgets.length === 0) {
                    return;
                  }

                  document.querySelectorAll("script[data-open-remark-embed]").forEach((script) => {
                    script.remove();
                  });

                  const script = document.createElement("script");
                  script.async = true;
                  script.src = "https://open-remark.zeon.studio/embed.js";
                  script.dataset.openRemarkEmbed = "true";
                  document.head.appendChild(script);
                };

                document.addEventListener("astro:page-load", window.__initOpenRemarkComments);
              }

              window.__initOpenRemarkComments();
            })();
          <\/script>` })}`}</div></section>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/CommentsSection.astro", void 0);
//#endregion
//#region src/components/article-sections/DividerSection.astro
createAstro("https://astro.build");
var $$DividerSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DividerSection;
	const { section } = Astro.props;
	return renderTemplate`${cleanString(section.style) === "space" ? renderTemplate`${maybeRenderHead($$result)}<div class="divider-space" aria-hidden="true" data-astro-cid-lkb5mkru></div>` : renderTemplate`<hr class="divider-line" data-astro-cid-lkb5mkru>`}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/DividerSection.astro", void 0);
//#endregion
//#region src/components/article-sections/FeatureCardSection.astro
createAstro("https://astro.build");
var $$FeatureCardSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FeatureCardSection;
	const { section } = Astro.props;
	const linkedSlug = cleanString(section.linkedArticle?.slug);
	const href = linkedSlug ? `/articles/${linkedSlug}` : "#";
	return renderTemplate`${maybeRenderHead($$result)}<aside class="feature-card" data-astro-cid-jhe4zs22><p class="feature-card__eyebrow" data-astro-cid-jhe4zs22>${section.eyebrow}</p><div class="feature-card__body" data-astro-cid-jhe4zs22><div data-astro-cid-jhe4zs22><h2 data-astro-cid-jhe4zs22>${section.title}</h2><p data-astro-cid-jhe4zs22>${section.description}</p></div><a${addAttribute(href, "href")} data-astro-cid-jhe4zs22>${section.linkText || "Read more"}</a></div></aside>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/FeatureCardSection.astro", void 0);
//#endregion
//#region src/components/article-sections/ImageSection.astro
createAstro("https://astro.build");
var $$ImageSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImageSection;
	const { section } = Astro.props;
	const layout = cleanString(section.layout) || "inline";
	const imageUrl = cleanString(section.image?.url);
	const imageAlt = cleanString(section.image?.alt) || cleanString(section.image?.caption) || "";
	return renderTemplate`${maybeRenderHead($$result)}<figure${addAttribute(`image-section image-section--${layout}`, "class")} data-astro-cid-3u6uzapj><img${addAttribute(imageUrl, "src")}${addAttribute(imageAlt, "alt")} loading="lazy" data-astro-cid-3u6uzapj>${section.image.caption && renderTemplate`<figcaption data-astro-cid-3u6uzapj>${section.image.caption}</figcaption>`}</figure>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/ImageSection.astro", void 0);
//#endregion
//#region src/components/article-sections/PullQuoteSection.astro
createAstro("https://astro.build");
var $$PullQuoteSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PullQuoteSection;
	const { article, section } = Astro.props;
	const size = cleanString(section.size) || "normal";
	cleanString(article?.title);
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(`pull-quote pull-quote--${size}`, "class")} data-astro-cid-cyxwwtm7><blockquote data-astro-cid-cyxwwtm7><p data-astro-cid-cyxwwtm7>${section.quote}</p>${section.attribution && renderTemplate`<footer data-astro-cid-cyxwwtm7>${section.attribution}</footer>`}</blockquote>${Astro.slots.has("context") && renderTemplate`<div class="pull-quote__context" data-astro-cid-cyxwwtm7>${renderSlot($$result, $$slots["context"])}</div>`}<!-- {articleTitle && <div class="pull-quote__title" aria-hidden="true">{articleTitle}</div>} --><span class="pull-quote__marker pull-quote__marker--top-left" aria-hidden="true" data-astro-cid-cyxwwtm7></span><span class="pull-quote__marker pull-quote__marker--top-right" aria-hidden="true" data-astro-cid-cyxwwtm7></span><span class="pull-quote__marker pull-quote__marker--bottom-left" aria-hidden="true" data-astro-cid-cyxwwtm7></span><span class="pull-quote__marker pull-quote__marker--bottom-right" aria-hidden="true" data-astro-cid-cyxwwtm7></span></section>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/PullQuoteSection.astro", void 0);
//#endregion
//#region src/components/article-sections/RelatedReadingSection.astro
createAstro("https://astro.build");
var $$RelatedReadingSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RelatedReadingSection;
	const { section } = Astro.props;
	const article = (section.articles || []).filter((article) => cleanString(article?.slug))[0];
	const href = article ? `/articles/${cleanString(article.slug)}` : "";
	return renderTemplate`${article && renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(`related-reading ${getArticleCategoryClass(article)}`, "class")} data-astro-cid-oagp2af5>${renderComponent($$result, "ArticleHeader", $$ArticleHeader, {
		"article": article,
		"href": href,
		"variant": "related",
		"data-astro-cid-oagp2af5": true
	})}</section>`}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/RelatedReadingSection.astro", void 0);
//#endregion
//#region src/components/article-sections/RichTextSection.astro
createAstro("https://astro.build");
var $$RichTextSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RichTextSection;
	const { article, section, citationMap = {} } = Astro.props;
	const pullQuotes = extractPullQuoteRuns(section.body);
	const html = renderPortableText(section.body, citationMap);
	const pullQuotePlacement = cleanString(section.pullQuotePlacement) || "top";
	const width = cleanString(section.width) || "standard";
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(`rich-text rich-text--${width}`, "class")} data-astro-cid-tfsvv76z>${pullQuotes.length > 0 && pullQuotePlacement === "top" && renderTemplate`<div class="rich-text__pull-quotes" data-astro-cid-tfsvv76z>${pullQuotes.map((pullQuote) => renderTemplate`${renderComponent($$result, "PullQuoteSection", $$PullQuoteSection, {
		"section": {
			quote: pullQuote.quote,
			size: "normal"
		},
		"article": article,
		"data-astro-cid-tfsvv76z": true
	}, { "context": ($$result) => renderTemplate`<div class="rich-text__context-wrap" data-astro-cid-tfsvv76z><button class="rich-text__context-link" type="button"${addAttribute(pullQuote.targetId, "data-pull-quote-target-id")} data-astro-cid-tfsvv76z>[ Show in Context ]</button></div>` })}`)}</div>`}<div class="rich-text__panel prose" data-astro-cid-tfsvv76z>${unescapeHTML(html)}</div>${pullQuotes.length > 0 && pullQuotePlacement === "bottom" && renderTemplate`<div class="rich-text__pull-quotes" data-astro-cid-tfsvv76z>${pullQuotes.map((pullQuote) => renderTemplate`${renderComponent($$result, "PullQuoteSection", $$PullQuoteSection, {
		"section": {
			quote: pullQuote.quote,
			size: "normal"
		},
		"article": article,
		"data-astro-cid-tfsvv76z": true
	}, { "context": ($$result) => renderTemplate`<div class="rich-text__context-wrap" data-astro-cid-tfsvv76z><button class="rich-text__context-link" type="button"${addAttribute(pullQuote.targetId, "data-pull-quote-target-id")} data-astro-cid-tfsvv76z>[ Show in Context ]</button></div>` })}`)}</div>`}</section><script data-astro-rerun>
  if (!window.__bindPullQuoteContextButtons) {
    window.__bindPullQuoteContextButtons = () => {
      const activeTargets = new WeakMap();
      const buttons = document.querySelectorAll("[data-pull-quote-target-id]");

      const getQuoteTarget = (trigger) => {
        if (!(trigger instanceof HTMLButtonElement)) {
          return null;
        }

        const targetId = trigger.dataset.pullQuoteTargetId;
        return targetId ? document.getElementById(targetId) : null;
      };
      const setPreviewState = (trigger, isActive) => {
        const quoteTarget = getQuoteTarget(trigger);

        if (!quoteTarget) {
          return;
        }

        quoteTarget.classList.toggle("is-context-preview", isActive);
      };

      buttons.forEach((button) => {
        if (!(button instanceof HTMLButtonElement) || button.dataset.contextBound === "true") {
          return;
        }

        button.dataset.contextBound = "true";

        button.addEventListener("mouseenter", () => {
          setPreviewState(button, true);
        });

        button.addEventListener("mouseleave", () => {
          setPreviewState(button, false);
        });

        button.addEventListener("focus", () => {
          setPreviewState(button, true);
        });

        button.addEventListener("blur", () => {
          setPreviewState(button, false);
        });

        button.addEventListener("click", () => {
          const quoteTarget = getQuoteTarget(button);

          if (!quoteTarget) {
            return;
          }

          quoteTarget.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
          });

          quoteTarget.classList.remove("is-context-active");
          quoteTarget.offsetWidth;
          quoteTarget.classList.add("is-context-active");

          const existingTimeout = activeTargets.get(quoteTarget);
          if (existingTimeout) {
            window.clearTimeout(existingTimeout);
          }

          const timeout = window.setTimeout(() => {
            quoteTarget.classList.remove("is-context-active");
          }, 1600);

          activeTargets.set(quoteTarget, timeout);
        });
      });
    };

    document.addEventListener("astro:page-load", window.__bindPullQuoteContextButtons);
  }

  if (window.__bindPullQuoteContextButtons) {
    window.__bindPullQuoteContextButtons();
  }
<\/script>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/RichTextSection.astro", void 0);
//#endregion
//#region src/components/article-sections/ShareClippingSection.astro
createAstro("https://astro.build");
var $$ShareClippingSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShareClippingSection;
	const { section } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="share-clipping"${addAttribute(section.label || "Share clipping", "aria-label")} data-astro-cid-bzhhxxgu><p class="share-clipping__label" data-astro-cid-bzhhxxgu>${section.label || "(+) Share Clipping"}</p><blockquote data-astro-cid-bzhhxxgu>${section.quote}</blockquote></section>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/ShareClippingSection.astro", void 0);
//#endregion
//#region src/components/article-sections/VideoSection.astro
createAstro("https://astro.build");
var $$VideoSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VideoSection;
	const { section } = Astro.props;
	const title = cleanString(section.title).trim();
	const selectedSourceType = cleanString(section.sourceType);
	const videoUrl = cleanString(section.videoFile?.url);
	const youtubeUrl = cleanString(section.youtubeUrl);
	const caption = cleanString(section.caption).trim();
	const transcription = cleanString(section.transcription).trim();
	const getYouTubeId = (url) => {
		if (!url) return "";
		try {
			const parsedUrl = new URL(/^https?:\/\//.test(url) ? url : `https://${url}`);
			const hostname = parsedUrl.hostname.replace(/^www\./, "");
			if (hostname === "youtu.be") return parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
			if (hostname === "youtube.com" || hostname === "m.youtube.com") {
				if (parsedUrl.pathname.startsWith("/embed/")) return parsedUrl.pathname.split("/").filter(Boolean)[1] || "";
				if (parsedUrl.pathname.startsWith("/shorts/")) return parsedUrl.pathname.split("/").filter(Boolean)[1] || "";
				return parsedUrl.searchParams.get("v") || "";
			}
		} catch {
			return "";
		}
		return "";
	};
	const youtubeId = (selectedSourceType === "youtube" || !videoUrl && youtubeUrl ? "youtube" : "upload") === "youtube" ? getYouTubeId(youtubeUrl) : "";
	const youtubeEmbedUrl = youtubeId ? `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&controls=0&modestbranding=1&rel=0&playsinline=1` : "";
	const hasVideo = Boolean(youtubeEmbedUrl || videoUrl);
	const shouldRenderYouTube = Boolean(youtubeEmbedUrl);
	const videoTitle = title || "Video";
	return renderTemplate`${hasVideo && renderTemplate`${maybeRenderHead($$result)}<section class="video-section"${addAttribute(videoTitle, "aria-label")} data-astro-cid-xjsexrni><div class="video-section__player" data-astro-cid-xjsexrni>${title && renderTemplate`<div class="section-title-row video-section__title-row" data-astro-cid-xjsexrni><h2 data-astro-cid-xjsexrni>${title}</h2><div class="section-header-icon video-player__decorative-icon" data-astro-cid-xjsexrni>${unescapeHTML("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\">\n  <path d=\"M1.75 8s2.25-4 6.25-4 6.25 4 6.25 4-2.25 4-6.25 4-6.25-4-6.25-4Z\" />\n  <path d=\"M8 10.25A2.25 2.25 0 1 0 8 5.75a2.25 2.25 0 0 0 0 4.5Z\" />\n</svg>\n")}</div></div>`}<div class="video-player" data-video-player${addAttribute(shouldRenderYouTube ? "youtube" : "upload", "data-video-provider")}${addAttribute(shouldRenderYouTube ? youtubeId : void 0, "data-youtube-id")} data-astro-cid-xjsexrni><div class="video-section__media" data-astro-cid-xjsexrni>${shouldRenderYouTube ? renderTemplate`<iframe data-video-youtube${addAttribute(youtubeEmbedUrl, "src")}${addAttribute(videoTitle, "title")} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen data-astro-cid-xjsexrni></iframe>` : renderTemplate`<video preload="metadata"${addAttribute(videoUrl, "src")} playsinline data-video-element data-astro-cid-xjsexrni><a${addAttribute(videoUrl, "href")} data-astro-cid-xjsexrni>Download video</a></video>`}</div><div class="video-player__controls" data-astro-cid-xjsexrni><button class="video-player__button video-player__toggle" type="button" aria-label="Play video" data-video-toggle data-astro-cid-xjsexrni><svg class="video-player__icon video-player__icon--play" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-xjsexrni><path d="M5 3.5v9l7-4.5-7-4.5Z" data-astro-cid-xjsexrni></path></svg><svg class="video-player__icon video-player__icon--pause" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-xjsexrni><path d="M4.5 3.25h2.25v9.5H4.5v-9.5Zm4.75 0h2.25v9.5H9.25v-9.5Z" data-astro-cid-xjsexrni></path></svg></button><span class="video-player__time" data-video-current data-astro-cid-xjsexrni>0:00</span><div class="video-player__timeline" data-astro-cid-xjsexrni><input class="video-player__range video-player__progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Video progress" data-video-progress data-astro-cid-xjsexrni></div><span class="video-player__time" data-video-duration data-astro-cid-xjsexrni>--:--</span><button class="video-player__button video-player__mute" type="button" aria-label="Mute video" data-video-mute data-astro-cid-xjsexrni><svg class="video-player__icon video-player__icon--volume" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-xjsexrni><path d="M2 6.25h2.6L8.25 3v10L4.6 9.75H2v-3.5Z" data-astro-cid-xjsexrni></path><path d="M10 5.25c.75.68 1.2 1.64 1.2 2.75s-.45 2.07-1.2 2.75" data-astro-cid-xjsexrni></path><path d="M11.65 3.75A5.8 5.8 0 0 1 13.5 8a5.8 5.8 0 0 1-1.85 4.25" data-astro-cid-xjsexrni></path></svg><svg class="video-player__icon video-player__icon--muted" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-xjsexrni><path d="M2 6.25h2.6L8.25 3v10L4.6 9.75H2v-3.5Z" data-astro-cid-xjsexrni></path><path d="m10.25 6.25 3 3m0-3-3 3" data-astro-cid-xjsexrni></path></svg></button><input class="video-player__range video-player__volume" type="range" min="0" max="1" value="1" step="0.01" aria-label="Video volume" data-video-volume data-astro-cid-xjsexrni><button class="video-player__button video-player__fullscreen" type="button" aria-label="Enter fullscreen" data-video-fullscreen data-astro-cid-xjsexrni><svg class="video-player__icon" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-xjsexrni><path d="M3 6V3h3M10 3h3v3M13 10v3h-3M6 13H3v-3" fill="none" data-astro-cid-xjsexrni></path></svg></button></div></div>${caption && renderTemplate`<p class="video-section__caption" data-astro-cid-xjsexrni>${caption}</p>`}</div>${transcription && renderTemplate`<details class="video-section__transcription" data-astro-cid-xjsexrni><summary class="video-section__transcription-heading" data-astro-cid-xjsexrni><span class="video-section__transcription-arrow" aria-hidden="true" data-astro-cid-xjsexrni></span><span data-astro-cid-xjsexrni>Transcription</span></summary><div class="video-section__transcription-body" data-astro-cid-xjsexrni>${transcription}</div></details>`}</section>`}<script data-astro-rerun>
  (() => {
    if (!window.__initVideoPlayers) {
      const formatVideoTime = (seconds) => {
        if (!Number.isFinite(seconds) || seconds < 0) {
          return "0:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");

        return \`\${minutes}:\${remainingSeconds}\`;
      };

      const loadYouTubeApi = () => {
        if (window.YT?.Player) {
          return Promise.resolve(window.YT);
        }

        if (window.__youtubeIframeApiPromise) {
          return window.__youtubeIframeApiPromise;
        }

        window.__youtubeIframeApiPromise = new Promise((resolve) => {
          const previousReady = window.onYouTubeIframeAPIReady;
          window.onYouTubeIframeAPIReady = () => {
            previousReady?.();
            resolve(window.YT);
          };

          const script = document.createElement("script");
          script.src = "https://www.youtube.com/iframe_api";
          script.async = true;
          document.head.appendChild(script);
        });

        return window.__youtubeIframeApiPromise;
      };

      window.__initVideoPlayers = () => {
        window.__videoPlayerCleanups?.forEach((cleanup, boundPlayer) => {
          if (!document.contains(boundPlayer)) {
            cleanup();
            window.__videoPlayerCleanups.delete(boundPlayer);
          }
        });

        document.querySelectorAll("[data-video-player]").forEach((player) => {
          if (!(player instanceof HTMLElement) || player.dataset.videoBound === "true") {
            return;
          }

          const provider = player.dataset.videoProvider || "upload";
          const media = player.querySelector(".video-section__media");
          const video = player.querySelector("[data-video-element]");
          const iframe = player.querySelector("[data-video-youtube]");
          const toggle = player.querySelector("[data-video-toggle]");
          const progress = player.querySelector("[data-video-progress]");
          const mute = player.querySelector("[data-video-mute]");
          const volume = player.querySelector("[data-video-volume]");
          const fullscreen = player.querySelector("[data-video-fullscreen]");
          const currentTime = player.querySelector("[data-video-current]");
          const duration = player.querySelector("[data-video-duration]");

          if (!(toggle instanceof HTMLButtonElement) || !(progress instanceof HTMLInputElement)) {
            return;
          }

          player.dataset.videoBound = "true";
          window.__videoPlayerCleanups = window.__videoPlayerCleanups || new Map();

          let youtubePlayer = null;
          let isPlaying = false;
          let isMuted = false;
          let currentVolume = 1;
          let progressFrame = 0;
          const cleanupCallbacks = [];

          const addCleanup = (callback) => {
            cleanupCallbacks.push(callback);
          };

          const setRangeFill = (range, value) => {
            range.style.setProperty("--range-fill", \`\${value}%\`);
            range.parentElement?.style.setProperty("--range-fill", \`\${value}%\`);
          };

          const getDuration = () => {
            if (provider === "youtube" && youtubePlayer?.getDuration) {
              return youtubePlayer.getDuration() || 0;
            }

            return video instanceof HTMLVideoElement ? video.duration || 0 : 0;
          };

          const getCurrentTime = () => {
            if (provider === "youtube" && youtubePlayer?.getCurrentTime) {
              return youtubePlayer.getCurrentTime() || 0;
            }

            return video instanceof HTMLVideoElement ? video.currentTime || 0 : 0;
          };

          const updateToggle = () => {
            toggle.classList.toggle("is-playing", isPlaying);
            toggle.setAttribute("aria-label", isPlaying ? "Pause video" : "Play video");
          };

          const updateMute = () => {
            player.classList.toggle("is-muted", isMuted || currentVolume === 0);
            mute?.setAttribute("aria-label", isMuted || currentVolume === 0 ? "Unmute video" : "Mute video");
          };

          const updateDuration = () => {
            if (duration) {
              const nextDuration = getDuration();
              duration.textContent = Number.isFinite(nextDuration) && nextDuration > 0
                ? formatVideoTime(nextDuration)
                : "--:--";
            }
          };

          const updateProgress = () => {
            const nextDuration = getDuration();
            const nextCurrentTime = getCurrentTime();
            const percentage = nextDuration ? (nextCurrentTime / nextDuration) * 100 : 0;
            progress.value = String(percentage);
            setRangeFill(progress, percentage);

            if (currentTime) {
              currentTime.textContent = formatVideoTime(nextCurrentTime);
            }
          };

          const startProgressLoop = () => {
            window.cancelAnimationFrame(progressFrame);

            const tick = () => {
              updateDuration();
              updateProgress();

              if (isPlaying) {
                progressFrame = window.requestAnimationFrame(tick);
              }
            };

            tick();
          };

          const setPlaying = (nextPlaying) => {
            isPlaying = nextPlaying;
            updateToggle();

            if (isPlaying) {
              startProgressLoop();
            } else {
              window.cancelAnimationFrame(progressFrame);
              updateProgress();
            }
          };

          const seekToPercent = (percentage) => {
            const nextDuration = getDuration();
            const nextTime = nextDuration * (percentage / 100);

            if (provider === "youtube" && youtubePlayer?.seekTo) {
              youtubePlayer.seekTo(nextTime, true);
            } else if (video instanceof HTMLVideoElement) {
              video.currentTime = nextTime;
            }

            updateProgress();
          };

          const setVolume = (value) => {
            currentVolume = value;
            isMuted = value === 0 ? true : isMuted && value === 0;

            if (provider === "youtube" && youtubePlayer?.setVolume) {
              youtubePlayer.setVolume(value * 100);

              if (value === 0) {
                youtubePlayer.mute?.();
              } else {
                youtubePlayer.unMute?.();
                isMuted = false;
              }
            } else if (video instanceof HTMLVideoElement) {
              video.volume = value;

              if (value > 0) {
                video.muted = false;
                isMuted = false;
              }
            }

            setRangeFill(volume, value * 100);
            updateMute();
          };

          const primeVideoMetadata = () => {
            if (!(video instanceof HTMLVideoElement)) {
              return;
            }

            if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
              updateDuration();
              updateProgress();
              return;
            }

            try {
              video.load();
            } catch (error) {
              console.error("Video metadata load failed.", error);
            }
          };

          const handleToggleClick = async () => {
            if (provider === "youtube") {
              if (!youtubePlayer) {
                return;
              }

              if (isPlaying) {
                youtubePlayer.pauseVideo?.();
              } else {
                youtubePlayer.playVideo?.();
              }

              return;
            }

            if (!(video instanceof HTMLVideoElement)) {
              return;
            }

            if (video.paused) {
              if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
                primeVideoMetadata();
              }

              await video.play();
            } else {
              video.pause();
            }
          };

          toggle.addEventListener("click", handleToggleClick);
          addCleanup(() => toggle.removeEventListener("click", handleToggleClick));

          const handleProgressInput = () => {
            seekToPercent(Number(progress.value));
          };

          progress.addEventListener("input", handleProgressInput);
          addCleanup(() => progress.removeEventListener("input", handleProgressInput));

          if (volume instanceof HTMLInputElement) {
            const handleVolumeInput = () => {
              setVolume(Number(volume.value));
            };

            volume.addEventListener("input", handleVolumeInput);
            addCleanup(() => volume.removeEventListener("input", handleVolumeInput));
          }

          if (mute instanceof HTMLButtonElement) {
            const handleMuteClick = () => {
              if (provider === "youtube" && youtubePlayer) {
                isMuted = !isMuted;
                if (isMuted) {
                  youtubePlayer.mute?.();
                } else {
                  youtubePlayer.unMute?.();
                  if (currentVolume === 0) {
                    currentVolume = 1;
                    if (volume instanceof HTMLInputElement) {
                      volume.value = "1";
                      setRangeFill(volume, 100);
                    }
                    youtubePlayer.setVolume?.(100);
                  }
                }

                updateMute();
                return;
              }

              if (video instanceof HTMLVideoElement) {
                video.muted = !video.muted;
                isMuted = video.muted;
                updateMute();
              }
            };

            mute.addEventListener("click", handleMuteClick);
            addCleanup(() => mute.removeEventListener("click", handleMuteClick));
          }

          if (fullscreen instanceof HTMLButtonElement && media instanceof HTMLElement) {
            const handleFullscreenClick = async () => {
              if (document.fullscreenElement) {
                await document.exitFullscreen?.();
                fullscreen.setAttribute("aria-label", "Enter fullscreen");
              } else {
                await media.requestFullscreen?.();
                fullscreen.setAttribute("aria-label", "Exit fullscreen");
              }
            };

            fullscreen.addEventListener("click", handleFullscreenClick);
            addCleanup(() => fullscreen.removeEventListener("click", handleFullscreenClick));
          }

          if (provider === "youtube" && iframe instanceof HTMLIFrameElement) {
            loadYouTubeApi().then((YT) => {
              if (!document.contains(player)) {
                return;
              }

              youtubePlayer = new YT.Player(iframe, {
                events: {
                  onReady: () => {
                    updateDuration();
                    updateProgress();
                    setVolume(currentVolume);
                  },
                  onStateChange: (event) => {
                    setPlaying(event.data === YT.PlayerState.PLAYING);
                    updateDuration();
                    updateProgress();
                  }
                }
              });

              addCleanup(() => youtubePlayer?.destroy?.());
            });
          } else if (video instanceof HTMLVideoElement) {
            const handlePlay = () => setPlaying(true);
            const handlePause = () => setPlaying(false);
            const handleEnded = () => setPlaying(false);
            const handleLoadedMetadata = () => {
              updateDuration();
              updateProgress();
            };
            const handleLoadedData = () => {
              updateDuration();
              updateProgress();
            };
            const handleCanPlay = () => {
              updateDuration();
              updateProgress();
            };
            const handleVolumeChange = () => {
              currentVolume = video.volume;
              isMuted = video.muted;
              updateMute();
            };

            video.addEventListener("play", handlePlay);
            video.addEventListener("pause", handlePause);
            video.addEventListener("ended", handleEnded);
            video.addEventListener("loadedmetadata", handleLoadedMetadata);
            video.addEventListener("loadeddata", handleLoadedData);
            video.addEventListener("canplay", handleCanPlay);
            video.addEventListener("timeupdate", updateProgress);
            video.addEventListener("volumechange", handleVolumeChange);

            addCleanup(() => {
              video.pause();
              video.removeEventListener("play", handlePlay);
              video.removeEventListener("pause", handlePause);
              video.removeEventListener("ended", handleEnded);
              video.removeEventListener("loadedmetadata", handleLoadedMetadata);
              video.removeEventListener("loadeddata", handleLoadedData);
              video.removeEventListener("canplay", handleCanPlay);
              video.removeEventListener("timeupdate", updateProgress);
              video.removeEventListener("volumechange", handleVolumeChange);
            });

            primeVideoMetadata();
            window.requestAnimationFrame(primeVideoMetadata);
          }

          setRangeFill(progress, 0);
          if (volume instanceof HTMLInputElement) {
            setRangeFill(volume, 100);
          }
          updateToggle();
          updateMute();
          updateDuration();
          updateProgress();

          window.__videoPlayerCleanups.set(player, () => {
            window.cancelAnimationFrame(progressFrame);
            cleanupCallbacks.forEach((callback) => callback());
            player.dataset.videoBound = "false";
          });
        });
      };

      document.addEventListener("astro:page-load", window.__initVideoPlayers);
      document.addEventListener("astro:before-swap", () => {
        window.__videoPlayerCleanups?.forEach((cleanup) => cleanup());
        window.__videoPlayerCleanups?.clear();
      });
    }

    window.__initVideoPlayers();
  })();
<\/script>`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/article-sections/VideoSection.astro", void 0);
//#endregion
//#region src/components/ArticleLayout.astro
createAstro("https://astro.build");
var $$ArticleLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleLayout;
	const { article, draftMode = false } = Astro.props;
	const { citationMap, citations } = extractArticleCitations(article.contentSections);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${cleanString(article.title)} | Everything but the Exhibition`,
		"description": cleanString(article.excerpt || article.subtitle || article.title),
		"bodyClass": getArticleCategoryClass(article)
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="site-shell">${renderComponent($$result, "ArticleHeader", $$ArticleHeader, { "article": article })}<main class="article-page"><div class="article-grid"><aside class="article-sidebar">${renderComponent($$result, "ArticleMeta", $$ArticleMeta, {
		"article": article,
		"citations": citations
	})}</aside><div class="article-stream">${article.contentSections.map((section) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${section._type === "richTextSection" && renderTemplate`${renderComponent($$result, "RichTextSection", $$RichTextSection, {
		"section": section,
		"citationMap": citationMap,
		"article": article
	})}`}${section._type === "pullQuoteSection" && renderTemplate`${renderComponent($$result, "PullQuoteSection", $$PullQuoteSection, {
		"section": section,
		"article": article
	})}`}${section._type === "shareClippingSection" && renderTemplate`${renderComponent($$result, "ShareClippingSection", $$ShareClippingSection, { "section": section })}`}${section._type === "featureCardSection" && renderTemplate`${renderComponent($$result, "FeatureCardSection", $$FeatureCardSection, { "section": section })}`}${section._type === "imageSection" && renderTemplate`${renderComponent($$result, "ImageSection", $$ImageSection, { "section": section })}`}${section._type === "audioPlayerSection" && renderTemplate`${renderComponent($$result, "AudioPlayerSection", $$AudioPlayerSection, { "section": section })}`}${section._type === "videoSection" && renderTemplate`${renderComponent($$result, "VideoSection", $$VideoSection, { "section": section })}`}${section._type === "commentsSection" && renderTemplate`${renderComponent($$result, "CommentsSection", $$CommentsSection, {
		"section": section,
		"article": article
	})}`}${section._type === "dividerSection" && renderTemplate`${renderComponent($$result, "DividerSection", $$DividerSection, { "section": section })}`}` })}`)}</div></div>${article.furtherReading ? renderTemplate`${renderComponent($$result, "RelatedReadingSection", $$RelatedReadingSection, { "section": article.furtherReading })}` : renderTemplate`<p class="back-link-wrap"><a class="back-link" href="/">Back to Index</a></p>`}</main></div>${draftMode && renderTemplate`${renderComponent($$result, "SanityVisualEditing", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/SanityVisualEditing.tsx",
		"client:component-export": "default"
	})}`}${draftMode && renderTemplate`${renderComponent($$result, "DisableDraftMode", null, {
		"client:only": "react",
		"client:component-hydration": "only",
		"client:component-path": "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/DisableDraftMode.tsx",
		"client:component-export": "default"
	})}`}` })}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/components/ArticleLayout.astro", void 0);
//#endregion
//#region src/pages/articles/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug = "" } = Astro.params;
	const draftMode = Boolean(getDraftModeProps(Astro.cookies).perspectiveCookie);
	const article = await loadArticleBySlug(slug, Astro.cookies);
	if (!article) Astro.response.status = 404;
	return renderTemplate`${article ? renderTemplate`${renderComponent($$result, "ArticleLayout", $$ArticleLayout, {
		"article": article,
		"draftMode": draftMode
	})}` : renderTemplate`${maybeRenderHead($$result)}<p>Article not found.</p>`}`;
}, "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/pages/articles/[slug].astro", void 0);
var $$file = "/Users/matthewbradley/Documents/Local Files/Work/Websites/Website Tests/Zeitz MOCAA/src/pages/articles/[slug].astro";
var $$url = "/articles/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/articles/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
