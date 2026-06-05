"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";

const sectionTitleFont = Poppins({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const cardTitleFont = Poppins({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function resolveServiceTag(str, title) {
  if (!str || !title) return str ?? "";
  return str.replace(/\[service\]/gi, title);
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

export default function OurServices28({ content }) {
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
    ourServices?.eyebrow ?? ourServices?.subtitle ?? "";
  const phoneLink = phone ? `tel:${phone}` : "#";
  const phoneButtonClass =
    "h-[54px] w-[220px] inline-flex flex-row items-center justify-center gap-2 rounded-full bg-[#ff0504] text-white shadow-lg transition-all hover:opacity-80";
  const phoneTextClass = `${inter.className} text-sm md:text-[20px] lg:text-lg font-bold text-white mt-1 leading-none`;

  return (
    <FullContainer
      id="our_services"
      className="w-full bg-white pt-12 pb-12 md:pt-16 md:pb-14"
    >
      <Container className="px-4 md:px-4">
        <p
          className={cn(
            inter.className,
            "mb-2 text-center text-base font-medium text-neutral-600 md:text-lg",
          )}
        >
          {eyebrow}
        </p>

        <h2
          className={cn(
            sectionTitleFont.className,
            "mb-10 text-center text-3xl font-bold leading-tight text-black md:mb-12 md:text-4xl",
          )}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {displayServices.map((service) => {
            const imageSrc = service.image
              ? buildImageSrc(IMAGE_BASE, service.image)
              : null;

            const inner = (
              <>
                <div className="relative w-full">
                  <div className="relative aspect-square w-full overflow-hidden   bg-neutral-200 shadow-[0_10px_30px_rgba(15,31,65,0.08)]">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={service.title || "Service"}
                        fill
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-300">
                        <span className="text-5xl font-bold text-neutral-500">
                          {service.title?.charAt(0) ?? "?"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex translate-y-1/2 justify-center px-3">
                    <div
                      className={cn(
                        cardTitleFont.className,
                        "pointer-events-auto relative w-full max-w-[280px]  rounded-lg bg-white px-5 py-3.5 text-center shadow-md md:px-6 md:py-4",
                      )}
                    >
                      <h3 className="text-base font-bold  leading-snug text-black md:text-lg">
                        {service.title}
                      </h3>
                      <span
                        className="absolute left-1/2 top-full flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#c62828] bg-white shadow-sm"
                        aria-hidden
                      >
                        <ArrowRight
                          className="h-4 w-4 text-[#c62828]"
                          strokeWidth={2.5}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );

            return (
              <article
                key={service.id}
                className="group relative w-full pb-20 pt-0.5 md:pb-24"
              >
                {service.path && service.path !== "#" ? (
                  <Link
                    href={service.path}
                    className="block outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#c62828] rounded-2xl"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="block">{inner}</div>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </FullContainer>
  );
}
