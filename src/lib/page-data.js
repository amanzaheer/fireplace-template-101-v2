import { readdir } from 'fs/promises';
import { join } from 'path';
import { getDomainId, getTemplateForDomain, readJsonFile } from './domain-config';
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

// ── Local files (USE_LOCAL_DATA or missing DATASTORE_API_KEY) ─────────────
// Mirrors datastore layout: default_data/{DATASTORE_PROJECT}/{industry}/{scope}/...
// Legacy: default_data/{industry}/... (flat industry tree)
const USE_LOCAL_DATA = process.env.USE_LOCAL_DATA === 'true';

function getLocalDataProjectSlug() {
  return process.env.DATASTORE_PROJECT || 'test-template-v1';
}

async function localContentRetrieve(industry, scope, filename) {
  const projectRoot = process.cwd();
  const relPath = filename.replace(/--/g, '/');
  const base = join(
    projectRoot,
    'default_data',
    getLocalDataProjectSlug(),
    industry,
    scope,
    relPath,
  );
  return readJsonFile(base);
}

/**
 * When domainId is `default` but there is no `default/` scope folder, pick the first
 * domain-named directory under default_data/{project}/{industry}/.
 */
async function tryFirstLocalDomainScope(industry, filename) {
  const projectRoot = process.cwd();
  const baseDir = join(projectRoot, 'default_data', getLocalDataProjectSlug(), industry);
  let entries;
  try {
    entries = await readdir(baseDir, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const ent of entries) {
    if (!ent.isDirectory() || ent.name === 'default') continue;
    const hit = await localContentRetrieve(industry, ent.name, filename);
    if (hit) return hit;
  }
  return null;
}

async function localFileRetrieveWithFallback(industry, domainId, filename) {
  const specific = await localContentRetrieve(industry, domainId, filename);
  if (specific) return specific;
  if (domainId !== 'default') {
    const fallback = await localContentRetrieve(industry, 'default', filename);
    if (fallback) return fallback;
  }
  const projectRoot = process.cwd();
  const relPath = filename.replace(/--/g, '/');
  const legacy = await readJsonFile(join(projectRoot, 'default_data', industry, relPath));
  if (legacy) return legacy;
  if (domainId === 'default') {
    const discovered = await tryFirstLocalDomainScope(industry, filename);
    if (discovered) return discovered;
  }
  return null;
}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a file from the datastore with a two-scope fallback:
 *   1. domain-specific scope  (domainId)
 *   2. "default" scope        (industry-level defaults stored under "default")
 *
 * When USE_LOCAL_DATA is true, reads from local default_data (project/industry/scope layout).
 * When the API key is missing, falls back to the same local layout (see env.js warning).
 * When the datastore is configured and USE_LOCAL_DATA is false, returns null if the key
 * is missing in both scopes — no silent read from disk.
 */
export async function dsRetrieveWithDefault(industry, domainId, filename) {
  if (USE_LOCAL_DATA) return localFileRetrieveWithFallback(industry, domainId, filename);

  if (datastoreAvailable()) {
    const domainData = await dsContentRetrieve({ industry, domain: domainId, filename });
    if (domainData) return domainData;

    if (domainId !== 'default') {
      const defaultData = await dsContentRetrieve({ industry, domain: 'default', filename });
      if (defaultData) return defaultData;
    }

    return null;
  }

  return localFileRetrieveWithFallback(industry, domainId, filename);
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
 * Loads section layout config (layouts.json).
 *
 * When USE_LOCAL_DATA is false and DATASTORE_API_KEY is set:
 *   1) datastore: config--layouts.json (domain scope → default scope)
 *   2) empty { sections: {}, order: [] } if missing
 *
 * Otherwise (local mode or no API key): same path fallbacks as national-template-101.
 */
async function loadSectionsConfig(domainId, template) {
  if (!USE_LOCAL_DATA && datastoreAvailable()) {
    const remote = await dsRetrieveWithDefault(template, domainId, 'config--layouts.json');
    if (remote) return remote;
    return { sections: {}, order: [] };
  }

  const projectRoot = process.cwd();
  const industry = template;
  const projectSlug = getLocalDataProjectSlug();
  const paths = [
    join(projectRoot, 'domain_data', domainId, 'config', 'layouts.json'),
    join(projectRoot, 'default_data', projectSlug, industry, domainId, 'config', 'layouts.json'),
  ];
  if (domainId !== 'default') {
    paths.push(
      join(projectRoot, 'default_data', projectSlug, industry, 'default', 'config', 'layouts.json'),
    );
  }
  paths.push(join(projectRoot, 'default_data', industry, 'config', 'layouts.json'));
  for (const p of paths) {
    const data = await readJsonFile(p);
    if (data) return data;
  }
  return { sections: {}, order: [] };
}

/** Extracts the domainConfig for a specific pageId from a raw sections config. */
function extractPageConfig(configRaw, pageId) {
  const font = configRaw.font ?? null;
  if (pageId && configRaw.pages?.[pageId]) {
    return {
      colors: configRaw.colors ?? {},
      font,
      sections: configRaw.pages[pageId].sections ?? {},
      order: configRaw.pages[pageId].order ?? [],
    };
  }
  if (pageId && configRaw?.[pageId]) {
    return {
      colors: configRaw.colors ?? {},
      font,
      sections: configRaw[pageId].sections ?? {},
      order: configRaw[pageId].order ?? [],
    };
  }
  return {
    colors: configRaw.colors ?? {},
    font,
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

  // Content: datastore(domainId) → datastore("default") → null when API configured
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
