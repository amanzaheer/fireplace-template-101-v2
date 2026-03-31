"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About8({ content }) {
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
  return (
    <FullContainer className="pb-12 bg-gray-50" id="about">
      <Container className="max-w-7xl mx-auto -mt-7 md:-mt-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="max-w-lg">
                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3">
                      {data?.heading}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full" />
                  </div>

                  <div className="space-y-3 text-gray-600">
                    <p className="text-sm md:text-base leading-relaxed">
                      {data?.description1}
                    </p>
                    <p className="text-sm md:text-base leading-relaxed">
                      {data?.description2}
                    </p>
                  </div>

                  {data?.points && data.points.length > 0 && (
                    <ul className="grid grid-cols-2 gap-2 mt-4">
                      {data.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <svg
                            className="w-4 h-4 text-blue-600 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  <PrimaryPhone phone={phone} />
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative h-[300px] md:h-[400px] lg:h-full min-h-[300px] rounded-xl overflow-hidden">
                {image ? (
                  <Image
                    title="About Image"
                    src={image}
                    alt="About"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
