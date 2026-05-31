"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { Poppins } from "next/font/google";

function PhoneCallIcon({ className = "h-[40px] w-[40px]" }) {
  return (
    <svg
      className={className}
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M33.0357 19.9253C32.5397 19.4293 32.2917 18.8153 32.2917 18.0833C32.2917 17.3514 32.5397 16.7383 33.0357 16.244C33.5317 15.7497 34.1448 15.5017 34.875 15.5C35.6052 15.4983 36.2192 15.7463 36.7169 16.244C37.2146 16.7417 37.4618 17.3548 37.4583 18.0833C37.4549 18.8118 37.2069 19.4258 36.7143 19.9253C36.2218 20.4247 35.6087 20.6718 34.875 20.6667C34.1413 20.6615 33.5282 20.4135 33.0357 19.9227M28.4167 14.3375L25.7042 11.625C26.9528 10.3764 28.3633 9.41883 29.9357 8.75233C31.5081 8.08583 33.1545 7.75172 34.875 7.75C36.5955 7.74828 38.2428 8.08239 39.8169 8.75233C41.391 9.42228 42.8007 10.3798 44.0458 11.625L41.3333 14.3375C40.4722 13.4764 39.4931 12.809 38.3961 12.3354C37.299 11.8618 36.1253 11.625 34.875 11.625C33.6247 11.625 32.4518 11.8618 31.3565 12.3354C30.2612 12.809 29.2812 13.4764 28.4167 14.3375ZM43.7875 46.5C38.4056 46.5 33.0882 45.3272 27.8354 42.9815C22.5826 40.6358 17.8035 37.3094 13.4979 33.0021C9.19236 28.6948 5.86675 23.9156 3.52108 18.6646C1.17542 13.4135 0.00172222 8.09617 0 2.7125C0 1.9375 0.258333 1.29167 0.775 0.775C1.29167 0.258333 1.9375 0 2.7125 0H13.175C13.7778 0 14.316 0.204944 14.7896 0.614833C15.2632 1.02472 15.5431 1.50867 15.6292 2.06667L17.3083 11.1083C17.3944 11.7972 17.3729 12.3785 17.2437 12.8521C17.1146 13.3257 16.8778 13.7347 16.5333 14.0792L10.2687 20.4083C11.1299 22.0014 12.152 23.5402 13.3352 25.0247C14.5183 26.5093 15.8212 27.9413 17.2437 29.3208C18.5785 30.6556 19.9778 31.8938 21.4417 33.0357C22.9056 34.1775 24.4556 35.2212 26.0917 36.1667L32.1625 30.0958C32.55 29.7083 33.0563 29.4181 33.6815 29.2252C34.3067 29.0324 34.9198 28.9781 35.5208 29.0625L44.4333 30.8708C45.0361 31.0431 45.5312 31.3556 45.9187 31.8086C46.3062 32.2615 46.5 32.767 46.5 33.325V43.7875C46.5 44.5625 46.2417 45.2083 45.725 45.725C45.2083 46.2417 44.5625 46.5 43.7875 46.5Z"
        fill="white"
      />
    </svg>
  );
}

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

export default function ServiceCities23({ content }) {
  const block = content?.locations ?? {};

  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block]
  );

  const title =
    block?.title ??
    block?.value?.title ??
    "Areas We Serve";

  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";
  if (cities.length === 0) return null;

  return (
    <FullContainer
      className="bg-[#ffffff] py-10 md:py-14"
      id="locations"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          
          {/* TITLE */}
          <h2
            className={`${poppins.className} mb-8 text-center text-3xl font-bold tracking-tight text-[#2d2d2d] md:mb-10 md:text-[44px]`}
          >
            {title}
          </h2>

          {/* CITIES */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-6">
            
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex h-fit w-fit items-center gap-2 rounded-[3px] px-2.5 py-1"
              >
                {/* LOCATION ICON */}
                <Image
                  src="/st-icons/Temp12/location.png"
                  alt="Map Pin"
                  width={16}
                  height={16}
                  className="h-5 w-auto brightness-0 saturate-100"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(14%) sepia(98%) saturate(7491%) hue-rotate(1deg) brightness(103%) contrast(118%)",
                  }}
                />

                {/* CITY NAME */}
                <span
                  className={`${poppins.className} text-[14px] font-normal leading-tight text-[#000000] md:text-[16px]`}
                >
                  {typeof city === "string"
                    ? city
                    : city?.name ??
                      city?.title ??
                      String(city)}
                </span>
              </div>
            ))}
          </div>
          {phone ? (
            <div className="mt-10 flex justify-center md:mt-12">
              <Link
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={`${poppins.className} inline-flex h-[62px] w-[294px] items-center gap-3 rounded-[100px] bg-[#D32F2F] px-[28px] text-white shadow-lg transition-colors hover:bg-[#b71c1c]`}
              >
                <span
                  className="flex shrink-0 items-center justify-center text-white"
                  aria-hidden
                >
                  <PhoneCallIcon />
                </span>
                <span className="flex min-w-0 flex-1 flex-col items-center justify-center text-center leading-none">
                  <span
                    className={`${poppins.className} text-[16px] font-medium leading-none tracking-normal text-white`}
                  >
                    Call Now
                  </span>
                  <span
                    className={`${poppins.className} mt-0.5 max-w-full truncate text-center text-[20px] font-bold leading-none tracking-normal text-white`}
                  >
                    {phone}
                  </span>
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}