"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About2({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "About Chimney Services";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const ribbonText = about.value ?? description1;
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");

  return (
    <FullContainer className="py-10 md:py-14 bg-white" id="about">
      <Container className=" mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-ink mb-1">
            {heading}
          </h2>
            <p className="mt-4 text-ink text-sm md:text-base leading-6 max-w-4xl mx-auto">
              {description1}
            </p>
            {description2 ? (
              <p className="mt-2 text-ink text-sm md:text-base leading-6 max-w-4xl mx-auto">
                {description2}
              </p>
            ) : null}
          </div>

          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[2.3fr_1fr] rounded-2xl overflow-hidden">
            <div className="bg-[#cf2027] text-white p-6 md:p-7 flex items-center">
              <p className="text-sm md:text-base leading-6 font-medium">
                {ribbonText}
              </p>
            </div>
            <div className="relative min-h-[180px] md:min-h-[180px]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt="About"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
