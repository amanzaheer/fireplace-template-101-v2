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

export default function ServiceCities1({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";
  const mapSrc = buildImageSrc(IMAGE_BASE, "icons/maap.webp");

  if (cities.length === 0) return null;

  return (
    <FullContainer className="pt-6 overflow-hidden" id="locations">
      <Container className="relative pb-14 pr-4">
        <div className="absolute inset-0 z-0">
          {mapSrc ? (
            <Image
              title="Service Cities Map"
              src={mapSrc}
              alt="Service Cities"
              fill
              className="w-full h-full object-cover object-center opacity-10"
              loading="lazy"
            />
          ) : null}
          <div className="absolute inset-0 bg-white/40" />
        </div>
        <div className="relative">
          <Heading text={title} className="pb-6 pt-12" />
          <div className="grid md:px-2 z-30 grid-cols-3 gap-y-[6px] gap-x-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center">
                <MapPin className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] mr-[10px] text-primary flex-shrink-0" />
                <span className="text-primary text-[13.5px] md:text-[19.5px] font-barlow font-[500] leading-tight md:leading-none">
                  {typeof city === "string" ? city : city?.name ?? city?.title ?? String(city)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
