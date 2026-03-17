/**
 * Base URL for template images (default_data / domain_data).
 * Images are served by /api/image since they live outside public/.
 * Override with NEXT_PUBLIC_IMAGE_BASE if you use a CDN or different origin.
 */
export const IMAGE_BASE =
  process.env.NEXT_PUBLIC_IMAGE_BASE ?? "/api/image";
