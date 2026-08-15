export type FeatureFlag = "authorsIndex";

const featureFlagEnvVars = {
  authorsIndex: "PUBLIC_ENABLE_AUTHORS_INDEX"
} as const satisfies Record<FeatureFlag, string>;

const enabledValues = new Set(["1", "true", "yes", "on"]);

export function isFeatureEnabled(feature: FeatureFlag) {
  const env = import.meta.env as Record<string, string | boolean | undefined>;
  const value = env[featureFlagEnvVars[feature]];

  if (typeof value === "boolean") {
    return value;
  }

  return enabledValues.has(String(value || "").trim().toLowerCase());
}
