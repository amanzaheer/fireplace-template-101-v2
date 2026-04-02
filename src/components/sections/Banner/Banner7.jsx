"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import {Poppins, Inter } from "next/font/google";
import { Rubik } from "next/font/google";
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
const QuoteForm7 = dynamic(() => import("@/components/sections/Banner/QuoteForm/QuoteForm7"), {
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

export default function Banner7({ content }) {
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
      className="relative bg-white overflow-hidden w-full min-h-[550px]"
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
        <div className="absolute inset-0 bg-black/60"/>
      </div>

      <Container className="relative z-10 font-barlow py-8 md:py-10 lg:py-0 mt-8 md:mt-8 lg:mt-10">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-10 text-white">
          <div className="relative w-full max-w-[640px]">
            <div className="w-full flex flex-col items-start">
              <a
                href={phone ? `tel:${phone}` : "#"}
                className="inline-flex items-center gap-3 mb-4 md:mb-5 hover:opacity-90 transition-opacity"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1e90ff] text-white shrink-0">
                  <Phone className="w-6 h-6" />
                </span>
                <span className="leading-none flex flex-col gap-1 md:gap-1.5">
                  <span className={`${poppins.className} block text-[18px] md:text-[20px] font-black uppercase tracking-tight`}>
                    Call Us Now!
                  </span>
                  <span className={`${poppins.className} block text-[24px] md:text-[26px] font-black`}>
                    {phone || "(123)-456-7890"}
                  </span>
                </span>
              </a>

              <div className="bg-[#023e8a] px-5 md:px-6 py-5 md:py-6 rounded-tr-[2px] rounded-br-[72px] max-w-[560px]">
                <h1 className={`${poppins.className} font-black uppercase text-[40px] sm:text-[48px] lg:text-[55px] leading-[0.95] text-white`}>
                  {data?.heading || data?.title}
                </h1>
              </div>

              {features?.length > 0 ? (
                <ul className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {features?.map((feature, idx) => {
                    return (
                      <li
                        key={idx}
                        className={`${inter.className} flex items-center gap-2 text-white font-medium text-base md:text-xl text-[14px] md:text-[16px] leading-tight`}
                      >
                        <div className="w-5 h-auto whitespace-nowrap shrink-0">
                          <Image
                            src="/st-icons/Temp7/shield icon.png"
                            alt="Check"
                            width={16}
                            height={16}
                            className="w-auto h-5 md:h-[19px]"
                          />
                        </div>
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>

           
        </div>
      </Container>
      <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full max-w-[450px] h-fit z-10 mt-6 lg:mt-0">
      <div className="w-full md:w-fit max-w-[450px] ml-auto">
            <div className=" overflow-hidden">
              <div className="bg-transparent px-0 pb-0 lg:min-h-[483.5px]">
                <QuoteForm7
                  data={data}
                  form_head={form_head}
                  showArrowInButton={false}
                />
              </div>
            </div>
          </div>
      </div>
    </FullContainer>

  );
}
