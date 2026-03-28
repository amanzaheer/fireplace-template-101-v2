"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import {
  CheckCircle,
  Clock,
  Star,
  Shield,
  ShieldCheck,
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

const QuoteForm4 = dynamic(
  () => import("@/components/sections/Banner/QuoteForm/QuoteForm4"),
  {
  loading: () => (
    <div className="bg-white shadow-lg rounded-[15px] h-[400px] w-full md:w-[370px] animate-pulse" />
  ),
  ssr: false,
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function Banner4({ content }) {
  const banner = content?.banner ?? {};
  const data = {
    title: banner.title,
    tagline: banner.tagline,
    description: banner.description,
    heading: banner.heading,
    list: banner.list,
    imageTitle: banner.imageTitle,
    altImage: banner.altImage,
  };
  const image =
    buildImageSrc(IMAGE_BASE, banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");
  const form_head = {
    title: content?.banner?.form_title || "Get Your Free Quote",
    sub_title:
      content?.banner?.form_description || "10% Off for Online Booking",
  };
  const features = resolveRefArray(content, banner, "features");
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  return (
    <FullContainer
      id="banner"
      className="relative bg-white overflow-hidden w-full min-h-[560px] md:min-h-[640px] lg:min-h-[680px]"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative z-10 font-barlow py-10 md:py-12 lg:py-16">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 text-white">
          <div className="w-full max-w-[700px] mt-4 md:mt-8 lg:mt-12">
            <div className="w-fit flex flex-col items-start justify-center">
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="inline-flex items-center gap-2 text-[12px] md:text-sm font-semibold uppercase tracking-wide text-[#0f2962]"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f59402] text-black ">
                  <Phone className="w-5 h-5" />
                </span>
                Contact
              </a>
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="mt-1 text-[28px] md:text-[40px] font-bold leading-none text-[#0f2962]"
              >
                {phone}
              </a>
              <div className="mt-8 font-black max-w-[400px] inline-block uppercase text-[26px] sm:text-[32px] md:text-[48px] leading-tight text-shadow-lg">
                <span className="text-[#0f2962]">
                  {String(data?.heading || data?.title || "").split(" ").slice(0, 1).join(" ")}{" "}
                </span>
                <span className="text-[#f59402]">
                  {String(data?.heading || data?.title || "").split(" ").slice(1).join(" ")}
                </span>
              </div>
              {data?.tagline ? (
                <h2 className="text-base md:text-xl font-semibold leading-tight text-white/90 text-left mt-2">
                  {data?.tagline}
                </h2>
              ) : null}

              <p className="text-sm md:text-base text-left mt-3 mb-1 text-white/80 max-w-[560px]">
                {data?.description}
              </p>
              {features?.length > 0 ? (
                <ul className="mt-2 pt-3 mb-6 w-fit grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-[linear-gradient(to_left,#ffffff_50%,#f59402_50%)]">
                  {features?.map((feature, idx) => {
                    return (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 leading-none text-white/75 font-medium text-[22px] md:text-[26px]"
                      >
                        <ShieldCheck className="w-5 h-5 text-[#f2a51f] shrink-0" />
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              <div className="w-fit">
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className="inline-flex items-center gap-3 rounded-full bg-transparent text-white text-[28px] md:text-[38px] font-extrabold leading-none md:hidden"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#f2a51f] text-black">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                  </span>
                  {phone}
                </a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-fit max-w-[400px]">
            <div className="rounded-tl-[20px] rounded-br-[20px] shadow-[0_18px_50px_rgba(0,0,0,0.45)] overflow-hidden">
              <QuoteForm4
              data={data}
              form_head={form_head}
              showArrowInButton={false}
              />
            </div>


          </div>
        </div>
      </Container>
      
    </FullContainer>
  );
}
