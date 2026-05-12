"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Poppins,Montserrat,   } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Same badge paths as `Footer21` companies row (`footer/footer1.webp` …). */
const DEFAULT_FOOTER_LOGO_PATHS = [1, 2, 3, 4].map(
  (n) => `footer/footer${n}.webp`,
);

export default function Slogan21({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";

  const logoSrcs = useMemo(() => {
    const custom = block.cert_logos;
    const paths =
      Array.isArray(custom) && custom.some((p) => typeof p === "string" && p)
        ? custom.filter((p) => typeof p === "string" && p)
        : DEFAULT_FOOTER_LOGO_PATHS;
    return paths.map((p) => buildImageSrc(IMAGE_BASE, p)).filter(Boolean);
  }, [block.cert_logos]);

  if (!title && !description && logoSrcs.length === 0) return null;

  return (
    <FullContainer
      id="slogan"
      className={`bg-white py-12 md:py-16 ${montserrat.className}`}
    >
      <Container className="flex flex-col items-center text-center">
        {title ? (
          <h2 className={`text-[40px] sm:text-[56px] md:text-[34px] font-bold  text-black tracking-tight max-w-3xl ${montserrat.className}`}>
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className={`mt-4 md:mt-5 text-[16px] md:text-regular text-[#000000]  leading-relaxed max-w-[640px] mx-auto ${montserrat.className}`}>
            {description}
          </p>
        ) : null}
        {logoSrcs.length > 0 ? (
          <div className="mt-8 md:mt-10 w-[89px] flex h-[89px] items-center justify-center gap-x-1 gap-y-3 sm:gap-x-1.5 md:gap-x-2">
            {logoSrcs.map((src, index) =>
              src ? (
                <div
                  key={`${src}-${index}`}
                  className="flex h-14 sm:h-16 md:h-20 w-[72px] sm:w-[80px] md:w-[88px] items-center justify-center shrink-0"
                >
                  <Image
                    title="Certification badge"
                    src={src}
                    alt={`Certification badge ${index + 1}`}
                    width={140}
                    height={80}
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              ) : null,
            )}
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
