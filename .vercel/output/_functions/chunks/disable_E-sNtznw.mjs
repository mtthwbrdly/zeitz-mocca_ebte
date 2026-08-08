import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
//#region src/pages/api/draft-mode/disable.ts
var disable_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ cookies, redirect }) => {
	cookies.delete(perspectiveCookieName, { path: "/" });
	return redirect("/", 307);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/draft-mode/disable@_@ts
var page = () => disable_exports;
//#endregion
export { page };
