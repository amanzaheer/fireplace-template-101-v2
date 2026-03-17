import { getDomainId, getTemplateForDomain } from './domain-config';
import { dsContentRetrieve, datastoreAvailable } from './datastore';

// ---------------------------------------------------------------------------
// Tag resolution
// ---------------------------------------------------------------------------

/**
 * Resolves all [key] tokens in a content object in a single recursive pass.
 *
 * Every tag uses the [key] format — domain variables and runtime tokens
 * (e.g. [service], [city_name]). Unrecognised tokens are left as-is.
 */
export function resolveAllTags(obj, vars) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') {
    return obj.replace(/\[([^\]]+)\]/g, (match, key) =>
      vars[key] !== undefined && vars[key] !== null ? String(vars[key]) : match
    );
  }
  if (Array.isArray(obj)) return obj.map((item) => resolveAllTags(item, vars));
  if (typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = resolveAllTags(obj[k], vars);
    }
    return out;
  }
  return obj;
}

// ---------------------------------------------------------------------------
// Shared internal helpers
// ---------------------------------------------------------------------------

// ── DEV ONLY: local-file bypass ──────────────────────────────────────────────
// When USE_LOCAL_DATA=true in .env, all content is read from default_data/
// instead of the datastore. Remove this block (and the flag) when done testing.
async function localFileRetrieve(industry, filename) {
  const projectRoot = process.cwd();
  // Datastore uses -- as path separator; convert to / for local filesystem
  const localPath = filename.replace(/--/g, '/');
  return readJsonFile(join(projectRoot, 'default_data', industry, localPath));
}
const USE_LOCAL_DATA = process.env.USE_LOCAL_DATA === 'true';
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a file from the datastore with a two-scope fallback:
 *   1. domain-specific scope  (domainId)
 *   2. "default" scope        (industry-level defaults stored under "default")
 *
 * Returns the parsed object, or null if neither scope has the file or the
 * datastore is unavailable.
 */
async function dsRetrieveWithDefault(industry, domainId, filename) {
  // DEV ONLY — bypass datastore and read from default_data/ instead
  if (USE_LOCAL_DATA) return localFileRetrieve(industry, filename);

  if (!datastoreAvailable()) return null;

  // 1 — domain-specific
  const domainData = await dsContentRetrieve({ industry, domain: domainId, filename });
  if (domainData) return domainData;

  // 2 — "default" scope (skip if we're already querying default)
  if (domainId !== 'default') {
    const defaultData = await dsContentRetrieve({ industry, domain: 'default', filename });
    if (defaultData) return defaultData;
  }

  return null;
}

/**
 * Resolves the template name and loads domainData (placeholders.json).
 *
 * Tries: datastore(domainId) → datastore("default")
 * Returns null if neither has the file — callers must handle null as "not ready".
 *
 * Returns { template, domainData } | null.
 */
async function loadDomainData(domainId) {
  const template = await getTemplateForDomain(domainId);
  const remote = await dsRetrieveWithDefault(template, domainId, 'config--placeholders.json');
  if (!remote) return null;
  return { template: remote.industry ?? template, domainData: remote };
}

/**
 * Loads layouts.json from local files only.
 * Layout config is intentionally NOT fetched from the datastore — it is always
 * read from local files so layout changes can be deployed without a datastore update.
 */
import { join } from 'path';
import { readJsonFile } from './domain-config';

async function loadSectionsConfig(domainId, template) {
  const projectRoot = process.cwd();
  const paths = [
    join(projectRoot, 'domain_data', domainId, 'config', 'layouts.json'),
    join(projectRoot, 'default_data', template, 'config', 'layouts.json'),
  ];
  for (const p of paths) {
    const data = await readJsonFile(p);
    if (data) return data;
  }
  return { sections: {}, order: [] };
}

/** Extracts the domainConfig for a specific pageId from a raw sections config. */
function extractPageConfig(configRaw, pageId) {
  if (pageId && configRaw.pages?.[pageId]) {
    return {
      sections: configRaw.pages[pageId].sections ?? {},
      order: configRaw.pages[pageId].order ?? [],
    };
  }
  return {
    sections: configRaw.sections ?? {},
    order: configRaw.order ?? [],
  };
}

