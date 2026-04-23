"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { Inter, Rubik, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
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

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function ServiceCities13({ content }) {
  const block = useMemo(() => content?.locations ?? {}, [content]);
  const cities = useMemo(() => getLocationsList(content, block), [content, block]);
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";

  /** Same phone resolution as Cta13 */
  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const callHref = telHref(phoneDisplay);

  if (cities.length === 0) return null;

  return (
    <FullContainer className="py-10 md:py-14 bg-[#ffffff]" id="locations">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className={`${rubik.className} text-center text-3xl md:text-[44px] font-bold text-[#2d2d2d] tracking-tight mb-8 md:mb-10`}>
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 md:gap-x-5 gap-y-3">
            {cities.map((city, index) => {
              const label =
                typeof city === "string" ? city : city?.name ?? city?.title ?? String(city);
              const chipClass =
                "inline-flex items-center gap-1.5 w-fit bg-[#f2f2f2] h-fit rounded-[3px] px-2.5 py-0.5 shadow-[0_2px_2px_0px_rgba(0,0,0,0.2)]";
              return (
                <div key={index} className={chipClass}>
                  <Image src="/st-icons/Temp13/location.png" alt="Map Pin" width={16} height={16} className="w-auto h-5 " />
                  <span className={`${inter.className} text-[14px] md:text-[16px] font-normal leading-tight text-[#000000]`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {phoneDisplay ? (
            <div className="mt-8 flex justify-center md:mt-10">
              <Link
                href={callHref}
                className="inline-flex h-[73.33px] w-[258px] shrink-0 flex-col items-center justify-center rounded-[15px] bg-[#CDE02E] pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center shadow-md transition hover:bg-[#c2d52a]"
              >
                <p
                  className={`${poppins.className} text-[21px] font-medium leading-none text-black`}
                >
                  CALL NOW:
                </p>
                <p
                  className={`${poppins.className} mt-2 text-[27px] font-bold leading-none text-black`}
                >
                  {phoneDisplay}
                </p>
              </Link>
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
