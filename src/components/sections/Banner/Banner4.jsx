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
import { Poppins, Inter } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const QuoteForm4 = dynamic(
  () => import("@/components/sections/Banner/QuoteForm/QuoteForm4"),
  {
    loading: () => (
      <div className="bg-white shadow-lg rounded-[15px] h-[400px] w-full md:w-[370px] animate-pulse" />
    ),
    ssr: false,
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
  ShieldCheck,
};

function PhoneCallIcon({ className = "w-3 h-3" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="m17.018 2.048l-.965-.261l-.523 1.93l.966.262a5 5 0 0 1 3.521 3.524l.26.965l1.931-.521l-.26-.965a7 7 0 0 0-4.93-4.934m-.914 3.378l-.965-.261l-.523 1.93l.966.262a1.5 1.5 0 0 1 1.056 1.057l.26.965l1.931-.52l-.26-.966a3.5 3.5 0 0 0-2.465-2.467"
      />
      <path
        fill="currentColor"
        d="M9.58 2H1v1a19.9 19.9 0 0 0 3.196 10.85a20.1 20.1 0 0 0 5.954 5.954A19.9 19.9 0 0 0 21 23h1v-8.58l-6.69-1.487l-1.86 1.86a14.1 14.1 0 0 1-4.242-4.243l1.859-1.86z"
      />
    </svg>
  );
}

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
    <>
      <FullContainer
        id="banner"
        className="relative z-10 bg-white overflow-hidden w-full min-h-[500px] md:min-h-[540px] "
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/50" />
        </div>

        <Container className="relative z-10 font-barlow py-10 md:py-8 lg:py-8 flex items-center justify-center h-full">
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-8 text-white">
            <div className="w-full max-w-[700px] mt-4 md:mt-8 lg:mt-12 ">
              <div className="w-fit flex flex-col items-start justify-center">
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className={`inline-flex items-center gap-2  tracking-wide text-[#0f2962] ${poppins.className}`}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f59402] text-black ">
                    <PhoneCallIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className={`${poppins.className} text-[#0f2962] font-normal uppercase  text-sm md:text-base`}>

                  Contact
                  </span>
                </a>
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className={`mt-1 text-[24px] md:text-[30px] font-bold leading-none text-[#0f2962] ${poppins.className}`}
                >
                  {phone}
                </a>
                <div className="mt-8 font-black max-w-[400px] inline-block uppercase text-[26px] sm:text-[32px] md:text-[44px] leading-none ">
                  <span className="text-[#0f2962] leading-none">
                    {String(data?.heading || data?.title || "").split(" ").slice(0, 1).join(" ")}{" "}
                  </span>
                  <br />
                  <span className="text-[#f59402] md:text-[55px] leading-none">
                    {String(data?.heading || data?.title || "").split(" ").slice(1, 4).join(" ")}
                  </span>
                  <br />
                  <span className="text-[#0f2962] md:text-[55px] leading-none">
                    {String(data?.heading || data?.title || "").split(" ").slice(4).join(" ")}
                  </span>
                </div>
                {data?.tagline ? (
                  <h2 className={`text-base md:text-xl font-semibold leading-tight text-white/90 text-left mt-2 ${inter.className}`}>
                    {data?.tagline}
                  </h2>
                ) : null}

                  <p className={`text-sm md:text-base text-left mt-3 mb-1 text-white/80 max-w-[560px] ${inter.className}`}>
                  {data?.description}
                </p>
                {features?.length > 0 ? (
                  <ul className="mt-2 pt-3 mb-6 w-fit grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-[linear-gradient(to_left,#ffffff_50%,#f59402_50%)]">
                    {features?.map((feature, idx) => {
                      const IconComponent = ICON_MAP[feature.icon];
                      return (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 leading-none text-white/75 font-medium text-[22px] md:text-[26px]"
                        >
                          {IconComponent ? (
                            <IconComponent className="w-5 h-5 text-[#f2a51f] shrink-0" />
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-[#f2a51f] shrink-0" />
                          )}
                          <span className={`${inter.className} text-white font-medium text-[18px] md:text-[20px]`}>
                            {feature.text}
                          </span>
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
                      <PhoneCallIcon className="w-3 h-3 md:w-3 md:h-3" />
                    </span>
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-fit max-w-[800px] h-full">
              <div className="rounded-tl-[20px] rounded-br-[20px]  overflow-hidden">
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
      <div className="w-full h-5 relative">
        <div className="bg-[#f59403] h-[13px] absolute top-0 left-0 w-full"></div>
        <div className="bg-[#f59403] h-6 rotate-1 absolute top-0 left-0 w-full"></div>
      </div>

    </>
  );
}
