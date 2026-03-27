"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";

function resolveServiceTag(str, title) {
  if (!str || !title) return str ?? "";
  return str.replace(/\[service\]/gi, title);
}

function markdownPreview(str) {
  if (!str) return "";
  return md.render(str);
}

const MAX_DISPLAY = 8;
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function OurServices4({ content }) {
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
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#2d2d2d] mb-8 md:mb-10 tracking-tight">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 drop-shadow-md">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;

            return (
              <div
                key={service.id}
                className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-[#e5e5e5] bg-white flex flex-row "
              >
                {/* Image */}
                <div className="relative w-[50%] min-h-[200px] md:min-h-[220px] overflow-hidden bg-gray-100 shrink-0">
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

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0 p-4 md:p-5">
                  <h3 className="text-xl md:text-2xl font-extrabold leading-tight mb-2 text-[#2d2d2d]">
                    {service.path && service.path !== "#" ? (
                      <Link
                        href={service.path}
                        className="hover:underline text-[#2d2d2d]"
                      >
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>

                  {service.description ? (
                    <div
                      className="prose prose-sm mb-4 max-w-none prose-p:my-0 prose-headings:my-1 text-[#6b6b6b] prose-p:text-[#6b6b6b]"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="text-sm md:text-base mb-4 text-[#6b6b6b]">
                      No description provided.
                    </p>
                  )}

                  <a
                    href={`tel:${phone}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 font-extrabold uppercase tracking-wide px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm bg-[#f59e0b] text-white hover:bg-[#e08a00] transition-colors duration-200"
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