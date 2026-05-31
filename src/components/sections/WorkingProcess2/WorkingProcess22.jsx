"use client";
 
import React from "react";
import Image from "next/image";
import { Poppins, Montserrat } from "next/font/google";
 
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
 
const poppins = Poppins({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
 
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
 
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
 
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
 
  return `${basePath}/${filePath.replace(/^\//, "")}`;
}

const DEFAULT_IMAGES = [
  "services/fireplace-repair.webp",
  "services/fireplace-cleaning.webp",
  "services/fireplace-maintenance.webp",
  "services/gas-fireplace.webp",
  "services/fireplace-inspection.webp",
];

function resolveImagePaths(block) {
  if (!block || typeof block !== "object") return [];

  const fromImages = block.images;
  if (Array.isArray(fromImages)) {
    return fromImages
      .map((item) => {
        if (typeof item === "string" && item.trim()) return item.trim();
        if (item && typeof item === "object") {
          const path = item.file_name ?? item.image ?? item.src;
          return typeof path === "string" ? path.trim() : "";
        }
        return "";
      })
      .filter(Boolean);
  }
  if (typeof fromImages === "string" && fromImages.trim()) {
    return [fromImages.trim()];
  }

  const fileName = block.file_name;
  if (Array.isArray(fileName)) {
    return fileName.filter((x) => typeof x === "string" && x.trim());
  }
  if (typeof fileName === "string" && fileName.trim()) {
    return [fileName.trim()];
  }

  return [];
}
 
export default function OurWorkingProcess22({ content }) {
  const data = content?.workingprocess2 ?? content?.our_process ?? {};
 
  const heading = data?.title ?? "Our Works";
 
  const imagePaths = resolveImagePaths(data);
  const images = imagePaths.length ? imagePaths : DEFAULT_IMAGES;
 
  const stats = Array.isArray(data?.stats)
    ? data.stats
    : [
        { value: "261", label: "Activate Project" },
        { value: "97", label: "Customer Satisfaction" },
        { value: "48", label: "Awards Winning" },
        { value: "125", label: "Expert Team" },
      ];
 
  const imageItems = images
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => buildImageSrc(IMAGE_BASE, item));
 
  if (!imageItems.length) return null;
 
  return (
    <FullContainer
      id="workingprocess2"
      className="bg-[#ffffff] py-10 md:py-14 overflow-hidden"
    >
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-10 text-center">
          {/* <h2
            className={`${poppins.className} text-[34px] font-semibold leading-tight text-[#2d2d2d] md:text-[44px]`}
          >
            {heading}
          </h2> */}
        </div>
 
     
 
        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-[1180px] grid-cols-2 gap-y-8 md:grid-cols-4">
          {stats.slice(0, 4).map((item, idx) => (
            <div key={`stat-${idx}`} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span
                  className={`${montserrat.className} text-[60px] font-bold leading-none text-[#060606] md:text-[68px]`}
                >
                  {item?.value ?? "0"}
                </span>
 
                <span
                  className={`${montserrat.className} text-[58px] font-bold leading-none text-[#F86503] md:text-[66px]`}
                >
                  +
                </span>
              </div>
 
              <p
                className={`${poppins.className} mt-2 text-[20px] font-medium  text-[#222] md:text-[12px] lg:text-[20px]`}
              >
                {item?.label ?? ""}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
 