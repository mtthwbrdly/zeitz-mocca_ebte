import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "p7t0rr17",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production"
  },
  deployment: {
    autoUpdates: true
  }
});
