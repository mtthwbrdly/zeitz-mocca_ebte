import { s as cleanString } from "./queries_BGwuiVKX.mjs";
//#region src/sanity/lib/calculateReadTime.ts
var WORDS_PER_MINUTE = 220;
function countWords(value = "") {
	if (typeof value !== "string") return 0;
	const normalized = cleanString(value).trim();
	if (!normalized) return 0;
	return normalized.split(/\s+/).length;
}
function portableTextWordCount(blocks = []) {
	return blocks.reduce((total, block) => {
		return total + countWords((block.children || []).map((child) => child.text || "").join(" "));
	}, 0);
}
function sectionWordCount(section) {
	switch (section._type) {
		case "richTextSection": return portableTextWordCount(section.body);
		case "pullQuoteSection": return countWords(section.quote) + countWords(section.attribution);
		case "shareClippingSection": return countWords(section.quote) + countWords(section.label);
		case "featureCardSection": return countWords(section.eyebrow) + countWords(section.title) + countWords(section.description) + countWords(section.linkText);
		case "imageSection": return countWords(section.image?.caption) + countWords(section.image?.alt);
		default: return 0;
	}
}
function calculateReadTime(article) {
	const totalWords = countWords(cleanString(article.title)) + countWords(cleanString(article.subtitle)) + countWords(cleanString(article.excerpt)) + (article.contentSections || []).reduce((total, section) => total + sectionWordCount(section), 0);
	return `${Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE))} min`;
}
//#endregion
//#region src/sanity/lib/pullQuotes.ts
var PULL_QUOTE_MARK = "pullQuote";
var CONTEXT_RADIUS = 110;
function normalizeQuotedRange(text, startOffset, endOffset) {
	const rawQuote = text.slice(startOffset, endOffset);
	const leadingWhitespace = rawQuote.length - rawQuote.trimStart().length;
	const trailingWhitespace = rawQuote.length - rawQuote.trimEnd().length;
	const normalizedStart = startOffset + leadingWhitespace;
	const normalizedEnd = endOffset - trailingWhitespace;
	return {
		normalizedEnd,
		normalizedStart,
		quote: text.slice(normalizedStart, normalizedEnd).trim()
	};
}
function buildContextSnippet(text, startOffset, endOffset) {
	const excerptStart = Math.max(0, startOffset - CONTEXT_RADIUS);
	const excerptEnd = Math.min(text.length, endOffset + CONTEXT_RADIUS);
	const before = text.slice(excerptStart, startOffset).trimStart();
	return {
		contextAfter: `${text.slice(endOffset, excerptEnd).trimEnd()}${excerptEnd < text.length ? "…" : ""}`,
		contextBefore: `${excerptStart > 0 ? "…" : ""}${before}`
	};
}
function createTargetId(block, blockIndex, runIndex) {
	return `pull-quote-target-${block._key ? block._key.replace(/[^a-zA-Z0-9_-]/g, "") : `block-${blockIndex}`}-${runIndex}`;
}
function extractPullQuoteRuns(blocks = []) {
	const runs = [];
	blocks.forEach((block, blockIndex) => {
		const children = block.children || [];
		const blockText = children.map((child) => child.text || "").join("");
		let cursor = 0;
		let runIndex = 0;
		let currentRunChildren = [];
		let currentRunStartChildIndex = 0;
		let currentRunStartOffset = 0;
		const flushCurrentRun = (endChildIndex, runEndOffset) => {
			if (currentRunChildren.length === 0) return;
			const { normalizedEnd, normalizedStart, quote } = normalizeQuotedRange(blockText, currentRunStartOffset, runEndOffset);
			currentRunChildren = [];
			if (!quote) return;
			const { contextAfter, contextBefore } = buildContextSnippet(blockText, normalizedStart, normalizedEnd);
			runs.push({
				blockIndex,
				contextAfter,
				contextBefore,
				endChildIndex,
				quote,
				startChildIndex: currentRunStartChildIndex,
				targetId: createTargetId(block, blockIndex, runIndex)
			});
			runIndex += 1;
		};
		children.forEach((child, childIndex) => {
			const childText = child.text || "";
			const hasPullQuote = child.marks?.includes(PULL_QUOTE_MARK);
			if (hasPullQuote && currentRunChildren.length === 0) {
				currentRunStartChildIndex = childIndex;
				currentRunStartOffset = cursor;
			}
			if (hasPullQuote) currentRunChildren.push(child);
			if (!hasPullQuote && currentRunChildren.length > 0) flushCurrentRun(childIndex, cursor);
			cursor += childText.length;
		});
		if (currentRunChildren.length > 0) flushCurrentRun(children.length, cursor);
	});
	return runs;
}
//#endregion
//#region src/sanity/lib/renderPortableText.ts
var escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
function wrapMarks(text, marks = [], markDefs = [], citationMap = {}) {
	return marks.reduce((output, mark) => {
		if (mark === "strong") return `<strong>${output}</strong>`;
		if (mark === "em") return `<em>${output}</em>`;
		if (mark === "code") return `<code>${output}</code>`;
		if (mark === "underline") return `<span class="u-underline">${output}</span>`;
		if (mark === "highlight") return `<span class="u-highlight">${output}</span>`;
		if (mark === "pullQuote") return output;
		const definition = markDefs.find((item) => item._key === mark);
		if (definition?._type === "link") return `<a href="${escapeHtml(cleanString(definition.href))}" target="_blank" rel="noreferrer">${output}</a>`;
		if (definition?._type === "citation") {
			const citation = citationMap[definition._key];
			if (!citation) return output;
			return `<span class="u-citation-target">${output}<sup class="u-citation-ref"><button id="${escapeHtml(citation.targetId)}" type="button" aria-label="Show citation ${citation.number}" data-citation-number="${citation.number}" data-citation-inline data-citation-panel-link>[${citation.number}]</button></sup></span>`;
		}
		return output;
	}, text);
}
function renderChildren(children, markDefs = [], pullQuoteRuns = [], citationMap = {}) {
	const output = [];
	let childIndex = 0;
	while (childIndex < children.length) {
		const pullQuoteRun = pullQuoteRuns.find((item) => item.startChildIndex === childIndex);
		if (pullQuoteRun) {
			const quotedHtml = children.slice(pullQuoteRun.startChildIndex, pullQuoteRun.endChildIndex).map((child) => wrapMarks(escapeHtml(child.text), (child.marks || []).filter((mark) => mark !== PULL_QUOTE_MARK), markDefs, citationMap)).join("");
			output.push(`<span class="u-pull-quote-target" id="${escapeHtml(pullQuoteRun.targetId)}" tabindex="-1">${quotedHtml}</span>`);
			childIndex = pullQuoteRun.endChildIndex;
			continue;
		}
		const child = children[childIndex];
		output.push(wrapMarks(escapeHtml(child.text), (child.marks || []).filter((mark) => mark !== PULL_QUOTE_MARK), markDefs, citationMap));
		childIndex += 1;
	}
	return output.join("");
}
function blockTag(style = "normal") {
	const cleanStyle = cleanString(style);
	if (cleanStyle === "h2") return "h2";
	if (cleanStyle === "h3") return "h3";
	if (cleanStyle === "blockquote") return "blockquote";
	return "p";
}
function renderList(blocks, type, citationMap = {}) {
	const tag = type === "number" ? "ol" : "ul";
	return `<${tag}>${blocks.map(({ block, pullQuoteRuns }) => `<li>${renderChildren(block.children, block.markDefs, pullQuoteRuns, citationMap)}</li>`).join("")}</${tag}>`;
}
function renderPortableText(blocks = [], citationMap = {}) {
	const pullQuoteRuns = extractPullQuoteRuns(blocks);
	const output = [];
	for (let index = 0; index < blocks.length; index += 1) {
		const block = blocks[index];
		const blockRuns = pullQuoteRuns.filter((item) => item.blockIndex === index);
		const listItem = cleanString(block.listItem);
		if (listItem === "bullet" || listItem === "number") {
			const listGroup = [{
				block,
				pullQuoteRuns: blockRuns
			}];
			while (index + 1 < blocks.length && cleanString(blocks[index + 1].listItem) === listItem) {
				index += 1;
				listGroup.push({
					block: blocks[index],
					pullQuoteRuns: pullQuoteRuns.filter((item) => item.blockIndex === index)
				});
			}
			output.push(renderList(listGroup, listItem, citationMap));
			continue;
		}
		const tag = blockTag(block.style);
		output.push(`<${tag}>${renderChildren(block.children, block.markDefs, blockRuns, citationMap)}</${tag}>`);
	}
	return output.join("");
}
//#endregion
export { extractPullQuoteRuns as n, calculateReadTime as r, renderPortableText as t };
