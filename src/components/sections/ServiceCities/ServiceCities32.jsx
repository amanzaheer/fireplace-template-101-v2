"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins, Inter, Rubik, Archivo } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function MapPinIcon({ className = "w-7 h-7 text-[#d98200]" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.5 21C4.5 10.23 13.23 1.5 24 1.5S43.5 10.23 43.5 21c0 6.987-3.606 12.865-7.526 17.203c-3.932 4.351-8.326 7.316-10.237 8.506a3.26 3.26 0 0 1-3.474 0c-1.91-1.19-6.305-4.155-10.237-8.506C8.106 33.865 4.5 27.987 4.5 21M24 29a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
        clipRule="evenodd"
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

export default function ServiceCities32({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;

  return (
    <FullContainer className={`py-10 md:py-14 bg-white `} id="locations">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className={`${poppins.className} text-center text-4xl md:text-[44px] font-bold text-[#2d2d2d] tracking-tight mb-8 md:mb-10`}>
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-5 gap-y-3">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-0.5 w-fit h-fit px-2.5 py-1"
              >
                <MapPinIcon className="w-4.5 h-4.5 text-[#d98200] shrink-0" />
                <span className={`${inter.className} text-ink text-sm md:text-base font-normal leading-none drop-shadow-sm`}>
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
