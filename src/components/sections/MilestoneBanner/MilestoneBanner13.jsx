import React from "react";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Star } from "lucide-react";
import { Poppins,} from "next/font/google";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function MilestoneBanner13({ content }) {
  const data = content?.MilestoneBanner ?? {};

  const heroImage =
    buildImageSrc(IMAGE_BASE, data.image) || "/images/testimonial.png";
  const countText = data?.title || "15,000+";
  const countDescription =
    data?.description ||
    "Chimney sweep or cleaning is essential for maintaining a safe and efficient fireplace system.";
  const sectionTitle = data?.title2 || "Best Service Team";
  const sectionDescription =
    data?.description2 ||
    "Chimney sweep or cleaning is essential for maintaining a safe and efficient fireplace system.";
  const personName = data?.name || "Michael Nguyen";
  const personRole = data?.role || "Operations Lead";
  const ratingValue = data?.rating ?? 5.0;

  return (
    <FullContainer id="milestone_banner" className="bg-[#c7db1f] py-8 md:py-10">
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-6 rounded-[6px] px-2 md:grid-cols-[1.1fr_auto_1fr] md:px-4">
          <div className="grid items-center gap-4 sm:grid-cols-[240px_1fr] ">
            <div className="relative h-[239px] w-full max-w-[240px] overflow-hidden rounded-[14px] bg-white/30">
              <Image
                src={heroImage}
                alt="Milestone"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>
            <div>
              <h3 className="text-4xl font-extrabold leading-none text-black md:text-[55.3px] font-poppins">
                {countText}
              </h3>
              <p className="mt-2 max-w-[360px] text-[16px] leading-[1.35] text-black font-poppins">
                {countDescription}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-[24.3px] leading-none text-black font-poppins">Google Rating</span>
                <Star className="h-6 w-6 fill-[#f0a737] text-[#f0a737]" />
                <span className="text-[48px] font-bold leading-none text-black">
                  {ratingValue}.0
                </span>
              </div>
            </div>
          </div>

          <div className="hidden h-[305px] w-px bg-black md:block" aria-hidden />

          <div className="pl-0 md:pl-2">
            <h3 className="text-4xl font-extrabold leading-tight text-black md:text-[40px] font-poppins">
              {sectionTitle}
            </h3>
            <p className="mt-2 max-w-[390px] text-[16px] leading-[1.35] text-black font-poppins">
              {sectionDescription}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-[65px] w-[65px] shrink-0 overflow-hidden rounded-full border-2 border-white/80">
                <Image
                  src="/st-icons/Temp13/person.png"
                  alt={personName}
                  fill
                  sizes="65px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[29px] font-semibold leading-tight text-black font-poppins">
                  {personName}
                </p>
                <p className="text-[19.4px] leading-tight font-medium text-black/90 font-poppins">{personRole}</p>
              </div>
            </div>
          </div>
        </div>
      </Container> 
    </FullContainer>
  );
}
