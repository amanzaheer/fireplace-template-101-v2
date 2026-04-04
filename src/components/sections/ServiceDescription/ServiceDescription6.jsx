"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

export default function ServiceDescription6({ content }) {
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";

  const description =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const scrollToQuote = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector(
        '.quote-form, [id*="quote"], [class*="quote-form"]'
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
      <Container className="px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-8 xl:gap-10">
          <div className="flex max-w-[600px] flex-col space-y-5 md:space-y-6">
            <div
              className="w-full text-start prose prose-headings:font-bold prose-headings:text-black prose-h1:text-2xl md:prose-h1:text-3xl prose-h2:text-xl md:prose-h2:text-2xl prose-h3:text-lg md:prose-h3:text-xl prose-p:text-gray-600 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-[#002B5B] prose-a:font-semibold prose-headings:text-start prose-p:text-start prose-li:text-start"
              dangerouslySetInnerHTML={{ __html: md.render(description) }}
            />
            {phone ? (
              <div className="hidden w-full items-start pt-2 md:flex md:flex-col md:gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-9">
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-black px-15 py-3 font-barlow text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  Get a quote
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <Link
                  href={`tel:${phone}`}
                  className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-lg bg-[#F97316] px-6 py-3 font-barlow text-base font-bold text-white shadow-sm transition-colors hover:bg-[#ea580c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  {phone}
                </Link>
              </div>
            ) : null}
          </div>

          <div>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm sm:aspect-5/4 lg:aspect-5/4 min-h-[260px] md:min-h-0">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
