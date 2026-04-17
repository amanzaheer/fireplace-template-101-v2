"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import {Rubik, Archivo} from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
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

export default function OurServices10({ content }) {
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

  const title = ourServices?.title ?? "We Offers Best Plumbing Services";

  return (
    <FullContainer id="our_services" className="bg-white py-12 md:py-16">
      <Container className=" max-w-5xl!">
        <div className="mb-8 flex items-center justify-between gap-4  text-black">
          <h2 className={`${rubik.className} text-3xl md:text-[44px] font-bold tracking-tight`}>
            {title}
          </h2>
          <a
            href={`tel:${phone}`}
            className={`${archivo.className}  text-[12px] md:text-[14px] hidden md:inline-flex items-center gap-2 text-[#a52828] uppercase text-sm font-bold tracking-wide hover:text-[#a52828] transition-colors duration-200`}
          >
            Get A Quotation
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 ">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="flex flex-col rounded overflow-hidden bg-transparent hover:shadow-md transition-shadow duration-200 aspect-square"
              >
                <div className="relative  h-[349px] bg-gray-100 overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className={`${rubik.className} text-[18px] md:text-[22px] leading-tight font-medium text-gray-400`}>
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 -mt-6 bg-[#fe4949] pt-3  pb-4 px-4 flex flex-col items-center rounded-[18px] rounded-b-none">
                  <h3 className={`${archivo.className} text-[18px] md:text-[20px] leading-tight font-medium text-white text-center`}>
                    {service.title}
                  </h3>

                  {/* Keep description + CTA for functionality/SEO but hide in this UI */}
                  {service.description ? (
                    <div
                      className="hidden"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="hidden">
                      No description provided.
                    </p>
                  )}
                  <a
                    href={`tel:${phone}`}
                    className="hidden"
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
            <p className={`${rubik.className} text-[14px] md:text-[16px] leading-tight text-[#6e6e6e] font-medium`}>
              {services.length - MAX_DISPLAY} more services available –{" "}
              <a
                href={`tel:${phone}`}
                className={`${archivo.className} text-[12px] md:text-[14px] underline hover:text-[#d62828]`}
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
