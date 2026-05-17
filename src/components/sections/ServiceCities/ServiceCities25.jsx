"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import {Poppins, Inter, Rubik} from "next/font/google";
import { getCityLocationHref } from "@/lib/location-routing";

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

const rubik = Rubik({
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

export default function ServiceCities25({ content }) {
  const block = useMemo(() => content?.locations ?? {}, [content]);
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  if (cities.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-[#ffffff]" id="locations">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className={`${rubik.className} text-center text-3xl md:text-[44px] font-bold text-[#2d2d2d] tracking-tight mb-8 md:mb-10`}>
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-7 gap-y-6">
            {cities.map((city, index) => {
              const label =
                typeof city === "string" ? city : city?.name ?? city?.title ?? String(city);
              const href = getCityLocationHref(content, city);
              const chipClass =
                "inline-flex items-center gap-1.5 w-fit bg-[#f2f2f2] h-fit rounded-[3px] px-2.5 py-0.5 shadow-[0_2px_2px_0px_rgba(0,0,0,0.2)]";
              return href ? (
                <Link
                  key={index}
                  href={href}
                  className={`${chipClass} text-[#000000] no-underline hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d2d2d]`}
                >
                  <Image src="/st-icons/Temp2/map-pin.png" alt="" width={16} height={16} className="w-auto h-5" />
                  <span className={`${inter.className} text-[14px] md:text-[16px] font-normal leading-tight text-[#000000]`}>
                    {label}
                  </span>
                </Link>
              ) : (
                <div key={index} className={chipClass}>
                  <Image src="/st-icons/Temp2/map-pin.png" alt="Map Pin" width={16} height={16} className="w-auto h-5" />
                  <span className={`${inter.className} text-[14px] md:text-[16px] font-normal leading-tight text-[#000000]`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
