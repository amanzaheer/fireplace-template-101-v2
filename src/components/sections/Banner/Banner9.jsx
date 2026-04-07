"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import { Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";

import QuoteForm9 from "./QuoteForm/QuoteForm9";

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

/** Template 5 banner — split hero + orange panel with QuoteForm5. */
export default function Banner9({ content }) {
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
    title: content?.banner?.form_title || "GET IN TOUCH WITH US",
    sub_title: content?.banner?.form_description || "",
  };

  const features = resolveRefArray(content, banner, "features");

  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const phoneHref = phone ? `tel:${phone}` : "#";

  return (
    <FullContainer
      id="banner"
      className="relative bg-white overflow-hidden w-full px-0"
    >
      <div className={`w-full ${poppins.className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px] lg:min-h-[560px]">
          <div className="flex relative min-h-[420px] lg:min-h-full">
            {image && (
              <Image
                src={image}
                title={data?.imageTitle || data?.title || "Banner"}
                alt={data?.altImage || data?.tagline || "Banner background"}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            )}

            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

            <div className="relative z-10 ml-auto flex h-full max-w-[620px] flex-col justify-center py-10 pl-4 pr-6 md:py-14 md:pl-8 md:pr-10">
              <div className="flex items-start gap-2.5 text-white mb-3">
                <div className="bg-[#efa536] p-2 flex shrink-0 items-center justify-center">
                  <Phone className="w-3 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex min-w-0 flex-col leading-tight">
                  <span className="font-bold uppercase tracking-wide text-xs md:text-sm">
                    Contact
                  </span>
                  <a
                    href={phoneHref}
                    className="text-xl md:text-3xl font-bold mt-1 hover:underline"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <h2 className="text-white uppercase font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Trusted Experts in
                </h2>

                <div className="mt-2">
                  <span className="inline-block bg-[#efa536] text-white px-5 py-2 md:px-6 md:py-3 text-lg md:text-2xl lg:text-3xl font-black uppercase">
                    Fireplace Services
                  </span>
                </div>
              </div>

              {data?.description && (
                <p className="text-white text-sm md:text-base mt-3 max-w-xl">
                  {data.description}
                </p>
              )}

              {features?.length > 0 && (
                <ul className="mt-5 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl">
                  {features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-white text-sm md:text-[15px] font-medium"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center  bg-[#efa536]">
                        <Image
                          src="/st-icons/Temp9/whitesheild.png"
                          alt="check"
                          width={16}
                          height={16}
                          className="h-5 w-5 object-contain"
                        />
                      </span>
                      <span className="leading-snug">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-[#000000] flex flex-col justify-center min-h-[400px] px-5 py-10 md:px-8 md:py-14 lg:px-10">
            <div className="w-full max-w-[1000px] mx-auto">
              <QuoteForm9
                data={data}
                phone={phone}
                form_head={form_head}
                showArrowInButton={false}
                variant="orangePanel"
              />
            </div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
}
    