"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { ShieldCheck, Play, PhoneCall } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About28({ content }) {
  const about = content?.about ?? {};
  const data = {
    heading: about.heading ?? "",
    description1: about.description1 ?? "",
    description2: about.description2 ?? "",
  };
  const mainImage =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const secondImage =
    buildImageSrc(IMAGE_BASE, about.file_name2) ||
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about2.png");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const features = resolveRefArray(content, about, "points");
  const featureItems = (features?.length ? features : content?.features ?? [])
    .slice(0, 2)
    .map((item) => (typeof item === "string" ? item : item?.text))
    .filter(Boolean);
  const aboutHeadingParts = String(data.heading).split(/in/i);
  const headingPrimary = aboutHeadingParts[0]?.trim() || "Trusted Experts";
  const headingAccent = aboutHeadingParts[1]?.trim() || " Services";

  return (
    <FullContainer className="bg-white py-12 md:py-16" id="about">
      <Container className="mx-auto max-w-[1100px] px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.02fr_1fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-3">
              <div className="relative h-[260px] w-full overflow-visible border border-[#d9d9d9] bg-white md:h-[380px] md:w-[530px]">
                {mainImage ? (
                  <Image
                    title="About Image"
                    src={mainImage}
                    alt="About main"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 530px"
                  />
                ) : null}
                <span className="absolute right-0 top-1/2 z-20 flex h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7b6be]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cf2f38]">
                    <Play className="h-4 w-4 fill-white text-white" />
                  </span>
                </span>
              </div>

            </div>

            <div className="mt-3 grid grid-cols-[1fr_auto] gap-1">
              <div className="relative h-[220px] w-full overflow-hidden border border-[#d9d9d9] bg-white md:w-[393px]">
                {secondImage ? (
                  <Image
                    title="About Secondary Image"
                    src={secondImage}
                    alt="About secondary"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 393px"
                  />
                ) : null}
              </div>
              <div className="hidden h-[220px] w-[134px] items-center justify-center  bg-[#2b78b8] text-center text-white md:flex">
                <span className="rotate-180 text-[27px] font-semibold leading-none [writing-mode:vertical-rl] font-poppins">
                  15+ Year Experience
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-[38px] font-extrabold uppercase leading-[1.05] text-black md:text-[52px]">
              {headingPrimary}
              <br />
              <span className="text-[#bf2f35]"> {headingAccent}</span>
            </h2>

            <p className="mt-4 text-[14px] leading-[1.6] text-[#2a2a2a] md:text-[16px] font-roboto">
              {data.description1}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 border-b border-[#cc3333] pb-4 md:grid-cols-2">
              {featureItems.map((feature, index) => (
                <div key={`${feature}-${index}`} className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-5 w-5 shrink-0 text-[#bf2f35]"
                    strokeWidth={2.3}
                  />
                  <span className="text-[22px] font-medium leading-tight text-[#212121]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#cc3333] text-white">
                <PhoneCall className="h-7 w-7" />
              </span>
              <div>
                <p className="text-[20px] font-semibold leading-tight text-[#1f1f1f]">
                  Need Help?
                </p>
                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="text-[24px] font-bold font-roboto leading-tight text-[#cc6a2b]"
                  >
                    {phone}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
