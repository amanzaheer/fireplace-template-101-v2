"use client";

import React, { useMemo } from "react";
import { MapPin } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

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
    <FullContainer className="bg-[#ffffff] py-14 md:py-16 overflow-hidden" id="locations">
      <Container>
        <div className="relative">
          <h2 className={`${poppins.className} text-center text-[#222] text-[22px] md:text-5xl font-bold tracking-tight mb-10 md:mb-12`}>
            {title}
          </h2>
          <div className="grid w-full max-w-6xl mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-10 md:gap-x-12 gap-y-3 md:gap-y-4">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="relative w-[24px] h-[24px] md:w-[24px] md:h-[24px] shrink-0">
                  <MapPin className="w-full h-full text-[#DA4909] fill-[#DA4909]" strokeWidth={1.80} />
                  <span className="absolute top-[4.5px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-white" />
                </span>
                <span className={`${inter.className} text-[#1f1f1f] text-[16px] md:text-[20px] font-regular leading-tight`}>
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