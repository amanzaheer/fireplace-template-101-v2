"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Phone } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins, Inter } from "next/font/google";
import { Rubik } from "next/font/google";
import QuoteForm17 from "./QuoteForm/QuoteForm17";
import Navbar17CallButton from "../Navbar/Navbar17CallButton";

const poppin = Poppins({
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

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function normText(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove "#1 ", "1# ", etc. from CMS banner titles so the hero does not show a rank/hash prefix. */
function stripBannerRankPrefix(raw) {
  const original = String(raw ?? "").trim();
  let t = original.replace(/^#+\s*\d+\s*/i, "").trim();
  t = t.replace(/^\d+\s*#+\s*/i, "").trim();
  return t.length ? t : original;
}

export default function Banner8({ content }) {
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
    content?.CONTACT_info?.phone ??
    content?.navbar?.phone ??
    "";

  const headingText = data?.heading || data?.title || "CHIMNEY SERVICES";
  const headingStr = stripBannerRankPrefix(String(headingText).trim());
  const cmsTagline = data?.tagline?.trim();
  const showTagline =
    Boolean(cmsTagline) && normText(cmsTagline) !== normText(headingStr);

  const headingWords = headingStr.split(/\s+/).filter(Boolean);
  const splitIndex = Math.max(1, Math.ceil(headingWords.length / 2));
  const headingTop = headingWords.slice(splitIndex).join(" ");
  const headingBottom = headingWords.slice(0, splitIndex).join(" ");

  return (
    <FullContainer className="relative w-auto min-h-[600px] md:h-auto pb-10 overflow-visible">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-2 w-32.5 sm:w-[140px] md:w-[200px]"></div>

      <Container className="relative z-10 pt-14 md:pt-24 pb-0">
        <div className="flex flex-col items-center text-center">
          <div className="min-w-0 max-w-full w-full pb-2 md:pb-4 flex flex-col items-center">
            {phone ? (
              <div className="mb-4 flex justify-center">
                <Navbar17CallButton phone={phone} />
              </div>
            ) : null}

            {showTagline ? (
              <p
                className={`${poppin.className} mt-2 max-w-full text-base font-bold not-italic text-white sm:text-lg md:text-xl lg:max-w-[26rem] lg:text-2xl xl:text-[30px]`}
                style={{ lineHeight: "normal", color: "#FFF" }}
              >
                {cmsTagline}  
              </p>
            ) : null}

            {headingTop ? (
              <div className="mt-4 box-border mx-auto w-fit max-w-full min-w-0 px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-3">
                <span
                  className={`${poppin.className} block max-w-full text-left font-bold uppercase not-italic leading-[1.2] tracking-tight text-white text-[clamp(1.25rem,5vw,1.875rem)] sm:text-3xl md:text-[44px]`}
                  style={{ color: "#FFF" }}
                >
                  {headingTop}
                </span>
              </div>
            ) : null}

            {headingBottom ? (
              <div className="mt-4 box-border mx-auto w-fit max-w-full min-w-0 bg-[#FF0504] px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-3">
                <span
                  className={`${poppin.className} block max-w-full text-left font-bold uppercase not-italic leading-[1.2] tracking-tight text-white text-[clamp(1.25rem,5vw,1.875rem)] sm:text-3xl md:text-[44px]`}
                  style={{ color: "#FFF" }}
                >
                  {headingBottom}
                </span>
              </div>
            ) : null}

            <QuoteForm17
              banner={banner}
              data={data}
              form_head={form_head}
              features={features}
            />
          </div>

          <div className="relative mx-auto hidden h-full w-full max-w-md pb-6 sm:pb-8 md:pb-24 lg:mx-0 lg:block lg:max-w-none lg:justify-self-end"></div>
        </div>
      </Container>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-auto z-[1] h-[min(38vh,280px)] min-h-[600px] w-full max-md:max-h-[320px] md:inset-x-auto md:inset-y-0 md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none w-full md:min-h-[280px]">
        <div className="relative h-full min-h-[200px] w-full md:min-h-[280px]">
          <div className="block md:hidden absolute top-0 left-0 w-full h-full bg-[#00142c] opacity-30 z-10" />
          <Image
            src={image}
            alt={data?.altImage || "banner"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </FullContainer>
  );
}
