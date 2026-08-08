import type { AstroCookies } from "astro";
import { getDraftModeProps } from "./draft-mode";
import { loadQuery } from "./load-query";
import { homePageQuery } from "./queries";
import type { HomePage } from "./types";

const fallbackHomePage: HomePage = {
  _id: "homePage",
  title: "Home Page",
  seoDescription: "Recent articles from Everything but the Exhibition.",
  headerTitle: "Everything but the Exhibition",
  sections: [
    {
      _key: "latest-articles",
      _type: "articleIndexSection",
      title: "Latest",
      categoryFilter: "all"
    }
  ]
};

export async function loadHomePage(cookies: AstroCookies): Promise<HomePage> {
  try {
    const response = await loadQuery<HomePage>({
      query: homePageQuery,
      ...getDraftModeProps(cookies)
    });

    return response.data?.sections?.length ? response.data : fallbackHomePage;
  } catch (error) {
    console.error("Sanity home page fetch failed, falling back to default home page.", error);
    return fallbackHomePage;
  }
}
