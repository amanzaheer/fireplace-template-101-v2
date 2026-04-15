"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

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

export default function ServiceCities14({ content }) {
  const block = content?.locations ?? {};
  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block],
  );
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";
  const description = block?.description ?? block?.value?.description ?? "";
  const cardImage =
    buildImageSrc(IMAGE_BASE, block?.image ?? block?.value?.image) ||
    buildImageSrc(IMAGE_BASE, "locations/map.webp");

  if (cities.length === 0) return null;

  return (
    <FullContainer className="overflow-hidden  py-10 md:py-14" id="locations">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-montserrat text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-[54px] lg:leading-[1.12]">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-3 max-w-4xl font-barlow text-base font-medium leading-relaxed text-black/80 md:mt-4 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-8 overflow-x-auto pb-3 md:mt-10">
          <div className="grid min-w-max grid-flow-col grid-rows-3 gap-3 md:gap-4">
            {cities.map((city, index) => (
              <div
                key={index}
                className="relative h-[92px] w-[220px] overflow-hidden rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
              >
                {cardImage ? (
                  <Image
                    title={
                      typeof city === "string"
                        ? city
                        : (city?.name ?? city?.title ?? String(city))
                    }
                    src={cardImage}
                    alt={
                      typeof city === "string"
                        ? city
                        : (city?.name ?? city?.title ?? String(city))
                    }
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                    sizes="220px"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-300" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-md bg-white/75 px-3 py-1 backdrop-blur-[1px]">
                  <span className="whitespace-nowrap font-rubik text-[12px] font-semibold leading-none text-black md:text-[13px]">
                    {typeof city === "string"
                      ? city
                      : (city?.name ?? city?.title ?? String(city))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
