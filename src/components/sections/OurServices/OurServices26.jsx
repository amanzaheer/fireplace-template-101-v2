"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import {Poppins} from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
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
const DEFAULT_MAX_DISPLAY = 9;
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function OurServices26({ content }) {
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

  const maxDisplay =
    Number(ourServices?.max_display) > 0
      ? Number(ourServices.max_display)
      : DEFAULT_MAX_DISPLAY;

  const displayServices = useMemo(
    () => (Array.isArray(services) ? services.slice(0, maxDisplay) : []),
    [services, maxDisplay],
  );

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "";
  const callLabel =
    ourServices?.call_for_details_label ??
    content?.promotion?.cta_label ??
    "";
  const overflowTemplate = ourServices?.overflow_template ?? "";

  return (
    <FullContainer id="our_services" className="bg-[#FFFFFF] py-10 md:py-14">
      <Container className="px-4 sm:px-6 lg:px-8">
        {title ? (
          <h2 className={`mb-8 text-center text-[28px] font-extrabold tracking-tight text-[#0b0b0b] sm:text-[36px] md:mb-10 md:text-[42px] lg:text-5xl ${poppins.className}`}>
            {title}
          </h2>
        ) : null}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, index) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;
            return (
              <div
                key={service.id}
                className="group mx-auto w-full max-w-[356px] overflow-hidden rounded-[4px] bg-transparent sm:max-w-none"
              >
                <div className="relative h-[220px] w-full overflow-hidden rounded-tl-[5px] rounded-tr-[5px] bg-gray-100 sm:h-[250px] lg:h-[278px]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title ?? ""}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex  items-center justify-center">
                      <span className={`text-4xl font-bold text-gray-400 ${poppins.className}`}>
                        {service.title?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-black/0  transition-colors duration-300 group-hover:bg-black/70" />

                  <div className="absolute inset-x-0 top-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {service.description ? (
                      <div
                        className="prose prose-sm max-w-none text-center font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] prose-headings:my-1 prose-p:my-0 **:text-white! [&_a:hover]:text-white! [&_a:visited]:text-white!"
                        style={{ color: "#FFFFFF" }}
                        dangerouslySetInnerHTML={{
                          __html: markdownPreview(service.description),
                        }}
                      />
                    ) : null}
                  </div>

                  {callLabel && phone ? (
                    <div className="absolute inset-x-0 bottom-16 px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={`tel:${phone}`}
                        className="mx-auto block w-fit rounded bg-white px-5 py-2 text-sm font-bold text-[#0b0b0b] transition-colors hover:bg-[#efefef]"
                      >
                        {callLabel}
                      </a>
                    </div>
                  ) : null}
                </div>
                <div className="relative z-10 -mt-10 mb-8 flex h-auto min-h-[64px] w-full max-w-full items-center justify-center rounded-tl-[30px] rounded-tr-[30px] bg-[#D90209] px-3 py-[10px] text-center sm:-mt-12 sm:mb-12 sm:min-h-[71px] lg:mb-16">
                  <h3
                    className={`line-clamp-2 text-[18px] font-medium leading-normal text-white sm:text-[20px] lg:text-[22px] lg:leading-[28px] ${poppins.className}`}
                  >
                    {service.path && service.path !== "#" ? (
                      <Link href={service.path} className="hover:underline">
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        {services.length > maxDisplay && phone && callLabel && overflowTemplate ? (
          <div className="mt-6 text-center">
            <p className="text-[#002B5B] text-lg font-semibold">
              {(() => {
                const overflowText = overflowTemplate.replace(
                  "{count}",
                  String(services.length - maxDisplay),
                );
                const linkParts = overflowText.split("{link}");
                if (linkParts.length < 2) return overflowText;
                return (
                  <>
                    {linkParts[0]}
                    <a
                      href={`tel:${phone}`}
                      className="underline hover:text-blue-700"
                    >
                      {callLabel}
                    </a>
                    {linkParts.slice(1).join("{link}")}
                  </>
                );
              })()}
            </p>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
