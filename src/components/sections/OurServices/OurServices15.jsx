"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { Poppins } from "next/font/google";

/** Replace [service] token with the item's own title. */
function resolveServiceTag(str, title) {
  if (!str || !title) return str ?? "";
  return str.replace(/\[service\]/gi, title);
}

/** Render markdown to HTML. */
function markdownPreview(str) {
  if (!str) return "";
  return md.render(str);
}

const MAX_DISPLAY = 8;
const SCROLL_OFFSET = 100;
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function trimStr(v) {
  return typeof v === "string" && v.trim() ? v.trim() : "";
}

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "700"],
});

export default function OurServices15({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

  const scrollToSection = useCallback((element) => {
    if (!element) return;
    const top =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavigation = useCallback(
    (id) => {
      const element = document.getElementById(id);
      if (element) {
        scrollToSection(element);
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          scrollToSection(el);
        }, 500);
      }
    },
    [router, scrollToSection],
  );

  const handleHomeNavigation = useCallback(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  }, [pathname, router]);

  const services = useMemo(() => {
    if (Array.isArray(ourServices?.items) && ourServices.items.length > 0) {
      return ourServices.items.map((item, i) => {
        const title = item.title ?? "";
        return {
          id: item.id ?? item.path ?? String(i),
          title,
          path: item.path ?? "#",
          description: resolveServiceTag(item.description ?? "", title),
          image: item.image ?? null,
        };
      });
    }
    return (servicesFromNav || []).map((item, i) => {
      const title = item.title ?? "";
      return {
        id: item.path ?? String(i),
        title,
        path: item.path ?? "#",
        description: resolveServiceTag(item.description ?? "", title),
        image: item.image ?? null,
      };
    });
  }, [ourServices, servicesFromNav]);

  const displayServices = useMemo(
    () => (Array.isArray(services) ? services.slice(0, MAX_DISPLAY) : []),
    [services],
  );
  const serviceColumns = useMemo(() => {
    const columns = [[], [], []];
    displayServices.forEach((service, index) => {
      columns[index % 3].push(service);
    });
    return columns;
  }, [displayServices]);

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Services Provided";
  const sectionSub =
    trimStr(ourServices?.sub_title) ||
    trimStr(ourServices?.subtitle) ||
    trimStr(ourServices?.subheading) ||
    trimStr(ourServices?.tagline) ||
    "";

  return (
    <FullContainer id="our_services" className="bg-[#fafafa] py-12 md:py-16 lg:py-20">
      <Container className=" mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <h2 className={`${poppins.className} text-center text-[32px] lg:text-[44px] font-normal text-[#2d2d2d] tracking-tight`}>
            {title}
          </h2>
          {sectionSub ? (
            <p className="mt-3 font-barlow text-sm leading-relaxed text-neutral-600 sm:text-base md:mt-4 md:text-[17px]">
              {sectionSub}
            </p>
          ) : null}
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-3">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="flex h-full flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_20px_rgba(15,23,42,0.07)] ring-1 ring-neutral-200/80 transition-shadow duration-200 hover:shadow-[0_6px_28px_rgba(15,23,42,0.1)]"
              >
                <div className="relative aspect-32/23 w-full shrink-0 bg-neutral-200">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                      <span className="text-4xl font-bold text-neutral-400">
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-3 md:gap-3 md:p-3">
                  <h3 className="text-left font-montserrat text-lg md:text-[21px] font-bold leading-snug text-neutral-900 ">
                    {service.path && service.path !== "#" ? (
                      <Link
                        href={service.path}
                        className="text-neutral-900 transition-colors hover:text-neutral-600"
                      >
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  {service.description ? (
                    <div
                      className="flex-1 text-left font-poppins text-[9px] font-normal leading-relaxed text-gray-700 [&_p]:m-0 [&_p]:font-poppins [&_p]:text-[14px] [&_p]:font-normal [&_p]:leading-relaxed [&_p]:text-[#6e6e6e] [&_a]:text-[#6e6e6e] [&_strong]:font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="flex-1 text-left font-poppins text-[9px] font-normal leading-relaxed text-gray-400">
                      No description provided.
                    </p>
                  )}
                  <a
                    href={phone ? `tel:${phone}` : "#"}
                    className="mt-auto inline-flex w-fit mb-3 items-center gap-2 rounded-lg bg-[#f59403] px-5 py-2.5 font-montserrat text-[11px] md:text-[14px] font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#6b6562] sm:px-6 sm:py-3 sm:text-xs"
                  >
                    <span>Call us today</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2.5} aria-hidden />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {services.length > MAX_DISPLAY && (
          <div className="mt-8 text-center">
            <p className="font-barlow text-base font-semibold text-neutral-700">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="text-[#7A7471] underline decoration-[#7A7471]/50 underline-offset-2 transition-colors hover:text-[#6b6562]"
              >
                Call for details
              </a>
            </p>
          </div>
        )}
      </Container>
    </FullContainer>
  );
}
