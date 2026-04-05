"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Poppins, Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";

const sectionTitleFont = Poppins({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const cardHeadingFont = Poppins({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const ctaFont = Rubik({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

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
    [services]
  );

  if (!displayServices.length) return null;

  const title = ourServices?.title ?? "Services Provided";
  const eyebrow =
    ourServices?.eyebrow ?? ourServices?.subtitle ?? "Our Best Service";

  return (
    <FullContainer
      id="our_services"
      className="w-full min-h-[1050px] bg-[linear-gradient(180deg,#f48842_0%,#dd6a22_42%,#ca4b00_100%)] pt-12 pb-8 md:pt-16 md:pb-10"
    >
      <Container className="px-4">
        <p className="mb-2 text-center text-lg font-medium text-white/95 md:text-xl">
          {eyebrow}
        </p>

        <h2
          className={cn(
            sectionTitleFont.className,
            "mb-12 text-center text-[36px] font-bold not-italic leading-[45px] text-[#FFF]",
          )}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-y-20">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;

            return (
              <div
                key={service.id}
                className="group relative mx-auto w-full max-w-[680px] overflow-visible pb-[72px] sm:pb-[76px] md:pb-[88px]"
              >
                {/* IMAGE CARD */}
                <div className="relative h-[320px] w-full overflow-hidden rounded-md bg-gray-100 sm:h-[350px] md:h-[380px]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={service.title || "Service"}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
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

                {/* CONTENT CARD — sits slightly higher so it doesn’t cover the next section */}
                <div className="absolute bottom-[-8px] left-1/2 flex h-[176px] w-[86%] -translate-x-1/2 flex-col rounded-[24px] bg-[#f3f3f3] px-5 py-2.5 text-center shadow-[0_20px_45px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] sm:bottom-[-12px] md:bottom-[-4px] md:h-[186px] md:w-[1%] md:px-6 md:py-3 lg:w-[91%]">
                  <h3 className="text-[22px] md:text-[24px] font-extrabold text-[#0d1016] mb-1 leading-tight h-[56px] overflow-hidden flex items-center justify-center">
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
                      className="text-[#2e3238] text-[13px] leading-5 mb-2 h-[42px] overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="text-[#2e3238] text-[13px] leading-5 mb-2 h-[42px] overflow-hidden">
                      No description provided.
                    </p>
                  )}

                  <a
                    href={`tel:${phone}`}
                    className={cn(
                      ctaFont.className,
                      "mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6a00] px-4 py-2 text-[14px] font-semibold uppercase leading-6 tracking-[0.84px] text-[#FFF] transition hover:bg-[#ea5f00] not-italic",
                    )}
                  >
                    CALL US TODAY
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </FullContainer>
  );
}