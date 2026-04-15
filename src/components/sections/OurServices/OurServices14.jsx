"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";

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

export default function OurServices14({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

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
      <Container className="px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          <h2 className="font-montserrat text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-[2rem] md:leading-snug">
            {title}
          </h2>
          {sectionSub ? (
            <p className="mt-3 font-barlow text-sm leading-relaxed text-neutral-600 sm:text-base md:mt-4 md:text-[17px]">
              {sectionSub}
            </p>
          ) : null}
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="flex h-full flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_2px_20px_rgba(15,23,42,0.07)] ring-1 ring-neutral-200/80 transition-shadow duration-200 hover:shadow-[0_6px_28px_rgba(15,23,42,0.1)]"
              >
                <div className="relative aspect-[5/4] w-full shrink-0 bg-neutral-200">
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
                <div className="flex flex-1 flex-col gap-3 p-6 md:gap-3.5 md:p-7">
                  <h3 className="text-left font-montserrat text-lg font-bold leading-snug text-neutral-900 md:text-[1.15rem]">
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
                      className="prose prose-sm flex-1 max-w-none text-left font-barlow text-sm leading-relaxed text-neutral-600 prose-p:my-0 prose-p:text-neutral-600 prose-p:leading-relaxed prose-headings:my-1 prose-headings:text-neutral-900 prose-a:text-[#7A7471] prose-strong:text-neutral-800 md:text-[15px]"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="flex-1 text-left text-sm leading-relaxed text-neutral-600 md:text-[15px]">
                      No description provided.
                    </p>
                  )}
                  <a
                    href={phone ? `tel:${phone}` : "#"}
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#7A7471] px-5 py-2.5 font-montserrat text-[11px] font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#6b6562] sm:px-6 sm:py-3 sm:text-xs md:text-[13px]"
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
