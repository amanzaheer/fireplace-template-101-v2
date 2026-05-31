"use client";

import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { IMAGE_BASE } from "@/lib/constants";



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Slogan23({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";
  const companies = [1, 2, 3, 4, 5].map((n) =>
    buildImageSrc(IMAGE_BASE, `footer/footer${n}.webp`),
  );

  if (!title && !description) return null;

  return (
    <FullContainer id="slogan" className="bg-white pt-6 md:pt-12 pb-10 flex flex-col items-center justify-center">
      <Container className={`text-center flex flex-col items-center justify-center ${poppins.className}`}>
        {title ? (
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="text-base md:text-lg text-black mb-4">
            {description}
          </p>
        ) : null}
      </Container>
      <div className="flex gap-1 mb-2">
                {companies.map((src, index) =>
                  src ? (
                    <div
                      key={index}
                      className="w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[99px] md:h-[99px] mt-2 aspect-square flex items-center justify-center overflow-hidden bg-white rounded-full relative"                    >
                      <Image
                        title="Company logo"
                        src={src}
                        alt="Company Logo"
                        width={60}
                        height={60}
                        className="h-[80%] w-[80%] object-contain"
                      />
                    </div>
                  ) : null,
                )}
              </div>
    </FullContainer>
  );
}
