"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
const CARD_CONTENT_TEXT_CLASS =
  "w-[357px] max-w-full text-left text-[14px] font-normal not-italic leading-[22.15px] text-[#6E6E6E]";

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
          <h2
            className={`${poppins.className} self-stretch text-center text-[44px] font-medium not-italic leading-[93.872px] text-[#2D2D2D] capitalize`}
          >
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
                  <h3 className="text-left font-poppins text-[21.095px] font-medium not-italic leading-[36.916px] text-[#2D2D2D]">
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
                      className={`flex-1 ${poppins.className} ${CARD_CONTENT_TEXT_CLASS} [&_*]:font-inherit [&_*]:text-[#6E6E6E] [&_*]:leading-[22.15px] [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0`}
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className={`flex-1 ${poppins.className} ${CARD_CONTENT_TEXT_CLASS}`}>
                      No description provided.
                    </p>
                  )}
                  <a
                    href={phone ? `tel:${phone}` : "#"}
                    className="mt-auto flex w-[217.278px] items-center justify-center gap-[21.095px] rounded-[12px] bg-[#786F6F] px-[40.08px] py-[12.657px] font-montserrat text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#6d6565]"
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
