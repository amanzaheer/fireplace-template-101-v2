"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Rubik, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

export default function About7({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const label = about.label ?? "ABOUT US";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer className="bg-white py-10 md:py-14 mt-8 md:mt-12" id="about">
      <Container className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-center">
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[546px] h-[544px] overflow-hidden rounded-br-[123px] z-10 border-l-11 border-b-11 border-[#3a8ffb]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p
              className={`${poppins.className} text-lg md:text-2xl font-medium tracking-normal text-[#5e5e5e] leading-tight mb-2`}
            >
              {label}
            </p>
            <h2
              className={`${poppins.className} text-[32px] sm:text-[40px] md:text-[46px] font-bold leading-none text-black mb-3`}
            >
              {heading}
            </h2>

            <p
              className={`${poppins.className} text-sm md:text-base leading-[1.55] text-black`}
            >
              {description1}
            </p>
            {description2 ? (
              <p
                className={`${poppins.className} mt-2 text-sm md:text-base leading-[1.55] text-black`}
              >
                {description2}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={phone ? `tel:${phone}` : "#"}
                className={`${rubik.className} inline-flex items-center justify-center gap-2 bg-black text-white h-11 px-5 min-w-[219px] min-h-[46px] rounded font-semibold text-xs uppercase tracking-wide`}
              >
                Call Us Today
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={phone ? `tel:${phone}` : "#"}
                className={`${rubik.className} inline-flex items-center justify-center gap-2 bg-[#0a4da3] text-white h-11 px-5 min-w-[219px] min-h-[46px] rounded font-medium text-lg leading-none`}
              >
                <Image
                  src="/st-icons/Temp2/call1.png"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="w-auto h-4 md:h-[21px]"
                  unoptimized
                />
                {phone || "(888)-249-0566"}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
