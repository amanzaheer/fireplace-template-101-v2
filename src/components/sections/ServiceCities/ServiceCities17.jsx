"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";

const serviceCitiesHeadingFont = Rubik({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

function ServiceCitiesPinIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: "#FF0504" }}
      className={className}
      aria-hidden
    >
      <path
        d="M12.0001 2C7.58908 2 4.00008 5.589 4.00008 9.995C3.97108 16.44 11.6961 21.784 12.0001 22C12.0001 22 20.0291 16.44 20.0001 10C20.0001 5.589 16.4111 2 12.0001 2ZM12.0001 14C9.79008 14 8.00008 12.21 8.00008 10C8.00008 7.79 9.79008 6 12.0001 6C14.2101 6 16.0001 7.79 16.0001 10C16.0001 12.21 14.2101 14 12.0001 14Z"
        fill="#FF0504"
        style={{ fill: "#FF0504" }}
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

export default function ServiceCities17({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block],
  );
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";
  const mapSrc = buildImageSrc(IMAGE_BASE, "icons/maap.webp");

  if (cities.length === 0) return null;

  return (
    <FullContainer
      className="overflow-hidden bg-white py-10 md:py-14"
      id="locations"
    >
      <Container className="relative">
        <div className="absolute inset-0 z-0">
          {mapSrc ? (
            <Image
              title="Service Cities Map"
              src={mapSrc}
              alt="Service Cities"
              fill
              className="w-full h-full object-contain object-center opacity-[0.05]"
              loading="lazy"
            />
          ) : null}
          <div className="absolute inset-0 bg-white/90" />
        </div>
        <div className="relative z-10">
          <h2
            className={cn(
              serviceCitiesHeadingFont.className,
              "mb-8 w-full px-2 text-center text-[clamp(1.375rem,4.5vw,45px)] font-bold leading-tight text-[#2D2D2D]",
            )}
          >
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-[#f2f2f2] rounded-sm px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.12)] w-fit"
              >
                <ServiceCitiesPinIcon className="h-6 w-6 shrink-0" />
                <span className="text-[#2f3035] text-[13px] md:text-[14px] font-medium leading-none">
                  {typeof city === "string"
                    ? city
                    : (city?.name ?? city?.title ?? String(city))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
