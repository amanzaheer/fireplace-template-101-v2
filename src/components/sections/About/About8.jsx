"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Check, ArrowRight } from "lucide-react";

const aboutHeadingFont = Montserrat({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function About8({ content }) {
  const about = content?.about ?? {};
  const data = {
    heading: about.heading,
    description1: about.description1,
    description2: about.description2,
    points: about.points,
    subtitle: about.subtitle,
    cta_label: about.cta_label,
  };
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const pointsList = Array.isArray(data.points) ? data.points : [];
  const subtitle = data.subtitle?.trim();
  const ctaLabel = data.cta_label?.trim();

  return (
    <FullContainer className="bg-white py-12 md:py-16 lg:py-20" id="about">
      <Container className="max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="relative order-2 w-full min-w-0 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[min(100%,420px)] lg:h-[min(520px,70vh)]">
              {image ? (
                <Image
                  title="About Image"
                  src={image}
                  alt={data?.heading ? String(data.heading) : "About"}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="h-full w-full bg-neutral-200" />
              )}
            </div>
          </div>

          <div className="order-1 flex min-w-0 flex-col justify-center lg:order-2">
            {subtitle ? (
              <p className="mb-2 text-sm font-medium text-neutral-500 md:text-[15px]">
                {subtitle}
              </p>
            ) : null}

            {data?.heading ? (
              <h2
                className={`${aboutHeadingFont.className} w-full max-w-[526px] text-[#000] text-[28px] font-bold not-italic leading-[34px] sm:text-[36px] sm:leading-[44px] md:text-[44px] md:leading-[53px]`}
              >
                {data.heading}
              </h2>
            ) : null}

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-600 md:text-base">
              {data?.description1 ? <p>{data.description1}</p> : null}
              {data?.description2 ? <p>{data.description2}</p> : null}
            </div>

            {pointsList.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {pointsList.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[15px] font-medium text-neutral-800 md:text-base"
                  >
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#ff6600] text-[#ff6600]"
                      aria-hidden
                    >
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="pt-1 leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {phone ? (
              <div className="mt-8">
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 rounded-md bg-[#ff6600] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#e65c00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6600]"
                >
                  {ctaLabel || phone}
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
