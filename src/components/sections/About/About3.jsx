"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About3({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney pro";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer className="py-10 md:py-14 bg-[#efefef]" id="about">
      <Container className="max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-10 items-start">
          <div className="relative">
            <div className="relative min-h-[320px] md:min-h-[420px] rounded-[28px] overflow-hidden">
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

          <div className="pt-2 md:pt-3">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-none text-[#111111] mb-3">
              {heading}
            </h2>

            <p className="text-base md:text-lg leading-[1.4] text-[#212020]">
              {description1}
            </p>
            <div className="relative">
            <div className=" flex flex-row gap-4 absolute top-0 left-[-250px]">
              <div className="mt-4 md:mt-0 aspect-4/3 h-fit min-w-[400px] bg-[#f3a008] rounded-[26px] p-5 md:p-6 text-white w-full md:w-[80%]">
                <h3 className="text-[40px] md:text-[44px] font-extrabold leading-[1.06]">
                  We Are
                </h3>
                <p className="text-[38px] md:text-[42px] font-extrabold leading-[1.08]">
                  Provide Chimney
                </p>
                <p className="text-[38px] md:text-[42px] font-extrabold leading-[1.08]">
                  best Services
                </p>
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className="mt-4 inline-flex items-center gap-2 rounded-full  text-white px-4 py-2.5 text-[30px] font-bold"
                >
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-[#f3a008]">
                    <Phone className="w-6 h-6 text-white" strokeWidth={4} />
                  </span>
                  {phone || "(888)-249-0566"}
                </a>
              </div>

              {description2 ? (
                <div className="mt-8 md:mt-10">
                  <p className="text-base md:text-lg leading-[1.4] text-[#212020]">
                    {description2}
                  </p>
                </div>
              ) : null}
            </div>
            </div>


          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
