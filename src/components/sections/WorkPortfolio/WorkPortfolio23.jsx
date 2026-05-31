"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Montserrat } from "next/font/google";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { IMAGE_BASE } from "@/lib/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const IMG_W = 203.39;
const IMG_H = 123.93;
const IMG_RADIUS = 19.87;
const ACCENT_RED = "#cc3333";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function fileNameList(block) {
  if (!block || typeof block !== "object") return [];
  const raw = block.file_name;

  if (Array.isArray(raw)) {
    return raw.filter((x) => typeof x === "string" && x.trim());  
  }

  if (typeof raw === "string" && raw.trim()) {
    return [raw.trim()];
  }

  return [];
}

function scrollToContact() {
  const el =
    document.getElementById("quote-form-section") ??
    document.getElementById("contact-us");
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  } 
}

function telHref(phone) {
  if (!phone || typeof phone !== "string") return "#";
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

export default function WorkPortfolio23({ content }) {
  const block = content?.work_portfolio ?? null;
  if (!block) return null;

  const label =
    (typeof block.label === "string" && block.label.trim()) ||
    (typeof block.badge === "string" && block.badge.trim()) ||
    "Sweeping, Cleaning, Repair & Maintenance - Servicing";

  const title =
    (typeof block.title === "string" && block.title.trim()) ||
    "All Chimney Installation And Repair Work";

  const descriptionRaw =
    block.description ?? block.sub_title ?? block.value?.description ?? "";
  const descriptionHtml =
    typeof descriptionRaw === "string" && descriptionRaw.trim()
      ? md.render(descriptionRaw.trim())
      : "";

  const files = fileNameList(block);
  const displayFiles = files.slice(0, 10);

  if (displayFiles.length === 0 && !title && !descriptionHtml) return null;

  const phone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneDisplay = typeof phone === "string" ? phone.trim() : "";
  const ctaLabel =
    (typeof block.cta_button === "string" && block.cta_button.trim()) ||
    "Contact us";

  return (
    <FullContainer
      id="work-portfolio"
      className={`w-full bg-white py-10 md:py-14 lg:py-16 ${montserrat.className}`}
    >
      <Container className="mx-auto w-full max-w-[1270px] px-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center text-center">
          {/* Header */}
          {label ? (
            <span
              className="mb-4 inline-flex max-w-full items-center justify-center rounded-full bg-[#f0f0f0] px-5 py-2 text-sm font-semibold sm:text-base"
              style={{ color: ACCENT_RED }}
            >
              {label}
            </span>
          ) : null}

          {title ? (
            <h2 className="max-w-4xl text-2xl font-extrabold leading-tight text-black sm:text-3xl md:text-[36px] lg:text-[40px]">
              {title}
            </h2>
          ) : null}

          {descriptionHtml ? (
            <div
              className=" mx-auto mt-4 max-w-3xl text-center text-[16px] text-black sm:text-base [&_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : null}

          {/* 2 rows × 5 columns — Figma: 203.39 × 123.93, radius 19.87px */}
          {displayFiles.length > 0 ? (
            <ul
              className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 sm:mt-10 md:gap-4"
              aria-label={title || "Work portfolio"}
            >
              {displayFiles.map((fileName, index) => {
                const src = buildImageSrc(IMAGE_BASE, fileName);
                if (!src) return null;

                const alt = title
                  ? `${title} — ${index + 1} of ${displayFiles.length}`
                  : `Portfolio image ${index + 1}`;

                return (
                  <li
                    key={`${fileName}-${index}`}
                    className="relative h-[124px] w-[calc(50%-6px)] max-w-[203px] shrink-0 overflow-hidden rounded-[19.87px] sm:w-[203px]"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      unoptimized
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 45vw, 203px"
                      loading="lazy"
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}

          {/* CTA */}
          <div className="mt-10 flex w-full flex-col flex-wrap items-center justify-center gap-5 sm:mt-12 sm:flex-row sm:gap-8">
          <button
  type="button"
  onClick={scrollToContact}
  className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-lg border-2 border-[#BF1309] bg-white px-8 font-poppins text-[20px] font-bold leading-normal text-[#BF1309] transition-opacity hover:opacity-90"
>
  {ctaLabel}
</button>
            {phoneDisplay ? (
             <a
             href={telHref(phoneDisplay)}
             className="inline-flex items-center gap-4 text-black no-underline"
           >
             <span
               className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16"
               style={{ backgroundColor: ACCENT_RED }}
             >
               <svg
                 width="45"
                 height="45"
                 viewBox="0 0 46 46"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-10 w-10 sm:h-10 sm:w-10"
                 aria-hidden="true"
               >
                 <path
                   d="M32.6278 19.6793C32.1379 19.1894 31.893 18.583 31.893 17.8601C31.893 17.1372 32.1379 16.5316 32.6278 16.0435C33.1177 15.5553 33.7232 15.3103 34.4444 15.3086C35.1657 15.3069 35.772 15.5519 36.2636 16.0435C36.7552 16.535 36.9993 17.1406 36.9959 17.8601C36.9925 18.5796 36.7475 19.186 36.2611 19.6793C35.7746 20.1725 35.1691 20.4166 34.4444 20.4115C33.7198 20.4064 33.1143 20.1615 32.6278 19.6767M28.0658 14.1605L25.3868 11.4815C26.62 10.2483 28.0131 9.30255 29.5661 8.64428C31.1191 7.98601 32.7452 7.65602 34.4444 7.65432C36.1437 7.65262 37.7707 7.98261 39.3254 8.64428C40.88 9.30595 42.2723 10.2517 43.5021 11.4815L40.823 14.1605C39.9726 13.31 39.0056 12.6509 37.9221 12.1831C36.8386 11.7154 35.6793 11.4815 34.4444 11.4815C33.2095 11.4815 32.0512 11.7154 30.9694 12.1831C29.8876 12.6509 28.9197 13.31 28.0658 14.1605ZM43.2469 45.9259C37.9314 45.9259 32.6797 44.7676 27.4918 42.4509C22.3038 40.1342 17.5837 36.8488 13.3313 32.5947C9.07888 28.3405 5.79432 23.6204 3.47761 18.4342C1.16091 13.2479 0.00170096 7.99622 0 2.67901C0 1.91358 0.255144 1.27572 0.765432 0.765432C1.27572 0.255144 1.91358 0 2.67901 0H13.0123C13.6077 0 14.1392 0.202414 14.607 0.607243C15.0748 1.01207 15.3512 1.49004 15.4362 2.04115L17.0947 10.9712C17.1797 11.6516 17.1584 12.2257 17.0309 12.6934C16.9033 13.1612 16.6694 13.5652 16.3292 13.9053L10.142 20.1564C10.9925 21.7298 12.002 23.2496 13.1705 24.7158C14.3391 26.182 15.6259 27.5964 17.0309 28.9589C18.3491 30.2771 19.7311 31.5001 21.177 32.6278C22.6228 33.7556 24.1536 34.7863 25.7696 35.7202L31.7654 29.7243C32.1482 29.3416 32.6482 29.055 33.2657 28.8644C33.8831 28.6739 34.4887 28.6204 35.0823 28.7037L43.8848 30.4897C44.4801 30.6598 44.9691 30.9685 45.3519 31.4159C45.7346 31.8632 45.9259 32.3625 45.9259 32.9136V43.2469C45.9259 44.0124 45.6708 44.6502 45.1605 45.1605C44.6502 45.6708 44.0124 45.9259 43.2469 45.9259Z"
                   fill="white"
                 />
               </svg>
             </span>
           
             <span className="flex flex-col items-start text-left leading-none">
               <span className="text-[10px] font-semibold uppercase tracking-wide sm:text-sm">
                 Click to Call
               </span>
               <span className="mt-1 text-lg font-bold sm:text-xl md:text-2xl">
                 {phoneDisplay}
               </span>
             </span>
           </a>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
