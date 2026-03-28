"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
// import Breadcrumbs from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

function buildBreadcrumbs(pathname, content) {
  const segments = pathname.split("/").filter(Boolean);
  const items = [{ label: "Home", url: "/" }];
  let path = "";
  for (let i = 0; i < segments.length; i++) {
    path += `/${segments[i]}`;
    const label =
      content?.serviceDetail && content.serviceDetail.path === path
        ? content.serviceDetail.title
        : segments[i].replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ label, url: path });
  }
  return items;
}

export default function Breadcrumbs4({ content }) {
  const pathname = usePathname();
  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(pathname ?? "", content),
    [pathname, content]
  );

  if (breadcrumbs.length <= 1) return null;

  return (
    <FullContainer>
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} className="pt-7"  />
      </Container>
    </FullContainer>
  );
}




function Breadcrumbs({ breadcrumbs, className }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "w-full flex items-center py-2 font-semibold text-gray-500",
        className
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronsRight className="w-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-[#f59402]" aria-current="page">
              {breadcrumb.label
                ?.replaceAll("%20", " ")
                ?.replaceAll("%E2%80%99", "'")} 
            </span>
          ) : (
            <Link
              title={breadcrumb.label
                ?.replaceAll(" ", "-")
                ?.replaceAll("%20", "-")
                ?.replaceAll("%E2%80%99", "'")}
              href={breadcrumb.url}
              className="hover:underline transition-all"
            >
              {breadcrumb.label
                ?.replaceAll("%20", " ")
                ?.replaceAll("%E2%80%99", "'")}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
