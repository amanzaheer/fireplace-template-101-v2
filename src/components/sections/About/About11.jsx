"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

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

export default function About11({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const label = about.label ?? "About Us";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer
      className="relative z-10 bg-[#efa536] py-10 md:py-14"
      id="about"
    >
      <Container className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-center">
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[540px] h-[444px] overflow-hidden">
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
            <p className={`${poppins.className} text-lg md:text-2xl font-medium tracking-normal text-black leading-tight mb-2`}>
              {label}
            </p>
            <h2 className={`${poppins.className} text-[32px] sm:text-[40px] md:text-[46px] font-bold leading-none text-black mb-3`}>
              {heading}
            </h2>

            <p className={`${poppins.className} text-sm md:text-base leading-[1.55] text-black`}>
              {description1}
            </p>
            {description2 ? (
              <p className={`${poppins.className} mt-2 text-sm md:text-base leading-[1.55] text-black`}>
                {description2}
              </p>
            ) : null}

            <div className="mt-5">
              <div
                className={`${poppins.className} flex items-center gap-2 text-black mb-2`}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] bg-black md:h-8 md:w-8">
                  <Image
                    src="/st-icons/Temp2/call1.png"
                    alt=""
                    width={20}
                    height={20}
                    className="h-4 w-auto max-h-4 object-contain brightness-0 invert"
                    unoptimized
                    aria-hidden
                  />
                </div>
                <span className=" uppercase tracking-[0.12em] md:text-[16px]">
                  Contact
                </span>
              </div>
              <a
                href={phone ? `tel:${phone}` : "#"}
                className={`${poppins.className} inline-block text-black text-2xl font-extrabold leading-tight hover:underline md:text-3xl`}
              >
                {phone || "(888)-249-0566"}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
