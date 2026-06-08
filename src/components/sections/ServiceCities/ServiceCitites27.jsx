"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Inter, Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { IMAGE_BASE } from "@/lib/constants";

const serviceCitiesHeadingFont = Rubik({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Call Now button — change colors/size here */
const CALL_NOW_BUTTON = {
  background: "#C1272D",
  textColor: "#ffffff",
  label: "CALL NOW",
  height: "62px",
  maxWidth: "294px",
  paddingX: "28px",
  gap: "8px",
  shadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
  iconSize: 40,
};

function CallNowPhoneIcon({ size = CALL_NOW_BUTTON.iconSize, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M33.0357 19.9253C32.5397 19.4293 32.2917 18.8153 32.2917 18.0833C32.2917 17.3514 32.5397 16.7383 33.0357 16.244C33.5317 15.7497 34.1448 15.5017 34.875 15.5C35.6052 15.4983 36.2192 15.7463 36.7169 16.244C37.2146 16.7417 37.4618 17.3548 37.4583 18.0833C37.4549 18.8118 37.2069 19.4258 36.7143 19.9253C36.2218 20.4247 35.6087 20.6718 34.875 20.6667C34.1413 20.6615 33.5282 20.4135 33.0357 19.9227M28.4167 14.3375L25.7042 11.625C26.9528 10.3764 28.3633 9.41883 29.9357 8.75233C31.5081 8.08583 33.1545 7.75172 34.875 7.75C36.5955 7.74828 38.2428 8.08239 39.8169 8.75233C41.391 9.42228 42.8007 10.3798 44.0458 11.625L41.3333 14.3375C40.4722 13.4764 39.4931 12.809 38.3961 12.3354C37.299 11.8618 36.1253 11.625 34.875 11.625C33.6247 11.625 32.4518 11.8618 31.3565 12.3354C30.2612 12.809 29.2812 13.4764 28.4167 14.3375ZM43.7875 46.5C38.4056 46.5 33.0882 45.3272 27.8354 42.9815C22.5826 40.6358 17.8035 37.3094 13.4979 33.0021C9.19236 28.6948 5.86675 23.9156 3.52108 18.6646C1.17542 13.4135 0.00172222 8.09617 0 2.7125C0 1.9375 0.258333 1.29167 0.775 0.775C1.29167 0.258333 1.9375 0 2.7125 0H13.175C13.7778 0 14.316 0.204944 14.7896 0.614833C15.2632 1.02472 15.5431 1.50867 15.6292 2.06667L17.3083 11.1083C17.3944 11.7972 17.3729 12.3785 17.2437 12.8521C17.1146 13.3257 16.8778 13.7347 16.5333 14.0792L10.2687 20.4083C11.1299 22.0014 12.152 23.5402 13.3352 25.0247C14.5183 26.5093 15.8212 27.9413 17.2437 29.3208C18.5785 30.6556 19.9778 31.8938 21.4417 33.0357C22.9056 34.1775 24.4556 35.2212 26.0917 36.1667L32.1625 30.0958C32.55 29.7083 33.0563 29.4181 33.6815 29.2252C34.3067 29.0324 34.9198 28.9781 35.5208 29.0625L44.4333 30.8708C45.0361 31.0431 45.5312 31.3556 45.9187 31.8086C46.3062 32.2615 46.5 32.767 46.5 33.325V43.7875C46.5 44.5625 46.2417 45.2083 45.725 45.725C45.2083 46.2417 44.5625 46.5 43.7875 46.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ServiceCitiesCallNowButton({ phone, label = CALL_NOW_BUTTON.label }) {
  if (!phone) return null;

  const href = `tel:${phone}`;

  return (
    <a
      href={href}
      className={cn(
        inter.className,
        "inline-flex w-fit flex-row items-center justify-center transition-opacity hover:opacity-90",
      )}
      style={{
        height: CALL_NOW_BUTTON.height,
        maxWidth: CALL_NOW_BUTTON.maxWidth,
        paddingLeft: CALL_NOW_BUTTON.paddingX,
        paddingRight: CALL_NOW_BUTTON.paddingX,
        gap: CALL_NOW_BUTTON.gap,
        backgroundColor: CALL_NOW_BUTTON.background,
        color: CALL_NOW_BUTTON.textColor,
        boxShadow: CALL_NOW_BUTTON.shadow,
      }}
      aria-label={`Call ${phone}`}
    >
      <CallNowPhoneIcon />
      <span className="flex flex-col items-start justify-center leading-none">
        <span className="text-[16px] font-normal leading-none">{label}</span>
        <span className="text-sm font-bold leading-none md:text-[22px]">
          {phone}
        </span>
      </span>
    </a>
  );
}

function ServiceCitiesPinIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: "#CC3333" }}
      className={className}
      aria-hidden
    >
      <path
        d="M12.0001 2C7.58908 2 4.00008 5.589 4.00008 9.995C3.97108 16.44 11.6961 21.784 12.0001 22C12.0001 22 20.0291 16.44 20.0001 10C20.0001 5.589 16.4111 2 12.0001 2ZM12.0001 14C9.79008 14 8.00008 12.21 8.00008 10C8.00008 7.79 9.79008 6 12.0001 6C14.2101 6 16.0001 7.79 16.0001 10C16.0001 12.21 14.2101 14 12.0001 14Z"
        fill="#CC3333"
        style={{ fill: "#CC3333" }}
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function getLocationsList(content, block) {
  const direct = block?.list ?? block?.value?.list;
  if (Array.isArray(direct)) return direct;
  const ref = block?.childrenRef && content?.[block.childrenRef];
  if (Array.isArray(ref)) return ref;
  if (ref && Array.isArray(ref.list)) return ref.list;
  return [];
}

export default function ServiceCities27({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block],
  );
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";
  const mapSrc = buildImageSrc(IMAGE_BASE, "icons/maap.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const callNowLabel =
    (typeof block?.call_now_label === "string" && block.call_now_label.trim()) ||
    (typeof content?.service_benefits?.call_now_label === "string" &&
      content.service_benefits.call_now_label.trim()) ||
    CALL_NOW_BUTTON.label;

  if (cities.length === 0) return null;

  return (
    <FullContainer
      className="overflow-hidden bg-white py-10 md:py-14"
      id="locations"
    >
      <Container className="relative">
        <div className="absolute inset-0 z-0">
          {mapSrc ? (
            <Image
              title="Service Cities Map"
              src={mapSrc}
              alt="Service Cities"
              fill
              className="w-full h-full object-contain object-center opacity-[0.05]"
              loading="lazy"
            />
          ) : null}
          <div className="absolute inset-0 bg-white/90" />
        </div>
        <div className="relative z-10">
          <h2
            className={cn(
              serviceCitiesHeadingFont.className,
              "mb-8 w-full px-2 text-center text-[clamp(1.375rem,4.5vw,45px)] font-bold  font-poppins leading-tight text-[#2D2D2D]",
            )}
          >
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-1">
            {cities.map((city, index) => (
              <div
                key={index}
                className="inline-flex items-center   px-3 py-1.5  w-fit"
              >
                <ServiceCitiesPinIcon className="h-6 w-6 shrink-0" />
                <span className="text-black text-[16px] md:text-[20px] font-medium leading-none font-inter shadow-text">
                  {typeof city === "string"
                    ? city
                    : (city?.name ?? city?.title ?? String(city))}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ServiceCitiesCallNowButton phone={phone} label={callNowLabel} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
