"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
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

export default function ServiceCities10({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "";

  if (cities.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-[#ffffff]" id="locations">
      <Container>
        <div className="max-w-6xl mx-auto">
          {title ? (
            <h2 className={`${poppins.className} mb-8 text-center text-3xl font-bold tracking-tight text-[#2d2d2d] md:mb-10 md:text-[44px]`}>
              {title}
            </h2>
          ) : null}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-5 gap-y-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center  gap-1.5 w-fit  h-fit  rounded-[3px] px-2.5 py-0.5"
              >
                <Image src="/st-icons/Temp10/location.png"
                 alt="Map Pin" 
                 width={16} height={16}
                className="w-auto h-5" />
                <span
                  className={`${poppins.className} text-[14px] font-normal leading-tight text-[#000000] [text-shadow:0_1px_2px_rgba(0,0,0,0.18)] md:text-[16px]`}
                >
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
