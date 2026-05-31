"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Roboto, Rubik } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const SCROLL_OFFSET = 100;

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700"],
});

function str(v) {
  if (v == null) return "";
  return String(v).trim();
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function scrollToContactForm() {
  const el =
    document.getElementById("quote-form-section") ??
    document.getElementById("contact-us");
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
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

export default function ServiceCities18({ content }) {
  const router = useRouter();
  const block = content?.locations ?? {};
  const ctaBlock = content?.cta ?? {};
  const cities = useMemo(
    () => getLocationsList(content, block),
    [content, block],
  );
  const title = block?.title ?? block?.value?.title ?? "Areas We Serve";
  const description = block?.description ?? block?.value?.description ?? "";
  const cardImage =
    buildImageSrc(IMAGE_BASE, block?.image ?? block?.value?.image) ||
    buildImageSrc(IMAGE_BASE, "locations/map.webp");

  const quoteLabel = str(
    ctaBlock.button_label ??
      ctaBlock.value?.button_label ??
      ctaBlock.button_text ??
      ctaBlock.value?.button_text ??
      ctaBlock.cta_button ??
      ctaBlock.value?.cta_button,
  );
  const phoneCaption = str(
    ctaBlock.phone_caption ?? ctaBlock.value?.phone_caption ?? "Or call us directly:",
  );
  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const phoneHref = telHref(phoneDisplay);
  const ctaButtonLabel = quoteLabel || "GET A FREE QUOTE";

  const handleQuoteClick = useCallback(() => {
    if (scrollToContactForm()) return;
    router.push("/");
    setTimeout(() => scrollToContactForm(), 500);
  }, [router]);

  if (cities.length === 0) return null;

  return (
    <FullContainer className="overflow-hidden  bg-black py-10 md:py-14" id="locations">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-montserrat text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[54px] lg:leading-[1.12]">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-3 max-w-4xl font-barlow text-base font-medium leading-relaxed text-white md:mt-4 md:text-lg">
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

        <div className="mt-8 flex w-full flex-col items-center sm:mt-10">
          <button
            type="button"
            onClick={handleQuoteClick}
            className={`${rubik.className} inline-flex min-h-[52px] w-full max-w-[520px] items-center justify-center rounded-lg bg-[#FF0011] px-8 py-3 text-base font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-95 sm:w-auto sm:text-lg md:text-[25px]`}
          >
            {ctaButtonLabel}
          </button>
        </div>
      </Container>
    </FullContainer>
  );
}
