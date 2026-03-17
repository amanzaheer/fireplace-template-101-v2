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

export default function OurServices1({ content }) {
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
    [services]
  );

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Services Provided";

  return (
    <FullContainer id="our_services">
      <Container>
        <h2 className="text-4xl font-extrabold text-center text-[#002B5B] mb-8 tracking-tight">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:gap-8 gap-4">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="bg-white border border-blue-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                <div className="w-full h-48 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
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
                <div className="flex flex-col flex-1 p-3 md:p-6 pb-4">
                  <h3 className="md:text-2xl font-bold text-blue-900 mb-2 text-center">
                    {service.path && service.path !== "#" ? (
                      <Link
                        href={service.path}
                        className="hover:underline"
                      >
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  {service.description ? (
                    <div
                      className="prose prose-sm text-gray-800 font-medium text-center mb-3 md:min-h-[48px] max-w-none prose-p:my-0 prose-headings:my-1"
                      dangerouslySetInnerHTML={{ __html: markdownPreview(service.description) }}
                    />
                  ) : (
                    <p className="text-gray-800 text-sm md:text-base font-medium text-center mb-3 md:min-h-[48px]">
                      No description provided.
                    </p>
                  )}
                  <a
                    href={`tel:${phone}`}
                    className="mt-auto w-fit bg-blue-950 text-white font-bold py-1 md:py-2 px-4 md:px-8 mx-auto text-center text-sm md:text-lg hover:bg-blue-900 transition-colors duration-200 rounded"
                  >
                    Call Us Today
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {services.length > MAX_DISPLAY && (
          <div className="mt-6 text-center">
            <p className="text-[#002B5B] text-lg font-semibold">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={`tel:${phone}`}
                className="underline hover:text-blue-700"
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
