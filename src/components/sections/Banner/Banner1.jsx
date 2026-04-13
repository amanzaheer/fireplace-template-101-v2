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
 
const QuoteForm = dynamic(() => import("@/components/common/QuoteForm"), {
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
    <FullContainer id="banner" className="relative bg-white overflow-hidden w-full md:!h-[790px] lg:!h-auto">
      <div className="absolute inset-0 w-full h-[600px] md:minh-[790px] overflow-hidden">
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
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

 
      <Container className="py-12 md:pb-24 font-barlow relative z-10">
        <div className="w-full flex flex-col md:flex-row gap-16 md:mx-auto md:w-fit md:gap-[66px] text-white content-center">
          <div className="relative flex w-full md:w-fit items-center md:items-end flex-col justify-center">
            <div className="w-fit flex flex-col items-center md:items-start justify-center">
              <div className="font-[900] max-w-[500px] w-fit inline-block uppercase text-4xl lg:text-[54px] px-4 md:px-0 md:text-6xl leading-tight text-center md:text-start lg:text-left text-shadow-lg">
                {data?.heading || data?.title}
              </div>
              {data?.tagline ? (
                <h2 className="text-[28px] md:px-0 md:text-2xl uppercase font-[900] leading-tight text-[#90D4E1] text-center md:text-start lg:text-left mt-2">
                  {data?.tagline}
                </h2>
              ) : null}

 
              <p className="text-[16px] md:text-3xl text-center md:text-start lg:text-left mt-4 mb-1">
                {data?.description}
              </p>
              {features?.length > 0 ? (
                <ul className="mb-6 w-fit space-y-1 md:space-y-2">
                  {features?.map((feature, idx) => {
                    const IconComponent = ICON_MAP[feature.icon];
                    return (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-white font-medium text-base md:text-[17px]"
                      >
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-white" />
                        )}
                        {feature.text}
                      </li>
                    );
                  })}
                </ul>
              ) : null}

 
              <div className="w-fit">
                <a
                  href={phone ? `tel:${phone}` : "#"}
                  className="flex items-center gap-3 bg-gradient-to-br from-blue-600 via-sky-500 from-30% to-green-500 text-white px-6 py-3 rounded-2xl text-3xl font-semibold"
                >
                  <Phone className="w-6 h-6" />
                  {phone}
                </a>
              </div>
            </div>
          </div>

 
          <div className="w-full md:w-fit">
            <QuoteForm
              data={data}
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
 
