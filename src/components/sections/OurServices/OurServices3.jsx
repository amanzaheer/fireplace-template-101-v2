"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function OurServices3({ content }) {
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

  return (
    <FullContainer id="our_services" className="bg-[#efefef] py-10 md:py-14">
      <Container>
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#212020] mb-8 md:mb-10 tracking-tight">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            const row = Math.floor(index / 2);
            const col = index % 2;
            const isAccent = (row + col) % 2 === 1;
            return (
              <div
                key={service.id}
                className={`rounded-[24px] p-3 md:p-4 shadow-sm overflow-hidden border flex flex-row gap-3 md:gap-4 transition-colors duration-200 ${
                  isAccent
                    ? "bg-[#f3a008] border-[#e29a00]"
                    : "bg-white border-[#e7e7e7]"
                }`}
              >
                <div className="relative w-[52%] min-h-[170px] md:min-h-[190px] rounded-[18px] overflow-hidden bg-gray-100 shrink-0">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 768px) 100vw, 26vw"
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3
                    className={`text-xl md:text-3xl font-extrabold leading-tight mb-1 ${
                      isAccent ? "text-white" : "text-[#212020]"
                    }`}
                  >
                    {service.path && service.path !== "#" ? (
                      <Link
                        href={service.path}
                        className={`hover:underline ${isAccent ? "text-white" : "text-[#212020]"}`}
                      >
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  {service.description ? (
                    <div
                      className={`prose prose-sm mb-3 max-w-none prose-p:my-0 prose-headings:my-1 ${
                        isAccent
                          ? "text-white prose-p:text-white prose-strong:text-white"
                          : "text-[#515151] prose-p:text-[#515151] prose-strong:text-[#212020]"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p
                      className={`text-sm md:text-base mb-3 ${
                        isAccent ? "text-white" : "text-[#515151]"
                      }`}
                    >
                      No description provided.
                    </p>
                  )}
                  <a
                    href={`tel:${phone}`}
                    className={`mt-auto inline-flex w-fit items-center gap-2 rounded-full font-extrabold uppercase tracking-wide px-4 md:px-5 py-2 text-xs md:text-sm transition-colors duration-200 ${
                      isAccent
                        ? "bg-white text-[#d39b3e] hover:bg-[#f7f7f7]"
                        : "bg-[#f3a008] text-white hover:bg-[#e39a00]"
                    }`}
                  >
                    Call Us Today
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {services.length > MAX_DISPLAY && (
          <div className="mt-6 text-center">
            <p className="text-[#212020] text-lg font-semibold">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={`tel:${phone}`}
                className="underline hover:text-[#d62828]"
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
