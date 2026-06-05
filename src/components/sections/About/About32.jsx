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

function PhoneCallIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="m17.018 2.048l-.965-.261l-.523 1.93l.966.262a5 5 0 0 1 3.521 3.524l.26.965l1.931-.521l-.26-.965a7 7 0 0 0-4.93-4.934m-.914 3.378l-.965-.261l-.523 1.93l.966.262a1.5 1.5 0 0 1 1.056 1.057l.26.965l1.931-.52l-.26-.966a3.5 3.5 0 0 0-2.465-2.467"
      />
      <path
        fill="currentColor"
        d="M9.58 2H1v1a19.9 19.9 0 0 0 3.196 10.85a20.1 20.1 0 0 0 5.954 5.954A19.9 19.9 0 0 0 21 23h1v-8.58l-6.69-1.487l-1.86 1.86a14.1 14.1 0 0 1-4.242-4.243l1.859-1.86z"
      />
    </svg>
  );
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About32({ content }) {
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
    <FullContainer className="py-10 md:py-14 bg-white mt-12" id="about">
      

      <Container className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.04fr_1fr] gap-8 md:gap-10 lg:gap-12 items-start h-full">
          <div className="relative order-2 lg:order-1 h-full">
            <div className="absolute right-[-12px] md:right-[-20px] top-3 md:top-4 bottom-3 md:bottom-4 w-6 md:w-8 bg-[#efa536] rounded-r-[18px] z-0" />
            <div className="relative h-full rounded-[22px] overflow-hidden z-10">
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

          <div className="order-1 lg:order-2 h-full py-8">
            <p className={`${poppins.className} text-[16px] md:text-[20px] font-normal tracking-wide text-[#111111] mb-2`}>
              {label}
            </p>
            <h2 className={`${poppins.className} text-[32px] sm:text-[36px] md:text-[44px] font-bold leading-[0.95] text-[#111111] mb-3`}>
              {heading}
            </h2>

            <p className={`${poppins.className} text-sm md:text-base lg:text-lg leading-normal text-[#212020]`}>
              {description1}
            </p>
            {description2 ? (
              <p className={`${poppins.className} mt-3 text-sm md:text-base lg:text-lg leading-normal text-[#212020]`}>
                {description2}
              </p>
            ) : null}

            <a
              href={phone ? `tel:${phone}` : "#"}
              className="mt-4 inline-flex items-center gap-2 text-[#111111] font-semibold text-xs md:text-sm uppercase tracking-wide"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E9A61A] text-black">
                <PhoneCallIcon className="w-3.5 h-3.5" />
              </span>
              <span className={`${poppins.className} text-[#111111] font-normal text-sm md:text-base uppercase tracking-wide`}>Contact</span>
            </a>
            <a
              href={phone ? `tel:${phone}` : "#"}
              className={`${poppins.className} block text-[#111111] text-[24px] sm:text-[28px] md:text-[30px] font-extrabold leading-none mt-1`}
            >
              {phone || "(888)-249-0566"}
            </a>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
