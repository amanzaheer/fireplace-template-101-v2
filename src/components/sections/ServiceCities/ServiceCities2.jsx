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

export default function ServiceCities2({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-white" id="locations">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#212020] tracking-tight mb-8 md:mb-10">
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-5 gap-y-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1.5 w-fit bg-[#f8f8f8] border h-fit border-[#ececec] rounded-[3px] px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              >
                <MapPin className="w-4 h-4 text-[#cf2027] fill-[#cf2027] shrink-0" />
                <span className="text-ink text-sm md:text-base font-medium leading-none ">
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
