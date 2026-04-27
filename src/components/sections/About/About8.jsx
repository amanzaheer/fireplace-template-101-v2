"use client";

import Image from "next/image";
import { Montserrat, Merriweather } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";

const aboutHeadingFont = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const aboutBodySerif = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

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
  };
  const image =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const pointsList = Array.isArray(data.points) ? data.points : [];
  const subtitle = data.subtitle?.trim();

  return (
    <FullContainer
      className="bg-neutral-50 py-8 md:py-10 lg:py-12"
      id="about"
    >
      <Container className="w-full">
        <div
          className="overflow-hidden rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_18px_50px_-12px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Copy */}
            <div className="order-2 min-w-0 text-[#000000] lg:order-1">
              {subtitle ? (
                <p
                  className={`${aboutHeadingFont.className} text-[13px] font-bold uppercase tracking-[0.2em] text-[#000000] md:text-sm`}
                >
                  {subtitle}
                </p>
              ) : null}

              {data?.heading ? (
                <h2
                  className={`${aboutHeadingFont.className} mt-1 text-[26px] font-bold leading-tight tracking-tight text-[#000000] sm:text-[32px] md:text-[38px]`}
                >
                  {data.heading}
                </h2>
              ) : null}

              <div
                className="mt-3 h-px w-full max-w-md bg-gradient-to-r from-[#000000] via-[#000000]/35 to-transparent"
                aria-hidden
              />

              <div
                className={`${aboutBodySerif.className} mt-4 space-y-3 text-[15px] leading-[1.7] text-[#000000] md:text-base`}
              >
                {data?.description1 ? <p>{data.description1}</p> : null}
                {data?.description2 ? <p>{data.description2}</p> : null}
              </div>

              {pointsList.length > 0 ? (
                <ul className="mt-4 space-y-2 text-[14px] text-[#000000] md:text-[15px]">
                  {pointsList.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5200]"
                        aria-hidden
                      />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {phone ? (
                <div className="mt-4 w-fit sm:mt-5">
                  <div
                    className="[&_button]:!min-h-[48px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#ff6600] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#e65c00] [&_button]:!transition-colors [&_svg]:!text-white [&_button]:!min-w-0 sm:[&_button]:!justify-start"
                  >
                    <PrimaryPhone phone={phone} variant="orange" />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Image */}
            <div className="order-1 flex w-full min-w-0 justify-center lg:order-2 lg:justify-end">
              {image ? (
                <div className="relative aspect-[4/3] w-full max-w-xl lg:max-w-none">
                  <Image
                    title="About Image"
                    src={image}
                    alt={data?.heading ? String(data.heading) : "About"}
                    fill
                    className="rounded-xl object-cover object-center"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full max-w-xl items-center justify-center rounded-xl bg-neutral-100 text-sm text-neutral-400 lg:max-w-none">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
