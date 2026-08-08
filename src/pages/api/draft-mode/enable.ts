import type { APIRoute } from "astro";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import { sanityClient } from "sanity:client";

function setPerspectiveCookie(requestUrl: string, cookies: APIRoute["cookies"], perspective: string) {
  cookies.set(perspectiveCookieName, perspective, {
    httpOnly: false,
    sameSite: requestUrl.startsWith("https://") ? "none" : "lax",
    secure: requestUrl.startsWith("https://"),
    path: "/"
  });
}

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (!token) {
    return new Response("Missing SANITY_API_READ_TOKEN. Add a Sanity Viewer token in .env to enable Visual Editing.", {
      status: 400
    });
  }

  const clientWithToken = sanityClient.withConfig({ token });

  const url = new URL(request.url);
  const hasSecret = url.searchParams.has("sanity-preview-secret");

  // Local dev convenience: allow entering draft mode without the signed preview secret.
  if (!hasSecret && import.meta.env.DEV && ["localhost", "127.0.0.1"].includes(url.hostname)) {
    setPerspectiveCookie(request.url, cookies, "drafts");
    const redirectTo = url.searchParams.get("redirectTo") || "/";
    return redirect(redirectTo, 307);
  }

  const {
    isValid,
    redirectTo = "/",
    studioPreviewPerspective
  } = await validatePreviewUrl(clientWithToken, request.url);

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  setPerspectiveCookie(request.url, cookies, studioPreviewPerspective ?? "drafts");

  return redirect(redirectTo, 307);
};
