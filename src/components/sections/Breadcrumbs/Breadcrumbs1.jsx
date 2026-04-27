"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Breadcrumbs from "@/components/common/Breadcrumbs";

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

export default function Breadcrumbs1({ content }) {
  const pathname = usePathname();
  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(pathname ?? "", content),
    [pathname, content]
  );

  if (breadcrumbs.length <= 1) return null;

  return (
    <FullContainer>
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} className="pt-7" />
      </Container>
    </FullContainer>
  );
}
