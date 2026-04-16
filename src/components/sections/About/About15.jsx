"use client";

import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import md from "@/lib/markdown";
import { Poppins, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function markdownToHtml(str) {
  if (!str || typeof str !== "string") return "";
  const raw = md.render(str.trim()).trim();
  const textOnly = raw.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
  if (!textOnly) return "";
  return raw;
}

export default function About15({ content }) {
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
    <FullContainer id="about" className="w-full bg-[#f4f5f7] py-10 md:py-14 lg:py-16">
      <Container className="max-w-[880px] lg:px-0!">
        {heading ? (
          <h2
            className={`${rubik.className} mx-auto max-w-3xl text-center text-[30px] font-bold leading-tight tracking-tight text-[#2d2d2d] md:text-[40px]`}
          >
            {heading}
          </h2>
        ) : null}

        {introHtml ? (
          <div
            className={`${poppins.className} mx-auto mt-4 max-w-3xl text-center text-[13px] font-normal leading-[1.65] text-[#4a4a4a] md:mt-5 [&_a]:font-medium [&_a]:text-[#f59402] [&_a]:underline [&_p]:mb-3 [&_p]:leading-[1.65] [&_p]:last:mb-0 [&_strong]:font-semibold [&_li]:text-[13px] [&_li]:leading-[1.65] [&_li]:text-[#4a4a4a]`}
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />
        ) : null}

        {cardHtml || imageSrc ? (
          <div className="relative mx-auto mt-8 overflow-hidden rounded-[16px] border border-black/5 bg-white p-4 shadow-[0_2px_14px_rgba(0,0,0,0.08)] md:mt-10 md:p-5">
            <div className="grid items-stretch gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-5">
              <div className="order-2 rounded-[12px] bg-[#f8f9fb] p-5 lg:order-1 lg:p-6">
                {cardHtml ? (
                  <div
                    className={`${poppins.className} text-left text-[13px] font-normal leading-[1.7] text-[#4a4a4a] [&_a]:text-[#f59402] [&_a]:font-medium [&_a]:underline [&_li]:my-1 [&_li]:text-[13px] [&_li]:leading-[1.7] [&_li]:text-[#4a4a4a] [&_p]:mb-3 [&_p]:last:mb-0 [&_strong]:font-semibold [&_strong]:text-[#2d2d2d] [&_ul]:my-2 [&_blockquote]:border-l-3 [&_blockquote]:border-[#f59402]/40 [&_blockquote]:pl-3`}
                    dangerouslySetInnerHTML={{ __html: cardHtml }}
                  />
                ) : (
                  <p className={`${poppins.className} text-[13px] leading-[1.7] text-[#4a4a4a]`}>
                    Learn more about our professional fireplace service team.
                  </p>
                )}
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative min-h-full overflow-hidden rounded-[12px] bg-neutral-200 lg:min-h-full">
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
                    <div className="h-full min-h-[220px] w-full bg-neutral-300" aria-hidden />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </FullContainer>
  );
}
