import { readFile } from 'fs/promises';
import { join } from 'path';

const DEFAULT_DOMAIN_ID = process.env.DEFAULT_DOMAIN_ID || 'default';

const DEV_HOST_PATTERNS = [
  'localhost',
  '127.0.0.1',
  'vercel',
  'amplifyapp.com',
  'amplifytest',
];

function isDevHost(host) {
  if (!host) return true;
  const h = host.toLowerCase();
  return DEV_HOST_PATTERNS.some((pattern) => h.includes(pattern));
}

function hostToDomainId(host) {
  return host
    .replace(/\s+/g, '')
    .replace(/^https?:\/\//, '')
    .replace(/:\d+$/, '')
    .replace(/^www\./, '')
    .toLowerCase()
    .replace(/\./g, '-');
}

/**
 * Strips protocol, port, and www from a host to get the bare domain string.
 * "www.fireplace-built.top:3000" → "fireplace-built.top"
 * Used for the [domain] placeholder — preserves hyphens in the domain name.
 */
export function hostToDomain(host) {
  return host
    .replace(/\s+/g, '')
    .replace(/^https?:\/\//, '')
    .replace(/:\d+$/, '')
    .replace(/^www\./, '')
    .toLowerCase();
}

export function getDomainId(host) {
  if (!host || isDevHost(host)) return DEFAULT_DOMAIN_ID;
  return hostToDomainId(host);
}

/** Reads and parses a JSON file. Returns null on any error. */
export async function readJsonFile(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Resolves the industry template for a domain.
 * Checks placeholders.json first; falls back to 'fireplace'.
 */
export async function getTemplateForDomain(domainId) {
  const projectRoot = process.cwd();
  const data = await readJsonFile(
    join(projectRoot, 'domain_data', domainId, 'config', 'placeholders.json')
  );
  return data?.industry ?? 'fireplace';
}
