import { headers } from "next/headers";
import { notFound } from "next/navigation";
import SectionLayout from "@/components/SectionLayout";
import MaintenancePage from "@/components/MaintenancePage";
import {
  getPageData,
  getServiceData,
  getPageConfig,
  resolveAllTags,
  deepMerge,
} from "@/lib/page-data";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { service } = await params;
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const homeData = await getPageData(host, "home");
  if (!homeData) return { title: "Coming Soon" };
  const services = homeData.content?.services ?? [];
  const serviceEntry = services.find((s) => s.path === `/${service}`);
  if (!serviceEntry) return { title: "Service" };
  // Load the full merged service content which has resolved meta_data
  const serviceContent = await getServiceData(host, service, serviceEntry.title);
  const meta = serviceContent?.meta_data;

  return {
    title: meta?.title ?? serviceEntry.title ?? "Service",
    description: meta?.description ?? serviceEntry.description ?? undefined,
  };
}
export default async function ServicePage({ params }) {
  const { service } = await params;
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  // 1. Home data — services list, navbar, contact_info
  const homeData = await getPageData(host, "home");
  if (!homeData) return <MaintenancePage />;

  const services = homeData.content?.services ?? [];
  const serviceData = services.find((s) => s.path === `/${service}`);
  if (!serviceData) notFound();

  // 2. Merged service content:
  //    shared service defaults  +  per-service overrides, with all [tags] resolved
  const serviceContent = await getServiceData(host, service, serviceData.title);
  if (!serviceContent) return <MaintenancePage />;

  // vars used to resolve [service] in any data that came from homeData (not getServiceData)
  const serviceVars = { service: serviceData.title };

  // 3. Final merged content passed to every section component
  //    serviceDetail and services come from homeData so we re-resolve them with [service]
  const mergedContent = {
    ...homeData.content,
    ...serviceContent,
    services: resolveAllTags(homeData.content?.services ?? [], serviceVars),
    serviceDetail: resolveAllTags(serviceData, serviceVars),
  };

  // Deep-merge FAQs so service JSON can add stats/right_intro/title without dropping
  // home `items` when the datastore returns a partial service layer.
  mergedContent.faqs = deepMerge(
    homeData.content?.faqs ?? {},
    serviceContent?.faqs ?? {},
  );

  // domainConfig for the service page layout (sections order / visibility)
  const domainConfig = await getPageConfig(host, "service");
  if (!domainConfig?.sections) return <MaintenancePage />;

  return <SectionLayout domainConfig={domainConfig} content={mergedContent} />;
}
