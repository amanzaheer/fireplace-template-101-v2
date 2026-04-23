"use client";

import React, { useMemo } from "react";
import Image from "next/image";
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

export default function OurServices13({ content }) {
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
    <FullContainer id="our_services">
      <Container>
        <h2 className="text-4xl font-extrabold text-center text-black mb-8 tracking-tight">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-[2px] rounded-2xl overflow-hidden">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className={`bg-[#d9d9d9] border-b ${index===1?"border-l border-r border-b":""} ${index===4?"border-r border-b border-l":""} ${index===7?"border-r border-b border-l":""} overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col`}
              >
                <div className="flex flex-col flex-1 p-3 md:p-6 pb-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-3 border-[#4c2477] bg-[#4c2477] md:h-20 md:w-20">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={service.title || "Service"}
                          fill
                          sizes="(max-width: 768px) 64px, 80px"
                          className="object-cover"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-3xl font-bold text-[#d7d7d7]">
                            {service.title?.charAt(0) ?? "?"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="mb-2 font-poppins text-xl font-medium leading-tight text-black md:text-2xl">
                        {service.title}
                      </h3>
                      {service.description ? (
                        <div
                          className="font-poppins text-[12.6px] font-normal leading-relaxed text-gray-700 [&_p]:m-0 [&_p]:font-poppins [&_p]:text-[12.6px] [&_p]:font-normal [&_p]:leading-relaxed [&_p]:text-[#000000] [&_a]:text-[#000000] [&_strong]:font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: markdownPreview(service.description),
                          }}
                        />
                      ) : (
                        <p className="text-black text-sm md:text-[12.6px] leading-[18px] font-medium">
                          No description provided.
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={`tel:${phone}`}
                    className="mt-4 w-fit bg-[#4c2477] text-white font-bold py-1 md:py-2 px-4 md:px-8 mx-auto text-center text-sm md:text-lg hover:bg-blue-900 transition-colors duration-200 rounded"
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
