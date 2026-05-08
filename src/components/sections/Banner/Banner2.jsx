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
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins, Inter } from "next/font/google";
import { Rubik } from "next/font/google";
import QuoteForm2 from "./QuoteForm/QuoteForm2";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
  subsets: ["regular"],
  weight: ["400", "500", "600", "700"],
});

const ICON_MAP = {
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

export default function Banner1({ content }) {
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
      className="relative bg-white w-full min-h-[200px] mb-[200px]"
    >
      <div className="absolute inset-0 w-full h-full ">
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0)_55%)]" />
      </div>

      <Container className="relative z-10 font-barlow py-10 md:py-14 lg:py-12">
        <div className="w-full flex flex-col min-h-[400px]  items-center lg:items-start justify-between gap-8 lg:gap-10 text-white">
          <div className="relative w-full max-w-full">
            <div className="w-full flex flex-col items-start justify-center">
              <div
                className={`${poppins.className} font-black text-center w-full max-w-full inline-block uppercase text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.04] text-shadow-lg`}
              >
                {data?.heading || data?.title}
              </div>
              {data?.tagline ? (
                <h2 className="text-xl text-center  md:text-2xl uppercase font-extrabold leading-tight text-[#ffffff] mt-2 w-full">
                  {data?.tagline}
                </h2>
              ) : null}

              <p className="text-base md:text-lg text-left mt-3 mb-2 text-white/90 max-w-[520px]">
                {data?.description}
              </p>
              {features?.length > 0 ? (
                <ul className="mb-6 flex flex-col lg:flex-row items-center pt-0 lg:pt-5 justify-center space-y-1 md:space-y-1.5 w-full gap-0 lg:gap-10">
                  {features?.slice(0, 3).map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className={`${inter.className} flex items-center gap-2.5 text-white font-normal text-lg md:text-2xl`}
                      >
                        {IconComponent ? (
                          <IconComponent className="w-5 h-5 text-[#c92028] shrink-0" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-[#c92028] shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="w-full lg:absolute lg:bottom-0 lg:translate-y-1/2 z-50 grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-20 bg-black rounded-2xl px-5 lg:px-10 py-10">
            <div className="flex flex-col items-center justify-between py-5 lg:py-20">
              <div className="flex flex-col items-start justify-center gap-5">
                <h3
                  className={`${poppins.className} text-2xl text-left md:text-4xl lg:text-5xl font-bold text-white`}
                >
                  How we can help?
                </h3>
                <p
                  className={`${poppins.className} text-base md:text-lg lg:text-xl text-white/90`}
                >
                  we are available 7 days a week. call or book your service now.
                </p>
              </div>

              <div className="w-full flex flex-col lg:flex-row gap-2 pt-5 lg:pt-0 items-center justify-between ">
                <h3
                  className={`${inter.className} text-2xl  font-bold text-white`}
                >
                  Call Us Today
                </h3>
                <div className="flex flex-col gap-0.5 md:gap-1 justify-center items-center">
                  <div className="text-xs">
                    <a
                      href={phone ? `tel:${phone}` : "#"}
                      className="flex items-center justify-center sm:justify-start gap-2 px-5 lg:px-6 py-1.5 lg:py-2 rounded-full text-white font-semibold text-sm lg:text-lg shadow-lg hover:opacity-90 transition-all border-2 border-white bg-[#c92028]"
                    >
                      <Image
                        src="/st-icons/Temp2/call1.png"
                        alt="Phone"
                        width={16}
                        height={16}
                        className="w-auto h-5 lg:w-5.5 lg:h-5.5"
                      />
                      <span
                        className={`${rubik.className} text-white text-sm lg:text-base font-normal`}
                      >
                        {phone}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.32)] overflow-hidden">
              <div className="bg-transparent px-0 pb-0 ">
                <QuoteForm2
                  data={data}
                  form_head={form_head}
                  showArrowInButton={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
