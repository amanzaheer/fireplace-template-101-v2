/**
 * Validates required environment variables at import time.
 * Import this module in layout.js or next.config to get early warnings.
 */

const warnings = [];

if (!process.env.DATASTORE_API_KEY && process.env.USE_LOCAL_DATA !== "true") {
  warnings.push(
    "DATASTORE_API_KEY is not set. The app will fall back to local default_data files."
  );
}

if (!process.env.DEFAULT_DOMAIN_ID) {
  warnings.push(
    "DEFAULT_DOMAIN_ID is not set. Defaulting to 'default' for local/dev requests."
  );
}

if (warnings.length > 0) {
  console.warn(
    `\n⚠️  Environment warnings:\n${warnings.map((w) => `   - ${w}`).join("\n")}\n`
  );
}
