"use client";

import React, { useMemo } from "react";
import { MapPin } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

export default function ServiceCities5({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;

  return (
    <FullContainer className="bg-[#f2f2f2] py-14 md:py-16 overflow-hidden" id="locations">
      <Container>
        <div className="relative">
          <h2 className="text-center text-[#222] text-4xl md:text-5xl font-extrabold tracking-tight mb-10 md:mb-12">
            {title}
          </h2>
          <div className="grid w-full max-w-6xl mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 md:gap-x-12 gap-y-3 md:gap-y-4">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center gap-2">
                <MapPin className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-[#cf8a0d] flex-shrink-0" />
                <span className="text-[#1f1f1f] text-[18px] md:text-[20px] font-semibold leading-tight">
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