// ---------------------------------------------------------------------------
// Deep merge helper
// ---------------------------------------------------------------------------

/** Recursively merges src into dst. Arrays and primitives in src replace dst. */
function deepMerge(dst, src) {
  if (!src || typeof src !== 'object' || Array.isArray(src)) return src ?? dst;
  const out = { ...dst };
  for (const key of Object.keys(src)) {
    if (
      src[key] !== null &&
      typeof src[key] === 'object' &&
      !Array.isArray(src[key]) &&
      dst[key] !== null &&
      typeof dst[key] === 'object' &&
      !Array.isArray(dst[key])
    ) {
      out[key] = deepMerge(dst[key], src[key]);
    } else {
      out[key] = src[key];
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// getPageConfig — section layout config only (no content, no tag replacement)
// ---------------------------------------------------------------------------

/**
 * Returns only the domainConfig (sections + order) for a given page.
 * Use this when content is loaded separately (e.g. service pages via getServiceData).
 * Returns null if domain data is not available in the datastore.
 */
export async function getPageConfig(host, pageId) {
  const domainId = getDomainId(host);
  const domainResult = await loadDomainData(domainId);
  if (!domainResult) return null;
  const configRaw = await loadSectionsConfig(domainId, domainResult.template);
  return extractPageConfig(configRaw, pageId);
}

// ---------------------------------------------------------------------------
// getPageData — home, about, contact, any static page
// ---------------------------------------------------------------------------

/**
 * Loads content + section config for any static page.
 *
 * Returns null if the domain has no data in the datastore — the page component
 * must render <MaintenancePage /> in that case.
 *
 * All [tag] values in the returned content are fully resolved using domainData.
 * Pass extraVars to inject additional runtime tokens alongside domainData vars.
 *
 * Do NOT use this for service pages — use getServiceData() + getPageConfig() instead.
 */
export async function getPageData(host, pageId, options = {}) {
  const { domainDataOnly = false, extraVars = {} } = options;
  const domainId = getDomainId(host);
  const domainResult = await loadDomainData(domainId);

  // Domain not configured in datastore — signal maintenance mode
  if (!domainResult) return null;

  const { template, domainData } = domainResult;

  if (domainDataOnly) return { domainData };

  const configRaw = await loadSectionsConfig(domainId, template);
  const domainConfig = extractPageConfig(configRaw, pageId);

  // Content: datastore(domainId) → datastore("default") → null (no local fallback)
  let content = null;
  if (pageId) {
    const remote = await dsRetrieveWithDefault(template, domainId, `content--${pageId}--data.json`);
    if (remote && Object.keys(remote).length > 0) content = remote;
  }

  const vars = { ...domainData, ...extraVars };
  content = resolveAllTags(content, vars);

  return { domainData, domainConfig, content };
}

// ---------------------------------------------------------------------------
// getServiceData — service pages (3-layer merge + full tag resolution)
// ---------------------------------------------------------------------------

/**
 * Loads and merges content for a service page.
 *
 * Returns null if the domain has no data in the datastore.
 *
 * Layer order (later wins):
 *   1. Shared service defaults  →  "service.json"
 *   2. Per-service overrides    →  "services/<slug>.json"  (optional)
 *
 * Each layer: datastore(domainId) → datastore("default") — no local fallback.
 */
export async function getServiceData(host, serviceSlug, serviceTitle = '') {
  const domainId = getDomainId(host);
  const domainResult = await loadDomainData(domainId);

  // Domain not configured in datastore — signal maintenance mode
  if (!domainResult) return null;

  const { template, domainData } = domainResult;

  // Layer 1 — shared service defaults
  const sharedDefaults =
    (await dsRetrieveWithDefault(template, domainId, 'content--service--data.json')) ?? {};

  // Layer 2 — per-service overrides (optional, {} if not found)
  const serviceOverrides =
    (await dsRetrieveWithDefault(template, domainId, `content--services--${serviceSlug}.json`)) ?? {};

  const merged = deepMerge(sharedDefaults, serviceOverrides);
  const vars = { ...domainData, service: serviceTitle };
  return resolveAllTags(merged, vars);
}
