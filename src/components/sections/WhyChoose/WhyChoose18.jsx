"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import QuoteButton from "@/components/common/QuoteButton";
import {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const iconMap = {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
};

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function FeatureCard({ feature }) {
  const iconName = typeof feature === "object" ? feature?.icon : null;
  const text =
    typeof feature === "object"
      ? feature?.text
      : typeof feature === "string"
        ? feature
        : "";
  const IconComponent = iconName ? iconMap[iconName] : CheckCircle;

  if (!text) return null;

  return (
    <article className="rounded-xl border-2 bg-white px-5 py-6 text-center sm:px-6 sm:py-7 md:min-h-fit md:py-2">
      {IconComponent && (
        <IconComponent className="mx-auto mb-3 h-6 w-6 shrink-0 text-black" />
      )}
      <h3 className="text-lg font-bold leading-snug text-black md:text-xl">
        {text}
      </h3>
    </article>
  );
}

export default function WhyChoose18({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  const { leftFeatures, rightFeatures } = useMemo(() => {
    const midpoint = Math.ceil(features.length / 2);
    return {
      leftFeatures: features.slice(0, midpoint),
      rightFeatures: features.slice(midpoint),
    };
  }, [features]);

  const useUnoptimized =
    imageSrc.startsWith("/api/") ||
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");

  if (features.length === 0) return null;

  return (
    <FullContainer
      id="whychooseus"
      className="mt-4 overflow-hidden bg-white py-10 md:py-14 lg:py-16"
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-[1220px] ${poppins.className}`}>
          {heading ? (
            <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10 lg:mb-12">
              <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
                {heading}
              </h2>
            </header>
          ) : null}

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_344px_minmax(0,1fr)] lg:gap-8 xl:gap-10">
            <div className="order-3 flex w-full max-w-[400px] flex-col gap-5 justify-self-center sm:gap-6 lg:order-1 lg:max-w-none lg:justify-self-end lg:pr-2">
              {leftFeatures.map((feature, idx) => (
                <FeatureCard key={`left-${idx}`} feature={feature} />
              ))}
            </div>

            <div className="order-2 flex w-full justify-center lg:order-2">
              <div className="relative mx-auto h-[280px] w-full max-w-[344px] overflow-hidden rounded-[24px] bg-gray-100 sm:h-[320px] md:h-[344px] md:w-[344px] md:rounded-[33px]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Why choose us"
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                    sizes="(max-width: 768px) 92vw, 344px"
                    unoptimized={useUnoptimized}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 font-medium">
                    Why Choose Us
                  </div>
                )}
              </div>
            </div>

            <div className="order-4 flex w-full max-w-[400px] flex-col gap-5 justify-self-center sm:gap-6 lg:order-3 lg:max-w-none lg:justify-self-start lg:pl-2">
              {rightFeatures.map((feature, idx) => (
                <FeatureCard key={`right-${idx}`} feature={feature}/>
              ))}
            </div>
          </div>

        
        </div>
      </Container>
    </FullContainer>
  );
}
