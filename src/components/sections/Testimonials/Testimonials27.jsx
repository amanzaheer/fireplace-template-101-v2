"use client";

import React, { useEffect, useMemo, useState } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { IMAGE_BASE } from "@/lib/constants";
import { Slogan27Content } from "@/components/sections/Slogan/Slogan27";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CARD_WIDTH = 273;
const CARD_GAP = 17;
const CARD_IMAGE_HEIGHT = 273;

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Testimonials27({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];

  const serviceImages = useMemo(() => {
    const imageBase = IMAGE_BASE;
    return Array.isArray(content?.services)
      ? content.services.map((item) =>
          buildImageSrc(
            imageBase,
            item?.image ||
              item?.file_name ||
              item?.thumbnail ||
              item?.photo ||
              "",
          ),
        )
      : [];
  }, [content]);

  const items = useMemo(() => {
    return testimonials
      .map((item, index) => {
        const image =
          serviceImages[index % Math.max(1, serviceImages.length)] || "";
        const quote = item?.quote ?? item?.text ?? item?.review ?? "";
        const name = item?.name ?? item?.author ?? "";
        const role = item?.designation ?? item?.title ?? "";
        return {
          id: item?.id ?? `${index}-${name}`,
          image,
          quote,
          name,
          role,
        };
      })
      .filter((item) => item.image && (item.quote || item.name));
  }, [testimonials, serviceImages]);

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const visibleCount = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, items.length - visibleCount);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [maxIndex]);

  if (!items.length) return null;

  return (
    <FullContainer id="testimonials" className="bg-[#ededed] py-10 md:py-14">
      <Container className="px-4">
        <div className="mx-auto flex max-w-[1260px] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="w-full lg:max-w-[45%]">
            <Slogan27Content content={content} showBadges align="center" />
          </div>

          <div className="flex w-full justify-center lg:w-auto lg:justify-end">
            <div
              className="overflow-hidden"
              style={{
                width: isMobile
                  ? `${CARD_WIDTH}px`
                  : `${CARD_WIDTH * 2 + CARD_GAP}px`,
                maxWidth: "100%",
              }}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  gap: `${CARD_GAP}px`,
                  transform: `translateX(-${activeIndex * (CARD_WIDTH + CARD_GAP)}px)`,
                }}
              >
                {items.map((item) => (
                  <article
                    key={item.id}
                    className={`${poppins.className} flex w-[273px] shrink-0 flex-col items-center bg-transparent text-center`}
                    style={{ gap: `${CARD_GAP}px` }}
                  >
                    <div
                      className="relative w-[273px]  overflow-hidden"
                      style={{ height: `${CARD_IMAGE_HEIGHT}px` }}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="273px"
                          unoptimized
                        />
                      ) : (
                        <div className="h-full w-full bg-neutral-200" />
                      )}
                    </div>

                    <p className="px-1 text-[15px] leading-tight text-[#2a2a2a]">
                      {item.quote}
                    </p>

                    <FiveStars
                      className="justify-center"
                      starClassName="!text-[#c41e16]"
                    />

                    <h3 className="text-[20px] font-semibold leading-none text-[#111]">
                      {item.name}
                    </h3>

                    <p className="text-[13px] font-medium leading-none text-[#767676]">
                      {item.role}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
