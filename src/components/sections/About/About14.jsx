"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function markdownToHtml(str) {
  if (!str || typeof str !== "string") return "";
  const raw = md.render(str.trim()).trim();
  const textOnly = raw
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
  if (!textOnly) return "";
  return raw;
}

export default function About14({ content }) {
  const about = content?.about ?? {};
  const heading = about.heading ?? "";
  const description1 = about.description1 ?? "";
  const description2 = about.description2 ?? "";
  const imageSrc =
    buildImageSrc(IMAGE_BASE, about.file_name) ||
    buildImageSrc(IMAGE_BASE, "about/about.webp");
  const useUnoptimized =
    imageSrc.startsWith("/api/") ||
    imageSrc.startsWith("http://") ||
    imageSrc.startsWith("https://");

  const introHtml = markdownToHtml(description1);
  const cardHtml = markdownToHtml(description2);

  return (
    <FullContainer
      id="about"
      className="w-full bg-white py-10 md:py-12 lg:py-14"
    >
      <Container className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading ? (
          <h2 className="text-center font-montserrat text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl lg:text-[3.35rem] lg:leading-[1.12]">
            {heading}
          </h2>
        ) : null}

        {introHtml ? (
          <div
            className="mx-auto mt-4 max-w-[980px] text-center font-barlow text-base leading-[1.55] text-neutral-900 font-medium md:mt-5 md:text-lg [&_a]:font-medium [&_a]:text-neutral-900 [&_a]:underline [&_p]:mb-3 [&_p]:leading-[1.55] [&_p]:last:mb-0 [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        ) : null}

        {cardHtml || imageSrc ? (
          <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl bg-neutral-950 shadow-[0_20px_48px_rgba(0,0,0,0.14)] md:mt-9 lg:mt-10">
            <div className="flex flex-col lg:min-h-[235px] lg:flex-row lg:items-stretch">
              {cardHtml ? (
                <div className="order-2 flex flex-1 flex-col justify-center px-6 py-5 lg:order-1 lg:w-[58%] lg:min-h-[235px] lg:px-8 lg:py-7 xl:px-10">
                  <div
                    className="text-left font-barlow text-base leading-relaxed text-white/95 md:text-[17px] [&_a]:text-white [&_a]:underline [&_li]:my-1 [&_p]:mb-3 [&_p]:last:mb-0 [&_strong]:font-semibold [&_ul]:my-2"
                    dangerouslySetInnerHTML={{ __html: cardHtml }}
                  />
                </div>
              ) : null}

              <div
                className={`relative order-1 w-full shrink-0 lg:order-2 ${
                  cardHtml
                    ? "min-h-[220px] sm:min-h-[240px] lg:w-[42%] lg:min-h-[235px]"
                    : "min-h-[260px] sm:min-h-[280px] lg:min-h-[300px]"
                }`}
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={heading ? `About: ${heading}` : "About our team"}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    loading="lazy"
                    unoptimized={useUnoptimized}
                  />
                ) : (
                  <div
                    className="h-full min-h-[180px] w-full bg-neutral-800"
                    aria-hidden
                  />
                )}
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
