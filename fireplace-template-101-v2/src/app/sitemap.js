import { headers } from "next/headers";
import { getPageData } from "@/lib/page-data";

export default async function sitemap() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const entries = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  try {
    const data = await getPageData(host, "home");
    const services = data?.content?.services ?? [];
    for (const svc of services) {
      if (svc.path) {
        entries.push({
          url: `${baseUrl}${svc.path}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // If data loading fails, return static entries only
  }

  return entries;
}
