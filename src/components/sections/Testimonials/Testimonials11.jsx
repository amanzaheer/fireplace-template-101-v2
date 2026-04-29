"use client";

import React, { useMemo } from "react";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Image from "next/image";
import { Star } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function StarsRow({ rating }) {
  const count = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <div className="flex items-center justify-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={
            n <= count ? "h-8 w-8 fill-[#0b3a57] text-[#0b3a57]" : "h-4 w-4 text-[#177698]"
          }
          strokeWidth={n <= count ? 0 : 1.75}
        />
      ))}
    </div>
  );
}

export default function Testimonials11({ content }) {
  const data = content?.testimonials ?? {};
  const slogan = content?.slogan ?? {};

  const list = Array.isArray(data.list) ? data.list : [];

  const leftTitle =
    typeof slogan.title === "string" && slogan.title.trim() ? slogan.title.trim() : "";
  const leftDescription =
    typeof slogan.description === "string" && slogan.description.trim()
      ? slogan.description.trim()
      : "";

  const companies = useMemo(
    () =>
      [1, 2, 3, 4, 5,]
        .map((n) => buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`))
        .filter(Boolean),
    [],
  );

  const testimonials = useMemo(() => {
    return list.map((t, index) => ({
      ...t,
      image:
        (typeof t?.image === "string" && t.image.trim() ? t.image.trim() : "") ||
        (index === 0 ? "testimonials/testimonials1.png" : "testimonials/testimonials2.jpg"),
      quote:
        (typeof t?.quote === "string" && t.quote.trim() ? t.quote.trim() : "") ||
        (typeof t?.text === "string" && t.text.trim() ? t.text.trim() : ""),
      name: typeof t?.name === "string" ? t.name : "",
      rating: typeof t?.rating !== "undefined" ? t.rating : "",
      subtitle: typeof t?.subtitle === "string" ? t.subtitle : "",
    }));
  }, [list]);
  const sectionTitle = typeof data.title === "string" ? data.title.trim() : "";
  const hasLeft = Boolean(leftTitle || leftDescription || companies.length);
  const hasRight = testimonials.some((t) => t?.quote || t?.name || t?.image);
  if (!hasLeft && !hasRight) return null;
  return (
    <FullContainer id="testimonials" className="bg-white  py-12 md:py-16">
      <Container className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 items-start">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {leftTitle ? (
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0b0b0b]">
                {leftTitle}
              </h2>
            ) : null}
            {leftDescription ? (
              <p className="mt-4 text-sm md:text-base text-[#0b0b0b]/70 max-w-xl">
                {leftDescription}
              </p>
            ) : null}

            {companies.length ? (
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {companies.map((src) => (
               <div
               key={src}
               className="h-16 w-16 rounded-full bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center overflow-hidden"
             >
               <Image
                 src={src}
                 alt=""
                 width={100}
                 height={100}
                 className="h-16 w-16 object-contain"
               />
             </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sectionTitle ? (
              <div className="sm:col-span-2">
                <h3 className="text-center sm:text-left text-lg md:text-xl font-semibold text-[#0b0b0b]">
                  {sectionTitle}
                </h3>
              </div>
            ) : null}

            {testimonials.slice(0, 2).map((t, idx) => (
              <div
                key={`${t?.name ?? ""}-${idx}`}
                className="bg-transparent p-0 flex flex-col"
              >
                {t?.image ? (
                  <div className="relative w-70 h-70 overflow-hidden' aspect-4/3 overflow-hidden">
                    <Image
                      src={buildImageSrc(IMAGE_BASE, t.image)}
                      alt={t?.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {t?.quote ? (
                  <p className="mt-3 text-sm md:text-[15px] leading-[1.35] text-[#000000] text-center">
                    {t.quote}
                  </p>
                ) : null}

                {t?.rating ? (
                  <div className="mt-2">
                    <StarsRow rating={t.rating} />
                  </div>
                ) : null}

                {t?.name ? (
                  <p className="mt-2 text-center text-lg md:text-[px] font-semibold text-[#111]">
                    {t.name}
                  </p>
                ) : null}

                {t?.subtitle ? (
                  <p className="mt-1 text-center text-xs md:text-[16px] text-[#6a6a6a]">
                    {t.subtitle}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
