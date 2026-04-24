"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { cn } from "@/lib/utils";

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal"],
});

function resolveServiceTag(strVal, title) {
  if (!strVal || !title) return strVal ?? "";
  return strVal.replace(/\[service\]/gi, title);
}

function markdownPreview(strVal) {
  if (!strVal) return "";
  return md.render(strVal);
}

const MAX_DISPLAY = 9;

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function OurServices16({ content }) {
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

    return servicesFromNav.map((item, i) => {
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

  const sectionTitle = str(ourServices?.title);
  const ctaLabel = str(ourServices?.cta_label);
  const ctaHref = str(ourServices?.cta_link);
  const showCta = Boolean(ctaLabel && ctaHref);
  const ctaIsTel = ctaHref.startsWith("tel:");
  const moreServicesNote = str(ourServices?.more_services_note);
  const showOverflowNote =
    services.length > MAX_DISPLAY && Boolean(moreServicesNote);

  return (
    <FullContainer
      className="bg-neutral-50 py-12 md:py-16 lg:py-20"
      id="our_services"
    >
      <Container className="max-w-6xl px-4 sm:px-6">
        {sectionTitle && (
          <h2
            className={cn(
              "mb-8 text-center text-[36px] font-medium text-black md:mb-10",
              poppins.className,
            )}
          >
            {sectionTitle}
          </h2>
        )}

        <ul className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;

            const hasDesc = Boolean(str(service.description));

            const CardContent = (
              <article
                tabIndex={0}
                className={cn(
                  "group relative aspect-square w-full overflow-hidden rounded-lg shadow-md transition",
                  "focus-visible:ring-2 focus-visible:ring-[#F25421] focus-visible:ring-offset-2"
                )}
              >
                {/* IMAGE */}
                <div className="absolute inset-0 bg-neutral-200">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={str(service.title)}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-300 text-5xl font-bold text-neutral-500">
                      {service.title?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/70" />

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                  <h3
                    className={cn(
                      "text-white font-bold uppercase text-[clamp(1rem,4vw,23px)]",
                      poppins.className
                    )}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description Hover */}
                {hasDesc && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <div className="bg-black/60 text-white text-sm p-3 rounded-md max-h-[60%] overflow-y-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: markdownPreview(service.description),
                        }}
                      />
                    </div>
                  </div>
                )}
              </article>
            );

            return (
              <li key={service.id}>
                {service.path && service.path !== "#" ? (
                  <Link
                    href={service.path}
                    aria-label={service.title}
                    className="block"
                  >
                    {CardContent}
                  </Link>
                ) : (
                  CardContent
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        {showCta && (
          <div className="mt-10 flex justify-center">
            {ctaIsTel ? (
              <a
                href={ctaHref}
                className="bg-[#F25421] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d9481c]"
              >
                {ctaLabel}
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="bg-[#F25421] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d9481c]"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        )}

        {/* Overflow Note */}
        {showOverflowNote && (
          <p className="mt-6 text-center text-sm font-bold text-gray-500">
            {moreServicesNote}
          </p>
        )}
      </Container>
    </FullContainer>
  );
}