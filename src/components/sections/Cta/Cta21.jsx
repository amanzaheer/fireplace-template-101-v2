"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
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

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function scrollToQuote() {
  const el =
    document.getElementById("quote-form-section") ??
    document.querySelector(
      '.quote-form, [id*="quote"], [class*="quote-form"]',
    );
  if (el) {
    const offset = 80;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }
}

export default function Cta21({ content }) {
  const block = content?.cta ?? {};
  const title = str(block.title ?? block.value?.title);
  const description = str(block.description ?? block.value?.description);
  const ctaImage = str(
    block.image ?? block.value?.image ?? block.file_name ?? block.value?.file_name,
  );
  const ctaImageSrc = buildImageSrc(IMAGE_BASE, ctaImage);
  const primaryCta = str(
    block.button_label ??
      block.value?.button_label ??
      block.button_text ??
      block.value?.button_text ??
      block.cta_button ??
      block.value?.cta_button,
  );
  const points = Array.isArray(block?.points)
    ? block.points
    : Array.isArray(content?.features)
      ? content.features.map((f) => str(f?.text)).filter(Boolean).slice(0, 5)
      : [];
  const phoneCaption = str(
    block.phone_caption ?? block.value?.phone_caption ?? "Call Now:",
  );

  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";     
  const phoneLine = phoneDisplay || phoneCaption;
  const phoneHref = telHref(phoneDisplay);
  const secondaryCta = primaryCta || "Get a Free Estimate";
  if (!title && !description && !secondaryCta && !phoneLine) return null;
  return (
    <FullContainer id="cta" className="bg-white py-8 md:py-10">
      <Container>
        <div
          className={`mx-auto grid w-full max-w-[1110px] grid-cols-1 overflow-hidden rounded-[28px] bg-[#F86503] px-6 py-8 text-white md:px-8 md:py-9 lg:h-[512px] lg:w-[1110px] lg:rounded-[41px] lg:pt-[34px] lg:pr-[110px] lg:pb-[26px] lg:pl-[41px] lg:grid-cols-[1.15fr_0.85fr_1fr] lg:items-center lg:gap-4 ${poppins.className}`}
        >
          <div className="order-2 lg:order-1">
            {title ? (
              <h2 className={`max-w-[519px] h-[172px] text-[42.6px] font-bold leading-[1.15] md:text-[42px] ${poppins.className}`}>
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className={`mt-3 max-w-[500px] text-[14px] font-medium leading-[1.45] text-white/95 md:text-[14px] ${poppins.className}`}>
                {description}
              </p>
            ) : null}

            <div className="mt-6 flex w-fit min-w-[240px] flex-col items-center rounded-[12px] bg-[#e6e6e6] px-5 py-3 text-[#20222c]">
              <span className="text-[18px] font-medium uppercase leading-none">
                {phoneCaption}
              </span>
              <Link
                href={phoneHref}
                className="mt-1 text-[42px] font-bold leading-none tracking-tight md:text-[27.16px]"
              >
                {phoneLine}
              </Link>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            {ctaImageSrc ? (
              <Image
                src={ctaImageSrc}
                alt={title || "CTA image"}
                width={370}
                height={470}
                className="h-auto max-h-[420px] w-auto object-contain"
              />
            ) : null}
          </div>

          <div className="order-3 mt-4 lg:mt-0">
            <ul className="space-y-2.5">
              {points.map((point, index) => (
                <li key={`${point}-${index}`} className={`flex items-start text-[24.7px] font-semibold leading-none gap-3 ${poppins.className}`}>
                  <span className="mt-1 text-[24.7px] font-semibold w[20px] h-[20px] leading-none">
                    ✓
                  </span>
                  <span className="text-[14px] font-medium leading-relaxed md:text-[14px]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToQuote}
              className="mt-6 inline-flex h-[73.3263168334961px] w-[258px] items-center justify-center rounded-[10px] bg-white pt-[2.72px] pr-[1.36px] pb-[2.72px] pl-[1.36px] text-center text-[27.16px] font-bold leading-none tracking-[0] text-[#F86503] transition-colors hover:bg-[#f6f6f6]"
            >
              {secondaryCta}
            </button>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
