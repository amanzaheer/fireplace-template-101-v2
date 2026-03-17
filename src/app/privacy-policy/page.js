import { headers } from "next/headers";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Breadcrumbs1 from "@/components/sections/Breadcrumbs/Breadcrumbs1";
import SectionLayout from "@/components/SectionLayout";

export const dynamic = 'force-dynamic';
import MaintenancePage from "@/components/MaintenancePage";
import { getPageData } from "@/lib/page-data";

const PAGE_CONFIG = {
  sections: {
    Navbar: { visible: true, design: "Navbar1" },
    Content: { visible: true },
    Footer: { visible: true, design: "Footer1" },
  },
  order: ["Navbar", "Content", "Footer"],
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

  const body = privacyData?.content?.body ?? "";
  const html = body ? md.render(body) : "";

  return (
    <SectionLayout domainConfig={PAGE_CONFIG} content={homeData.content}>
      <FullContainer>
        <Container>
          <Breadcrumbs1 content={homeData.content} />
          {html ? (
            <div
              className="prose prose-h2:text-start prose-p:text-lg text-primary max-w-full w-full my-8"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="my-8 text-gray-500">
              Privacy policy content coming soon.
            </p>
          )}
        </Container>
      </FullContainer>
    </SectionLayout>
  );
}
