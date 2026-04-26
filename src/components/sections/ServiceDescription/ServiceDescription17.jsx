"use client";

import Image from "next/image";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import { IMAGE_BASE } from "@/lib/constants";
import QuoteButton from "@/components/common/QuoteButton";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

const SECTION_IDS = {
  service_description: "service_description",
  service_description2: "service_description2",
};

export default function ServiceDescription8({
  content,
  section = "service_description",
}) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const block = content?.[section];
  if (!block?.description) return null;

  const title = block.title ?? "Our Service";

  const description =
    block.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = block.file_name
    ? buildImageSrc(IMAGE_BASE, block.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const sectionId = SECTION_IDS[section] ?? SECTION_IDS.service_description;

  return (
    <FullContainer id={sectionId} className="bg-white py-16 md:py-24">
      <Container className="px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2
            className={cn(
              montserratHeading.className,
              "mb-10 text-[44px] font-bold leading-[53px] tracking-tight text-black not-italic md:mb-12",
            )}
          >
            {title}
          </h2>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="order-2 max-w-prose space-y-8 lg:order-1">
              <div
                className={cn(
                  "prose prose-slate max-w-none font-sans text-[17px] leading-[1.75]",
                  "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900",
                  "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
                  "prose-p:text-slate-600 prose-p:leading-[1.75]",
                  "prose-a:font-medium prose-a:text-[#c2410c] prose-a:no-underline hover:prose-a:underline",
                  "prose-strong:font-semibold prose-strong:text-slate-800",
                  "prose-li:marker:text-[#c2410c]",
                )}
                dangerouslySetInnerHTML={{ __html: md.render(description) }}
              />
              {phone ? (
                <div className="mt-2 flex w-full flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <div
                    className={
                      "[&_button]:!min-h-[48px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#FF0504] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#e65c00] [&_button]:!transition-colors [&_svg]:!text-white"
                    }
                  >
                    <PrimaryPhone phone={phone} variant="orange" />
                  </div>
                  <div
                    className={
                      "[&_button]:!min-h-[48px] [&_button]:!w-auto [&_button]:!min-w-[160px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#FF0504] [&_button]:!p-0 [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#e65c00] [&_button]:!transition-colors [&_button]:!items-center [&_button]:!justify-center [&_h2]:!m-0 [&_h2]:!text-sm [&_h2]:!font-bold [&_h2]:!leading-none [&_h2]:!text-white [&_svg]:!h-4 [&_svg]:!w-4 [&_svg]:!text-white"
                    }
                  >
                    <QuoteButton phone={phone} variant="orange" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] w-full min-h-[220px] overflow-hidden rounded-xl bg-slate-100 md:min-h-[300px]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
