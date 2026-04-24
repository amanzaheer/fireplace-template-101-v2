"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Phone } from "lucide-react";
import Link from "next/link";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About16({ content, isEmbedded = false }) {
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

  // All [key] values are resolved by resolveAllTags in page-data.js
  const section = (
    <>
      <div className="-mt-2 bg-white rounded-2xl shadow-xl overflow-hidden md:-mt-4">
          <div className="grid grid-rows-2 lg:grid-rows-1 gap-0">
            <div className="order-2 lg:order-1 flex flex-row justify-center p-4">
              <div className="max-w-lg">
                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-x md:text-2xl lg:text-3xl  font-bold text-gray-900  mb-3">
                      {data?.heading}
                    </h2>
                    <div className="w-16 h-1 'bg-gradient-to-r'from-black to-blue-500 rounded-full "  />
                  </div>

                  <div className="space-y-3 text-gray-600">
                    <p className="text-sm md:text-base text-black leading-relaxed">
                      {data?.description1}
                    </p>
                    <p className="text-black md:text-base leading-relaxed">
                      {data?.description2}
                    </p>
                  </div>

                  {data?.points && data.points.length > 0 && (
                    <ul className="grid grid-rows-2 grid-cols-1 gap-2 mt-4">
                      {data.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-center  gap-2 text-sm text-gray-900"
                        >
                          <svg
                            className="w-4 h-4 text-blue-600 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="embedded-capture"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="embedded-capture"
                            />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative h-[220px] md:h-[300px] lg:h-full min-h-[220px] overflow-hidden">
                {image ? (
                  <Image
                    title="About Image"
                    src={image}
                    alt="About"
                    width={400}
                    height={400}
                    className="block h-full w-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 568px) 100vw, (max-width: 200px) 50vw, 60px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <Link href={`tel:${phone}`}>
            <button
              className="inline-flex w-full min-w-[205px] items-center justify-center gap-2 rounded-none bg-[#F5521B]! px-6 py-3 text-lg font-semibold text-white! shadow transition-all duration-300 hover:bg-[#F5521B]! sm:w-auto"
            >
                <Phone className="w-5 h-5" />
                {phone}
              </button>
          </Link>
        </div>
    </>
  );

  if (isEmbedded) {
    return section;
  }

  return (
    <FullContainer className="pb-10" id="about">
      <Container className="max-w-5xl mt-4 mb-10 md:-mt-6">{section}</Container>
    </FullContainer>
  );
}
