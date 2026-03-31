"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import { ShieldCheck, Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import QuoteForm5 from "./QuoteForm/QuoteForm5";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

/** Template 5 banner — split hero + orange panel with QuoteForm5. */
export default function Banner5({ content }) {
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
      <div className="w-full">
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

            <div className="relative z-10 h-full pl-4 pr-6 py-10 md:pl-8 md:pr-10 md:py-14 font-barlow flex flex-col justify-center max-w-[620px] ml-auto">
              <div className="flex flex-col items-start text-white mb-3">
                <div className="bg-[#f55714] p-2 flex items-center justify-center mb-2">
                  <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col leading-tight">
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
                  <span className="inline-block bg-[#f55714] text-white px-5 py-2 md:px-6 md:py-3 text-lg md:text-2xl lg:text-3xl font-black uppercase">
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
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-[#f55714] rounded-full">
                        <ShieldCheck
                          className="h-4 w-4 text-white"
                          strokeWidth={2.5}
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

          <div className="bg-[#D95411] flex flex-col justify-center min-h-[400px] px-5 py-10 md:px-8 md:py-14 lg:px-10">
            <div className="w-full max-w-[1000px] mx-auto">
              <QuoteForm5
                data={data}
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
