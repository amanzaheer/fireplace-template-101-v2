"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";
import { Poppins, Inter, Rubik } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const contentStyles =
  "[&_h1]:text-white [&_h1]:font-bold [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:mb-3 " +
  "[&_h2]:text-white [&_h2]:font-bold [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:mb-3 [&_h2]:mt-4 " +
  "[&_h3]:text-white [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mb-2 [&_h3]:mt-3 " +
  "[&_p]:text-white [&_p]:text-[16px] [&_p]:leading-[21p] [&_p]:mb-3 " +
  "[&_li]:text-white [&_li]:text-[16px] [&_li]:leading-[21px] " +
  "[&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:mb-3 " +
  "[&_strong]:text-white [&_strong]:font-semibold " +
  "[&_a]:text-[#FF0011] [&_a]:underline hover:text-white";
function PhoneCallIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M1 2h8.58l1.487 6.69l-1.86 1.86a14.1 14.1 0 0 0 4.243 4.242l1.86-1.859L22 14.42V23h-1a19.9 19.9 0 0 1-10.85-3.196a20.1 20.1 0 0 1-5.954-5.954A19.9 19.9 0 0 1 1 3z"
      />
    </svg>
  );
}
function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}
const SCROLL_OFFSET = 100;

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function ServiceDescription18({ content }) {
  const router = useRouter();
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  const scrollToQuoteForm = useCallback(() => {
    const el =
      document.getElementById("quote-form-section") ??
      document.getElementById("contact-us") ??
      document.getElementById("working_process");
    if (el) {
      
      const top =
        el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }
    router.push("/#quote-form-section");
  }, [router]);

  if (!content?.service_description?.description) return null;

  const title = content?.service_description?.title ?? "Our Service";
  const description =
    content?.service_description?.description ||
    "Professional, reliable service from experienced local technicians.";

  const imageSrc = content?.service_description?.file_name
    ? buildImageSrc(IMAGE_BASE, content?.service_description?.file_name)
    : buildImageSrc(IMAGE_BASE, "hero/hero.webp");
  return (
    <FullContainer id="service_description" className="py-10 md:py-14 bg-black">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className={`${poppins.className}  text-3xl md:text-5xl font-extrabold tracking-tight text-white text-center mb-8 md:mb-10`}>
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <div
                className={`${inter.className} ${contentStyles} w-full text-left text-white`}
                dangerouslySetInnerHTML={{ __html: md.render(description) }}
              />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToQuoteForm}
                  className={`${rubik.className} inline-flex max-w-full cursor-pointer items-center justify-center gap-2 border-0 bg-[#212020] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#111827]`}
                >
                  GET A QUOTE
                  <span aria-hidden="true">→</span>
                </button>
                {phone ? (
                  <a
                    href={telHref(phone)}
                    className={`${rubik.className} inline-flex max-w-full items-center justify-center gap-2 rounded bg-[#FF0011] px-6 py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-[#bf1f1f]`}
                  >
                    <PhoneCallIcon className="h-4 w-4 shrink-0" />
                    <span>{phone}</span>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="relative w-full min-h-[260px] md:min-h-[340px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm order-1 md:order-2">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
