import { headers } from "next/headers";
import SectionLayout from "@/components/SectionLayout";
import MaintenancePage from "@/components/MaintenancePage";
import { getPageData } from "@/lib/page-data";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const data = await getPageData(host, "home");
  if (!data) return { title: "Coming Soon" };
  const meta = data.content?.meta_data ?? {};
  return {
    title: meta.title ?? "Home",
    description: meta.description || undefined,
  };
}

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const data = await getPageData(host, "home");

  if (!data?.content) return <MaintenancePage />;

  return <SectionLayout domainConfig={data.domainConfig} content={data.content} />;
}
