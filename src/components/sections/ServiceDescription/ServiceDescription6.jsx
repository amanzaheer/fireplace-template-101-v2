"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const ACCENT = "#D35400";

function stripLeadingMarkdownHeading(text) {
  if (typeof text !== "string") return text;
  return text.replace(/^\s*#{1,6}\s+[^\n]+\n*/, "");
}

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceDescription6({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const titleFromCms =
    typeof content?.service_description?.title === "string"
      ? content.service_description.title.trim()
      : "";
  const titleForAlt = titleFromCms || "Our Service";

  const rawDescription =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";
  const description = titleFromCms
    ? stripLeadingMarkdownHeading(rawDescription)
    : rawDescription;

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const telHref = phone ? `tel:${String(phone).replace(/\s/g, "")}` : "";

  const scrollToQuote = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]',
      );

    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <FullContainer
      id="service_description"
      className="font-barlow overflow-hidden bg-white py-10 md:py-14 lg:py-16"
    >
      <Container className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="w-full">
            <div className="relative mx-auto h-[350px] w-full max-w-[560px] sm:h-[430px]">
              <div className="absolute left-0 top-0 h-[72%] w-[56%] overflow-hidden rounded-md bg-gray-200 shadow-lg">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={titleForAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, 30vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}
              </div>
              <div
                className="absolute bottom-0 right-0 h-[78%] w-[64%] rounded-md border-8 shadow-xl"
                style={{ borderColor: "#f97316" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-gray-200">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={`${titleForAlt} featured`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 35vw"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-w-[640px] flex-col space-y-5 lg:space-y-6">
            {titleFromCms ? (
              <h2
                className="text-4xl font-extrabold leading-[1.05] tracking-tight text-black md:text-5xl lg:text-[3.4rem]"
              >
                {titleFromCms}
              </h2>
            ) : null}

            <div
              className="w-full max-w-none text-start prose prose-gray prose-accent-d354 prose-h1:text-2xl md:prose-h1:text-3xl prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-lg md:prose-h3:text-xl prose-p:text-lg prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-start prose-p:text-start prose-li:text-start prose-li:my-2 prose-li:marker:text-transparent"
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />

            {phone ? (
              <div className="flex w-full flex-col items-stretch gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border-2 border-neutral-900 bg-neutral-900 px-7 py-3 font-barlow text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                >
                  CALL US TODAY
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <Link
                  href={telHref}
                  className="inline-flex min-h-[22px] min-w-[140px] items-center justify-center gap-2 rounded-md px-6 py-3 font-barlow text-[1.2rem] font-bold text-white shadow-md transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: ACCENT,
                    outlineColor: ACCENT,
                  }}
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  {phone}
                </Link>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border-2 border-neutral-900 bg-neutral-900 px-7 py-3 font-barlow text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                >
                  CALL US TODAY
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
