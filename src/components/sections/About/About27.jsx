"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About27({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const description = [description1, description2].filter(Boolean).join(" ");
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone =
    content?.banner?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const phoneHref = phoneDisplay ? `tel:${phoneDisplay.replace(/[^\d+]/g, "")}` : "#";

  return (
    <FullContainer className="bg-white py-12 md:py-16" id="about">
      <Container className="max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="order-1">
            <div className="relative mx-auto h-[545px] w-[545px] max-w-full overflow-hidden rounded-[21px]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  width={545}
                  height={545}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 545px"
                />
              ) : (
                <div className="aspect-square w-full bg-gray-200" />
              )}
            </div>
          </div>

          <div className="order-2">
            {heading ? (
              <h2 className="max-w-[560px] text-[40px] font-bold leading-[1.15] text-black md:text-[52px]">
                {heading}
              </h2>
            ) : null}

            {description ? (
              <p className="mt-4 max-w-[620px] text-[15px] font-poppins leading-relaxed font-medium text-[#2d2d2d] md:text-[14px]">
                {description}
              </p>
            ) : null}

            {phoneDisplay ? (
              <a
                href={phoneHref}
                className="mt-7 inline-flex min-h-[74px] min-w-[250px] flex-col items-center  justify-center bg-[#BF1309] px-6 py-2 text-white transition hover:opacity-95"
              >
                <span className="text-[20px] font-semibold uppercase leading-none md:text-[21px]">
                  Call Now:
                </span>
                <span className="mt-1 text-[40px] font-bold leading-none md:text-[27px]">
                  {phoneDisplay}
                </span>
              </a>
            ) : null}
          </div>
            </div>
      </Container>
    </FullContainer>
  );
}
