import { createClient } from "@sanity/client";
//#region \0sanity:client
var sanityClient = createClient({
	"apiVersion": "2026-07-09",
	"projectId": "p7t0rr17",
	"dataset": "production",
	"useCdn": false,
	"stega": { "studioUrl": "http://localhost:4321/studio" }
});
//#endregion
export { sanityClient as t };
