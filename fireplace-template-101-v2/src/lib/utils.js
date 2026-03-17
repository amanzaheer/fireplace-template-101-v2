import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Slug from title for URLs (e.g. "Service Name" → "service-name") */
export function sanitizeUrl(text) {
  return text
    ?.normalize("NFKC")
    ?.toLowerCase()
    ?.replace(/[\u2013\u2014]/g, "-")
    ?.replaceAll(" - ", "-")
    ?.replaceAll(" | ", "-")
    ?.replaceAll(" ", "-")
    ?.replaceAll(":", "")
    ?.replaceAll("/", "-")
    ?.replaceAll("?", "")
    ?? "";
}
