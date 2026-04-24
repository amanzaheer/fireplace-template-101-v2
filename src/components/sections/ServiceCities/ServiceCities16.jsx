"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

function LocationPinIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
    >
      <path
        d="M12.8088 5.33691C9.27755 5.33691 6.40436 8.01858 6.40436 11.3107C6.38115 16.1264 12.5654 20.1193 12.8088 20.2807C12.8088 20.2807 19.2364 16.1264 19.2132 11.3144C19.2132 8.01858 16.34 5.33691 12.8088 5.33691ZM12.8088 14.3032C11.0396 14.3032 9.60658 12.9657 9.60658 11.3144C9.60658 9.66315 11.0396 8.32568 12.8088 8.32568C14.578 8.32568 16.011 9.66315 16.011 11.3144C16.011 12.9657 14.578 14.3032 12.8088 14.3032Z"
        fill="#F5521B"
      />
    </svg>
  );
}

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

function cityLabel(city) {
  return typeof city === "string"
    ? city
    : (city?.name ?? city?.title ?? String(city));
} 

export default function ServiceCities16({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;
  return (
    <FullContainer className="bg-white py-10 md:py-14 lg:py-16" id="locations">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold leading-tight text-[#000000] sm:text-3xl md:text-4xl">
            {title}
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:mt-10 md:grid-cols-4 lg:grid-cols-6">
            {cities.map((city, index) => (
              <div
                key={index}
                className="flex w-[183.596px] max-w-full shrink-0 items-center justify-self-center gap-2 rounded-[2.135px] border-[0.534px] border-solid border-[#000000] bg-white px-[4.27px] py-[5.337px] shadow-[0_2.135px_2.135px_0_rgba(0,0,0,0.14)]"
              >
                <LocationPinIcon className="h-[26px] w-[26px] shrink-0" />
                <span className="min-w-0 wrap-break-words text-left text-[13px] font-normal leading-snug text-[#000000] sm:text-sm md:text-[15px]">
                  {cityLabel(city)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
