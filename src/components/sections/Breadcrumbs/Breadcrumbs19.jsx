"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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

function labelText(label) {
  return String(label ?? "")
    .replaceAll("%20", " ")
    .replaceAll("%E2%80%99", "'")
    .trim();
}

function labelTitle(label) {
  return labelText(label).replaceAll(" ", "-");
}

export default function Breadcrumbs19({ content }) {
  const pathname = usePathname();
  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(pathname ?? "", content),
    [pathname, content]
  );
  
  if (breadcrumbs.length <= 1) return null;

  return (
    <FullContainer className=" py-6 md:py-8">
      <Container className="px-4 md:px-8">
        <nav
          aria-label="Breadcrumb"
          className={cn(
            poppins.className,
            "mx-auto flex w-full max-w-[1180px]  items-center",
          )}
        >
          <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-2   px-4 py-3 shadow-[0_10px_24px_rgba] md:px-6">
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const text = labelText(breadcrumb.label);
              return (
                <span key={`${breadcrumb.url}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <ChevronRight className="h-4 w-4 shrink-0 border rounded-2xl text-shadow-slate-500" aria-hidden />
                  ) : null}
                  {isLast ? (
                    <span
                      className="text-[14px] font-semibold text-[#e31b23]  md:text-[15px]"
                      aria-current="page"
                    >
                      {text}
                    </span>
                  ) : (
                    <Link
                      href={breadcrumb.url}
                      title={labelTitle(breadcrumb.label)}
                      className="text-[14px] font-bold text-[#2b78b8] transition-colors hover:text-[#111111]"
                    >
                      {text}
                    </Link>
                  )}
                </span>
              );
            })}
          </div>
        </nav>
      </Container>
    </FullContainer>
  );
}
