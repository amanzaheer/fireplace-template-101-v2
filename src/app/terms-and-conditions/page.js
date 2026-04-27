import { headers } from "next/headers";
import SectionLayout from "@/components/SectionLayout";

export const dynamic = 'force-dynamic';
import MaintenancePage from "@/components/MaintenancePage";
import { getPageConfig, getPageData } from "@/lib/page-data";

const FALLBACK_CONFIG = {
  sections: {
    Navbar: { visible: true, design: "Navbar1" },
    Breadcrumbs: { visible: true, design: "Breadcrumbs1" },
    TermsAndConditions: {
      visible: true,
      design: "terms-and-conditions2",
    },
    Footer: { visible: true, design: "Footer1" },
  },
  order: ["Navbar", "Breadcrumbs", "TermsAndConditions", "Footer"],
};

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const data = await getPageData(host, "terms");
  if (!data) return { title: "Terms and Conditions" };
  const meta = data.content?.meta_data ?? data.content?.meta ?? {};
  return {
    title: meta.title ?? "Terms and Conditions",
    description: meta.description || undefined,
  };
}

export default async function TermsAndConditionsPage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  // Load terms content + home content (for Navbar/Footer data)
  const [termsData, homeData] = await Promise.all([
    getPageData(host, "terms"),
    getPageData(host, "home"),
  ]);

  if (!homeData) return <MaintenancePage />;

  const domainConfig = await getPageConfig(host, "terms");
  const config = domainConfig ?? FALLBACK_CONFIG;

  // Merge terms content at the root so TermsAndConditions components can read `content.body`.
  const mergedContent = {
    ...homeData.content,
    ...(termsData?.content ?? {}),
  };

  return (
    <SectionLayout domainConfig={config} content={mergedContent} />
  );
}
