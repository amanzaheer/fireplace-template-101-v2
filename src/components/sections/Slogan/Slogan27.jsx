"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function getBadgeSources(footer) {
  const extra = footer?.badge_images;
  if (Array.isArray(extra) && extra.length > 0) {
    return extra
      .map((p) => (typeof p === "string" ? buildImageSrc(IMAGE_BASE, p) : ""))
      .filter(Boolean);
  }
  return [];
}

export function Slogan27Content({ content, showBadges = true, align = "center" }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";
  const footer = content?.footer ?? {};
  const badgeSources = getBadgeSources(footer);
  const center = align === "center";

  if (!title && !description && badgeSources.length === 0) return null;

  return (
    <div
      className={`flex w-full flex-col ${center ? "items-center justify-center text-center" : "items-start text-left"} ${montserrat.className}`}
    >
      <div
        className={`flex w-full flex-col ${center ? "items-center justify-center text-center" : "items-start text-left"}`}
      >
        {title ? (
          <h2
            className="w-full max-w-[620px]"
            style={{
              color: "#111",
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
        ) : null}

        {description ? (
          <p
            className="mt-5 w-full max-w-[620px]"
            style={{
              color: "#4B4B4B",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: "1.45",
            }}
          >
            {description}
          </p>
        ) : null}

        {showBadges && badgeSources.length > 0 ? (
          <div
            className={`mt-8 flex w-full items-center gap-x-5 gap-y-4 sm:flex-wrap md:mt-10 md:gap-x-7 ${center ? "justify-center" : "justify-start"}`}
          >
            {badgeSources.map((src, index) => (
              <div
                key={src + index}
                className="relative flex h-12 w-auto shrink-0 items-center justify-center sm:h-14 md:h-16"
              >
                <Image
                  src={src}
                  alt=""
                  width={140}
                  height={70}
                  className="h-full w-auto max-w-[92px] object-contain sm:max-w-[105px] md:max-w-[120px]"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Slogan27({ content }) {
  return (
    <FullContainer
      id="slogan"
      className="flex flex-col items-center justify-center bg-white pb-12 pt-8 md:pb-16 md:pt-14"
    >
      <Container className="w-full">
        <Slogan27Content content={content} />
      </Container>
    </FullContainer>
  );
}
