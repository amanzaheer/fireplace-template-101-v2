import { readFile } from "fs/promises";
import { join } from "path";
import { headers } from "next/headers";
import { getDomainId, getTemplateForDomain } from "@/lib/domain-config";
import { datastoreAvailable, dsObjectDownload } from "@/lib/datastore";
import { createRateLimiter } from "@/lib/rate-limit";

const limiter = createRateLimiter({ windowMs: 60_000, max: 120 });

const MIME = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".avif": "image/avif",
};

// DEV ONLY — set USE_LOCAL_IMAGES=true in .env to serve images from disk
const USE_LOCAL_IMAGES = process.env.USE_LOCAL_IMAGES === "true";

function getMime(filePath) {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  return MIME[ext] ?? "application/octet-stream";
}

function imageResponse(buf, contentType, maxAge = 86400) {
  return new Response(buf, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": `public, max-age=${maxAge}, immutable`,
      "Vary": "Accept",
    },
  });
}

async function readLocalTemplateImage(template, relativePath) {
  try {
    const buf = await readFile(
      join(process.cwd(), "default_data", template, "images", relativePath),
    );
    return buf;
  } catch {
    return null;
  }
}

export async function GET(request, context) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const { allowed } = limiter.check(ip);
  if (!allowed) {
    return new Response("Too Many Requests", { status: 429 });
  }

  const params = await context.params;
  const pathSegments = params?.path;
  if (!Array.isArray(pathSegments) || pathSegments.length === 0) {
    return new Response("Not Found", { status: 404 });
  }
  const relativePath = decodeURIComponent(pathSegments.join("/"));
  // Allow filenames like "location slider.png" (space): still block path traversal.
  if (relativePath.includes("..") || !/^[a-zA-Z0-9\-_.\/ ]+$/.test(relativePath)) {
    return new Response("Bad Request", { status: 400 });
  }

  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const domainId = getDomainId(host);
  const template = await getTemplateForDomain(domainId);
  const mime = getMime(relativePath);

  // DEV: bypass datastore and serve from local default_data
  if (USE_LOCAL_IMAGES) {
    const localBuf = await readLocalTemplateImage(template, relativePath);
    if (localBuf) {
      return imageResponse(localBuf, mime, 0); // no cache in dev
    }
    return new Response("Not Found", { status: 404 });
  }

  // PROD: images are managed externally and stored in the datastore Objects API.
  // The external content editor uploads images and updates file_name in the JSON.
  // Resolution order:
  //   1. domain scope  — custom image uploaded for this specific domain
  //   2. default scope — industry default image seeded via seed-datastore.mjs
  if (datastoreAvailable()) {
    for (const scope of [domainId, "default"]) {
      try {
        const result = await dsObjectDownload({
          industry: template,
          domain: scope,
          key: relativePath,
        });
        if (result?.body) {
          return imageResponse(
            result.body,
            result.contentType || mime,
            scope === domainId ? 3600 : 86400,
          );
        }
      } catch {
        // not in this scope, try next
      }
    }
  }

  // Local fallback: helps local/dev environments where datastore isn't seeded.
  const fallbackBuf = await readLocalTemplateImage(template, relativePath);
  if (fallbackBuf) {
    return imageResponse(fallbackBuf, mime, 0);
  }

  return new Response("Not Found", { status: 404 });
}
