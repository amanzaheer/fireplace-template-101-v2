import { headers } from "next/headers";
import SectionLayout from "@/components/SectionLayout";

export const dynamic = 'force-dynamic';
import MaintenancePage from "@/components/MaintenancePage";
import { getPageConfig, getPageData } from "@/lib/page-data";

const FALLBACK_CONFIG = {
  sections: {
    Navbar: { visible: true, design: "Navbar1" },
    Breadcrumbs: { visible: true, design: "Breadcrumbs1" },
    PrivacyPolicy: { visible: true, design: "privacy-policy2" },
    Footer: { visible: true, design: "Footer1" },
  },
  order: ["Navbar", "Breadcrumbs", "PrivacyPolicy", "Footer"],
};

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const data = await getPageData(host, "privacy");
  if (!data) return { title: "Privacy Policy" };
  const meta = data.content?.meta_data ?? data.content?.meta ?? {};
  return {
    title: meta.title ?? "Privacy Policy",
    description: meta.description || undefined,
  };
}

export default async function PrivacyPolicyPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  // Load privacy content + home content (for Navbar/Footer data)
  const [privacyData, homeData] = await Promise.all([
    getPageData(host, "privacy"),
    getPageData(host, "home"),
  ]);

  if (!homeData) return <MaintenancePage />;

  const domainConfig = await getPageConfig(host, "privacy");
  const config = domainConfig ?? FALLBACK_CONFIG;

  // Merge privacy content at the root so PrivacyPolicy components can read `content.body`.
  const mergedContent = {
    ...homeData.content,
    ...(privacyData?.content ?? {}),
  };

  return (
    <SectionLayout domainConfig={config} content={mergedContent} />
  );
}
