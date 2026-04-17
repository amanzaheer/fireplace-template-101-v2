/**
 * Shared rules for location URLs (ServiceCities links ↔ [service]/[location] page).
 */

export function slugifyLocationName(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/** Turns a URL segment like `san-antonio` into a display title like `San Antonio`. */
export function titleFromLocationSlug(slug) {
  if (slug == null || slug === "") return "";
  const decoded = decodeURIComponent(String(slug));
  const parts = decoded.split("-").filter(Boolean);
  if (parts.length === 0) return "";
  return parts
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Same segment string used in href paths for a list entry (string or object). */
export function getLocationUrlSegment(city) {
  if (typeof city === "string") {
    return slugifyLocationName(city);
  }
  if (city && typeof city === "object") {
    const explicit = city.path ?? city.locationPath;
    if (explicit != null && String(explicit).trim() !== "") {
      return String(explicit).replace(/^\/+|\/+$/g, "");
    }
    const name = city.name ?? city.title;
    if (name != null) return slugifyLocationName(name);
  }
  return "";
}

/**
 * Find a location list entry that matches the URL [location] segment.
 */
export function findLocationEntryByUrlSegment(list, locationSegment) {
  if (!Array.isArray(list)) return undefined;
  const want = String(locationSegment).toLowerCase();
  return list.find((entry) => {
    const seg = getLocationUrlSegment(entry);
    return seg !== "" && seg.toLowerCase() === want;
  });
}

export function pathSegmentMatchesPath(path, segment) {
  const p = String(path ?? "").replace(/^\/+|\/+$/g, "").toLowerCase();
  const s = String(segment ?? "").replace(/^\/+|\/+$/g, "").toLowerCase();
  return p !== "" && p === s;
}

export function getDefaultServicePath(content) {
  return content?.serviceDetail?.path ?? content?.services?.[0]?.path ?? null;
}

export function getCityLocationHref(content, city) {
  const servicePath = getDefaultServicePath(content);
  if (!servicePath) return null;

  const loc = getLocationUrlSegment(city);
  if (!loc) return null;
  const svc = String(servicePath).replace(/^\/+|\/+$/g, "");
  if (!svc) return null;
  return `/${svc}/${loc}`;
}
