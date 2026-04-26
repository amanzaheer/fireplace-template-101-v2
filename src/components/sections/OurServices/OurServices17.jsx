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
      className="w-full min-h-[1050px] bg-white pt-12 pb-8 md:pt-16 md:pb-10"
    >
      <Container className="px-4">
        <p className="mb-2 text-center text-lg font-medium text-white/95 md:text-xl">
          {eyebrow}
        </p>

        <h2
          className={cn(
            sectionTitleFont.className,
            "mb-12 text-center text-[36px] font-bold not-italic leading-[45px] text-[#000]",
          )}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-1 md:gap-y-1">
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
                <div className="relative h-[320px] w-full overflow-hidden  bg-gray-100 sm:h-[350px] md:h-[380px]">
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
                <div className=" flex h-[176px] w-[86%]  flex-col px-5 py-4 text-center gap-2 md:h-[220px] md:min-h-[220px] mb-2 mx-auto md:px-6 md:py-5 ">

                  <h3 className="text-[22px] md:text-[24px] font-extrabold text-[#0d1016] mb-2 leading-normal h-auto overflow-visible flex items-center justify-center">
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
                      className="text-[#2e3238] text-[13px] leading-6 mb-2 h-auto min-h-[42px] overflow-visible flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: markdownPreview(service.description),
                      }}
                    />
                  ) : (
                    <p className="text-[#2e3238] text-[13px] leading-6 mb-2 h-auto min-h-[42px] overflow-visible flex items-center justify-center">
                      No description provided.
                    </p>
                  )}

                  <a
                    href={`tel:${phone}`}
                    className={cn(
                      ctaFont.className,
                      "mt-auto inline-flex mx-auto w-2/3  items-center justify-center gap-2 rounded-lg bg-[#0F1F41] px-0 py-3 text-[14px] font-semibold uppercase leading-6 tracking-[0.84px] text-[#FFF] transition  not-italic",
                    )}
                  >
                    CALL US TODAY
                    <ArrowRight className="h-5 w-5 shrink-0 text-[#FF0504]" aria-hidden />
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