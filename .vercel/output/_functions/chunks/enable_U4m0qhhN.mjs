import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as sanityClient } from "./_sanity_client_CP4pqz5_.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
//#region src/pages/api/draft-mode/enable.ts
var enable_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
function setPerspectiveCookie(requestUrl, cookies, perspective) {
	cookies.set(perspectiveCookieName, perspective, {
		httpOnly: false,
		sameSite: requestUrl.startsWith("https://") ? "none" : "lax",
		secure: requestUrl.startsWith("https://"),
		path: "/"
	});
}
var GET = async ({ request, cookies, redirect }) => {
	const clientWithToken = sanityClient.withConfig({ token: "sk7YTZiAwjdMBIuQE6sjI3xOnAEuhXHJ3AudQIXDe9eGakmUDzg2eOIrg272jFm7D1gE2cbEMCVhqpo3iApiam5C0LfmyHHO5TrelKPdDH4ZBjuSumiE38IfZ277Fggv0Q2QagzxHwpi9LTvw9a9jCYQD6AAWXFyC9HTZDE7Vq8KEXGYZEVZ" });
	new URL(request.url).searchParams.has("sanity-preview-secret");
	const { isValid, redirectTo = "/", studioPreviewPerspective } = await validatePreviewUrl(clientWithToken, request.url);
	if (!isValid) return new Response("Invalid secret", { status: 401 });
	setPerspectiveCookie(request.url, cookies, studioPreviewPerspective ?? "drafts");
	return redirect(redirectTo, 307);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/draft-mode/enable@_@ts
var page = () => enable_exports;
//#endregion
export { page };
