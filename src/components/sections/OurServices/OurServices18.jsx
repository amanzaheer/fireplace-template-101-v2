"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

function resolveServiceTag(str, title) {
  if (!str || !title) return str ?? "";
  return str.replace(/\[service\]/gi, title);
}

function markdownPreview(str) {
  if (!str) return "";
  return md.render(str);
}

const MAX_DISPLAY = 6;

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export default function OurServices18({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ourServices = content?.our_services;
  const servicesFromNav = content?.services ?? [];

  const services = useMemo(() => {
    const rawItems = (Array.isArray(ourServices?.items) && ourServices.items.length > 0)
      ? ourServices.items
      : (servicesFromNav || []);

    return rawItems.map((item, i) => {
      const title = item.title ?? "";
      return {
        id: item.id ?? item.path ?? String(i),
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
  const sectionSub = ourServices?.sub_title || ourServices?.tagline || "";

  return (
    <FullContainer id="our_services" className="bg-white py-12 md:py-16 lg:py-20">
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-16">
          <h2 className={`${poppins.className} text-center text-[36px] lg:text-[48px] font-bold text-[#1a1a1a]`}>
            {title}
          </h2>
          {sectionSub && (
            <p className="mt-4 font-barlow text-base text-neutral-600 md:text-[18px]">
              {sectionSub}
            </p>
          )}
        </header>

        {/* 
            Grid Wrapper: 
            - No gaps, no borders.
            - Uses relative positioning to anchor the custom dividers.
        */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          
          {/* 1. THE MIDDLE HORIZONTAL LINE:
              Centered, 90% width to create the gaps at the ends.
          */}
          <div 
            className="absolute top-1/2 left-1/2 hidden h-[1px] w-[92%] -translate-x-1/2 bg-neutral-700 lg:block" 
            aria-hidden 
          />

          {displayServices.map((service, index) => {
            return (
              <div
                key={service.id}
                className="relative flex h-full flex-col items-center text-center p-8 md:p-12"
              >
                {/* 2. THE VERTICAL DIVIDERS:
                    Shown only between columns. 
                    h-2/3 ensures they don't touch the horizontal line (creates the gap).
                */}
                {(index + 1) % 3 !== 0 && (
                  <div 
                    className="absolute right-0 top-1/2 hidden h-[70%] w-[1px] -translate-y-1/2 bg-neutral-700 lg:block" 
                    aria-hidden 
                  />
                )}

                <div className="flex flex-1 flex-col items-center gap-4">
                  <h3 className="font-montserrat text-xl md:text-[22px] font-bold text-neutral-900">
                    {service.title}
                  </h3>

                  {service.description ? (
                    <div
                      className="flex-1 font-poppins text-[15px] leading-relaxed text-[#6e6e6e] [&_p]:m-0"
                      dangerouslySetInnerHTML={{ __html: markdownPreview(service.description) }}
                    />
                  ) : (
                    <p className="flex-1 font-poppins text-[15px] text-gray-400">No description provided.</p>
                  )}

                  <Link
                    href={phone ? `tel:${phone}` : "#"}
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#E55B20] px-8 py-3.5 font-montserrat text-[13px] font-bold uppercase text-white transition-transform hover:scale-105"
                  >
                    <span>Call us today</span>
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </FullContainer>
  );
}