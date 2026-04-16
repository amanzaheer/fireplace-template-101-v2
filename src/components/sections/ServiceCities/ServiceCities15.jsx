"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Inter, Poppins, Rubik } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "700"],
});
function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

export default function ServiceCities3({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-[#ffffff]" id="locations">
      <Container className="max-w-[880px] lg:px-0!">
        <div className="max-w-6xl mx-auto">
          <h2 className={`${poppins.className} text-center text-3xl md:text-[35.5px] font-normal text-[#2d2d2d] tracking-tight mb-8 md:mb-10`}>
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-5 gap-y-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center  gap-1.5 w-fit bg-[#f2f2f2]  h-fit  rounded-[1px] px-1 py-0.5 shadow-[0_2px_2px_0px_rgba(0,0,0,0.2)]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-[15px] shrink-0 md:h-[16px] md:w-[16px]"
                  aria-hidden
                >
                  <path
                    d="M8.58503 0C3.85151 0 8.73997e-05 3.85142 8.73997e-05 8.57958C-0.031033 15.4958 8.25881 21.2306 8.58503 21.4624C8.58503 21.4624 17.2011 15.4958 17.17 8.58495C17.17 3.85142 13.3186 0 8.58503 0ZM8.58503 12.8774C6.21344 12.8774 4.29256 10.9565 4.29256 8.58495C4.29256 6.21336 6.21344 4.29247 8.58503 4.29247C10.9566 4.29247 12.8775 6.21336 12.8775 8.58495C12.8775 10.9565 10.9566 12.8774 8.58503 12.8774Z"
                    fill="#CF1F21"
                  />
                </svg>
                <span className={`${inter.className} text-[12px] md:text-[14px] font-normal leading-tight text-[#000000]`}>
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
