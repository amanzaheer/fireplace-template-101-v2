"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { IMAGE_BASE } from "@/lib/constants";

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

export default function ServiceCities8({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";
  const mapSrc = buildImageSrc(IMAGE_BASE, "icons/maap.webp");

  if (cities.length === 0) return null;

  return (
    <FullContainer className="overflow-hidden bg-white py-10 md:py-14" id="locations">
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
          <Heading
            text={title}
            className="pb-8 text-[#2b2d33] text-center font-extrabold text-4xl md:text-6xl"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-[#f2f2f2] rounded-sm px-3 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.12)] w-fit"
              >
                <MapPin className="w-4 h-4 text-[#e76f15] flex-shrink-0" />
                <span className="text-[#2f3035] text-[13px] md:text-[14px] font-medium leading-none">
                  {typeof city === "string"
                    ? city
                    : city?.name ?? city?.title ?? String(city)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
