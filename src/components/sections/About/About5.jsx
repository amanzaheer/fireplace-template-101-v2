"use client";

import Image from "next/image";
import { Check } from "lucide-react";
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

export default function About5(props) {
  const pageContent = props?.content ?? {};
  const about = pageContent?.about ?? {};
  const points = Array.isArray(about.points) ? about.points : [];
  const data = {
    heading: about.heading,
    description1: about.description1,
    description2: about.description2,
    points,
  };

  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");

  const phone =
    pageContent?.contact_info?.phone ?? pageContent?.navbar?.phone ?? "";

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
                      {data.heading ?? "About Us"}
                    </h2>
                    <div className="mb-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/80" />
                    <div className="space-y-3 text-gray-600">
                      {data.description1 ? (
                        <p className="text-sm md:text-base leading-relaxed">
                          {data.description1}
                        </p>
                      ) : null}
                      {data.description2 ? (
                        <p className="text-sm md:text-base leading-relaxed">
                          {data.description2}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {data.points.length > 0 ? (
                    <ul className="mt-4 grid grid-cols-2 gap-2">
                      {data.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Check
                            className="h-4 w-4 shrink-0 text-primary"
                            strokeWidth={2.5}
                            aria-hidden={true}
                          />
                          {String(point)}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {phone ? (
                    <div className="mt-5">
                      <PrimaryPhone phone={phone} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative h-[300px] min-h-[300px] rounded-xl overflow-hidden md:h-[400px] lg:h-full">
                {image ? (
                  <Image
                    title="About Image"
                    src={image}
                    alt={about.altImage ?? about.heading ?? "About"}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}