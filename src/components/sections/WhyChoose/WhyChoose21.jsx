"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const ACCENT = "#F86503";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function WhyChoose21({ content }) {
  const block = content?.why_choose ?? {};
  const sectionTitle =
    block.section_title ??
    block.top_title ??
    "";
  const sectionSubtitle =
    block.section_subtitle ??
    block.top_subtitle ??
    block.tagline ??
    "";
  const heading = block.heading ?? "";
  const description = block.description ?? "";
  const features = resolveRefArray(content, block, "features")
    .map((item) =>
      typeof item === "object"
        ? item?.text ?? item?.title ?? ""
        : typeof item === "string"
          ? item
          : "",
    )
    .filter(Boolean)
    .slice(0, 4);

  const mainImagePath =
    block.main_image ?? block.file_name_main ?? block.file_name ?? "why-us/whychoose1.png";
  const mainImageSrc = buildImageSrc(IMAGE_BASE, mainImagePath);
  const rawPhone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneDisplay = rawPhone.trim() || "(888)-249-0566";
  const telHref = rawPhone.trim()
    ? `tel:${rawPhone.replace(/[^\d+]/g, "")}`
    : "tel:+18882490566";

  const showHeader = Boolean(sectionTitle || sectionSubtitle);
  const hasBody =
    Boolean(heading) ||
    Boolean(description) ||
    features.length > 0 ||
    Boolean(mainImageSrc);

  if (!showHeader && !hasBody) return null;

  return (
    <FullContainer
      id="whychooseus"
      className={`bg-white py-12 md:py-16 lg:py-20 ${poppins.className}`}
    >
      <Container className="max-w-6xl">
        {showHeader ? (
          <header className="mb-10 text-center md:mb-14">
            {sectionTitle ? (
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-[40px] md:leading-tight">
                {sectionTitle}
              </h2>
            ) : null}
            {sectionSubtitle ? (
              <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed text-[#333] sm:text-base md:text-[17px]">
                {sectionSubtitle}
              </p>
            ) : null}
          </header>
        ) : null}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-1 w-full">
            <div
              className="relative mx-auto w-full max-w-[525px] overflow-hidden rounded-[37px] bg-[#eaeaea] shadow-[0_16px_40px_rgba(0,0,0,0.1)] lg:mx-0"
              style={{ aspectRatio: "525 / 478" }}
            >
              {mainImageSrc ? (
                <Image
                  src={mainImageSrc}
                  alt={heading ? heading : "Why choose us"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) min(100vw, 525px), 525px"
                  loading="lazy"
                  unoptimized
                />
              ) : null}
            </div>
          </div>
          <div className="order-2 flex  flex-col lg:pl-2">
            {heading ? (
              <h3 className="text-left text-[28px] font-bold leading-[1.15] tracking-tight text-black sm:text-[32px] md:text-[36px]">
                {heading}
              </h3>
            ) : null}

            {description ? (
              <p className="mt-4 text-left text-[15px] leading-[1.75] text-[#4a4a4a] md:text-base">
                {description}
              </p>
            ) : null}

            {features.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-6  sm:grid-cols-2 sm:gap-3.5">
                {features.map((item, idx) => (
                  <div
                    key={`why-feature-${idx}`}
                    className="flex items-center"
                    style={{
                      width: "228px",
                      height: "37px",
                      gap: "5px",
                      borderRadius: "8px",
                      paddingTop: "4px",
                      paddingRight: "13px",
                      paddingBottom: "4px",
                      paddingLeft: "13px",
                      opacity: 1,
                      backgroundColor: ACCENT,
                    }}
                  >
                    <span className="flex h-[29px] w-[29px] shrink-0  items-center justify-center">
                      <ShieldCheck
                        className="relative"
                        strokeWidth={2.5}
                        aria-hidden
                        style={{
                          width: "35.75px",
                          height: "26.58333396911621px",
                          top: "1.21px",
                          left: "3.63px",
                          opacity: 1,
                          color: "#ffffff",
                        }}
                      />
                    </span>
                    <span className="text-left text-[10px]  font-semibold leading-snug text-white sm:text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            <a
              href={telHref}
              className="mt-[8.72px] flex flex-col items-center justify-center text-center font-bold text-white transition-[filter]"
              style={{
                width: "258px",
                height: "73.3263168334961px",
                borderRadius: "10px",
                paddingTop: "2.72px",
                paddingRight: "1.36px",
                paddingBottom: "2.72px",
                paddingLeft: "1.36px",
                opacity: 1,
                backgroundColor: ACCENT,
              }}
            >
              <span className="text-[24.73px] font-bold uppercase  sm:text-sm">
                Call now
              </span>
              <span className="h-[41px] w-[220px] text-[27.16px] font-bold leading-none">
                {phoneDisplay}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
