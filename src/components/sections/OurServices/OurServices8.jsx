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

export default function OurServices8({ content }) {
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
  const eyebrow =
    ourServices?.eyebrow ?? ourServices?.subtitle ?? "Our Best Service";
  return (
    <FullContainer
      id="our_services"
      className="bg-gradient-to-b from-orange-400 to-orange-600 py-10 md:py-14"
    >
      <Container className="px-4">
        <p className="text-center text-white/95 text-2xl font-medium mb-1">
          {eyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-10 tracking-tight">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="relative overflow-visible transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative w-full h-56 sm:h-64 md:h-72 bg-gray-100 overflow-hidden rounded-md">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mx-3 -mt-7 md:mx-4 md:-mt-8 rounded-3xl bg-white px-4 py-3 md:px-5 md:py-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2 text-center leading-tight">
                    {service.path && service.path !== "#" ? (
                      <Link href={service.path} className="hover:underline">
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  {service.description ? (
                    <div
                      className="prose prose-sm text-gray-700 font-medium text-center mb-4 min-h-[56px] max-w-none prose-p:my-0 prose-headings:my-1"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="text-gray-700 text-sm md:text-base font-medium text-center mb-4 min-h-[56px]">
                      No description provided.
                    </p>
                  )}
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center justify-center mt-auto w-full bg-orange-500 text-white font-extrabold uppercase tracking-[0.14em] py-3 px-4 mx-auto text-center text-sm hover:bg-orange-600 transition-colors duration-200 rounded-md"
                  >
                    CALL US TODAY
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {services.length > MAX_DISPLAY && (
          <div className="mt-6 text-center">
            <p className="text-white text-lg font-semibold">
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={`tel:${phone}`}
                className="underline hover:text-orange-100"
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
