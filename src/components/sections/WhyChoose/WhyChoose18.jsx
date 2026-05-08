"use client";

import React from "react";
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

export default function WhyChoose18({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const block = content?.why_choose ?? {};
  const features = resolveRefArray(content, block, "features");
  const heading = block.heading ?? "Why Choose Us";
  const filePath = block.file_name ?? "about/about.webp";
  const imageSrc = buildImageSrc(IMAGE_BASE, filePath);

  if (features.length === 0) return null;

  return (
    <FullContainer id="whychooseus" className="py-12 md:py-20 bg-[#F0520E]">
        <h1 className="text-white text-2xl sm:text-5xl p-12 font-extrabold font-poppins">Why Choose US</h1>
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* IMAGE SIDE - Left Side (order-first) */}
          <div className="w-full md:w-1/2 order-first">
            <div className="rounded-2xl overflow-hidden w-full h-[350px] sm:h-[450px] md:h-[650px] relative shadow-md">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Specialist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  Image Placeholder
                </div>
              )}
            </div>
          </div>

          {/* CONTENT SIDE - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            {/* Top Gray Label */}
            <div className=" text-white px-4 py-1.5 font-poppins rounded text-md font-bold mb-4">
              Sweeping, Cleaning, Repair & Maintenance - Servicing
            </div>

            {/* Heading with Red Highlight */}
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 uppercase">
              Specialist In All Areas Of <span className="text-white">Chimney Installation And Repair</span>
            </h2>

            {/* Content Text */}
            <p className="text-white text-base md:text-lg mb-8 leading-relaxed">
              Chimney sweep or cleaning is essential for maintaining a safe and efficient fireplace system. Over time, soot, creosote, and debris accumulate in the chimney, creating fire hazards and reducing airflow.
            </p>

            {/* Features Grid - 2 Columns, Red Background */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-10">
              {features.map((feature, idx) => {
                const iconName = typeof feature === "object" ? feature?.icon : null;
                const text = typeof feature === "object" ? feature?.text : feature;
                const IconComponent = iconName ? iconMap[iconName] : Shield;
                
                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3  text-white p-3 rounded-lg"
                  >
                    <div className=" p-1 rounded-full">
                      <IconComponent className="w-6 h-6 text-black" />
                    </div>
                    <span className="font-bold text-lg">{text}</span>
                  </div>
                );
              })}
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-6 w-full">
              {/* Contact Us Styled Button */}
              <button className="border-2 border-gray-200 text-[#fff] font-bold py-3.5 px-10 rounded-lg transition-all shadow-lg">
                Contact us
              </button>

              {/* Red Phone Layout */}
              <div className="flex items-center gap-4">
                <div className=" p-4 rounded-full shadow-lg">
                   <Phone className="w-7 h-7 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white uppercase tracking-tighter">Click to call</span>
                  <a href={`tel:${phone}`} className="text-xl md:text-2xl font-black text-white leading-none">
                    {phone || "(737) 315-3438"}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </FullContainer>
  );
}