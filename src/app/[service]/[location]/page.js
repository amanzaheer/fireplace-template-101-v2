import { headers } from "next/headers";
import { notFound } from "next/navigation";
import SectionLayout from "@/components/SectionLayout";
import MaintenancePage from "@/components/MaintenancePage";
import { getPageData, getLocationData, getPageConfig, resolveAllTags } from "@/lib/page-data";
import {
    findLocationEntryByUrlSegment,
    pathSegmentMatchesPath,
    titleFromLocationSlug,
} from "@/lib/location-routing";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { service, location } = await params;
    const headersList = await headers();
    const host = headersList.get("host") ?? "";

    const homeData = await getPageData(host, "home");
    if (!homeData) return { title: "Coming Soon" };

    const services = homeData.content?.services ?? [];
    const serviceEntry = services.find((s) => pathSegmentMatchesPath(s.path, service));
    if (!serviceEntry) return { title: "Service" };

    const locations = homeData.content?.locations ?? [];
    const locationEntry = findLocationEntryByUrlSegment(locations?.list || [], location);
    if (!locationEntry) return { title: serviceEntry.title ?? "Service" };

    const locationTitleForMeta =
        (typeof locationEntry === "object" && locationEntry != null
            ? locationEntry.title ?? locationEntry.name
            : undefined) ||
        titleFromLocationSlug(location) ||
        location;

    const locationContent = await getLocationData(
        host,
        serviceEntry.title,
        location,
        locationTitleForMeta
    );
    const meta = locationContent?.meta_data;

    return {
        title: meta?.title ?? `${serviceEntry.title} in ${locationTitleForMeta}`,
        description: meta?.description ?? undefined,
    };
}

export default async function ServiceLocationPage({ params }) {
    const { service, location } = await params;
    const headersList = await headers();
    const host = headersList.get("host") ?? "";

    // 1. Home data — services list, locations list, navbar, contact_info
    const homeData = await getPageData(host, "home");
    if (!homeData) return <MaintenancePage />;

    const services = homeData.content?.services ?? [];
    const serviceData = services.find((s) => pathSegmentMatchesPath(s.path, service));
    if (!serviceData) notFound();

    const locations = homeData.content?.locations ?? [];
    const locationData = findLocationEntryByUrlSegment(locations?.list || [], location);
    //   if (!locationData) notFound();

    const locationTitleResolved =
        (typeof locationData === "object" && locationData != null
            ? locationData.title ?? locationData.name
            : undefined) ||
        titleFromLocationSlug(location) ||
        location;

    // 2. Merged location content:
    //    shared location defaults + per-location overrides, with all [tags] resolved
    const locationContent = await getLocationData(
        host,
        serviceData.title,
        location,
        locationTitleResolved
    );
    if (!locationContent) return <MaintenancePage />;

    // vars used to resolve [service] / [area] in data coming from homeData
    const locationVars = {
        service: serviceData.title,
        area: locationTitleResolved,
        location,
    };

    // 3. Final merged content passed to every section component
    // Keep home navbar: location JSON from the datastore often includes a partial `navbar`
    // that overwrites logo config (image vs text). Home + service pages use home-only navbar.
    const mergedContent = {
        ...homeData.content,
        ...locationContent,
        services: resolveAllTags(homeData.content?.services ?? [], locationVars),
        locations: resolveAllTags(homeData.content?.locations ?? [], locationVars),
        serviceDetail: resolveAllTags(serviceData, locationVars),
        locationDetail: resolveAllTags(locationData, locationVars),
        // navbar: homeData.content?.navbar ?? locationContent?.navbar,
    };

    // domainConfig for the location page layout (sections order / visibility)
    const domainConfig = await getPageConfig(host, "location");
    if (!domainConfig?.sections) return <MaintenancePage />;

    return <SectionLayout domainConfig={domainConfig} content={mergedContent} />;
}
