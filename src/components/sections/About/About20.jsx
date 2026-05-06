"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { PhoneCall } from "lucide-react";
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

export default function About20({ content }) {
  const about = content?.about ?? {};
  const data = {
    heading: about.heading,
    description1: about.description1,
    description2: about.description2,
    points: about.points,
  };
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const points = Array.isArray(data?.points) ? data.points : [];

  // All [key] values are resolved by resolveAllTags in page-data.js
  return (
    <FullContainer className="bg-[#ffffff] py-8 md:py-10" id="about">
      <Container className="max-w-[1360px]">
        <div className="overflow-hidden rounded-none shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[560px]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </div>

            <div className="flex items-center bg-[#3f5fb4] px-6 py-10 sm:px-10 md:px-12 lg:px-10 xl:px-14">
              <div className="max-w-[560px]">
                <h2 className={`text-3xl font-extrabold leading-tight text-white md:text-[42px] ${poppins.className}`}>
                  {data?.heading}
                </h2>

                <div className={`mt-6 space-y-3 text-sm leading-7  text-[#e9eeff] md:text-[16px] ${poppins.className}`}>
                  {data?.description1 ? <p>{data.description1}</p> : null}
                  {data?.description2 ? <p>{data.description2}</p> : null}
                </div>

                {points.length > 0 ? (
                  <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-white md:grid-cols-2 md:text-base ${poppins.className}">
                    {points.slice(0, 6).map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className={`mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/80 text-[10px] leading-none ${poppins.className}`}>
                          ✓
                        </span>
                        <span className={`leading-6 ${poppins.className}`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-8 inline-flex items-center gap-4">
                  <span className="inline-flex h-[81.694px] w-[81.694px] items-center justify-center gap-[12.01px] rounded-[40.85px] bg-[#df3b34] px-[18.02px] pt-[22.83px] pb-[15.62px] text-white">
                    <span className="inline-flex h-[43.446px] w-[45.653px] items-center justify-center p-[3.65px]">
                      <PhoneCall className="h-full w-full" />
                    </span>
                  </span>
                  <div>
                    <p className={`text-[20.19px] leading-none text-[#dfe8ff] ${poppins.className}`}>Need Help?</p>
                    <a
                      href={phone ? `tel:${phone}` : "#"}
                      className={`mt-1 block text-[24.23px]  leading-none text-white ${poppins.className}`}>
                      {phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
