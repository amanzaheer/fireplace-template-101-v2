"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Phone, ShieldCheck } from "lucide-react";
import { IMAGE_BASE } from "@/lib/constants";
import { resolveRefArray } from "@/lib/content-helpers";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import QuoteForm26 from "./QuoteForm/QuoteForm26";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ACCENT_RED = "#D32F2F";
const BADGE_YELLOW = "#FFD700";
const PHONE_RING_YELLOW = "#EFA536";
const ALIGN_BAR = "#C9C9C9";
const SCROLL_OFFSET = 118;

const BANNER_CLIP =
  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 96%)";

function buildImageSrc(base, filePath) {
  if (!filePath || typeof filePath !== "string") return "";
  const basePath = (base ?? IMAGE_BASE).replace(/\/$/, "");
  const segment = filePath.replace(/^\//, "");
  return `${basePath}/${segment}`;
}

function firstImageSrc(...paths) {
  for (const path of paths) {
    const src = buildImageSrc(IMAGE_BASE, path);
    if (src) return src;
  }
  return "";
}

function splitHeading(headingText) {
  const text = (headingText || "").trim();
  if (!text) return { line1: "", line2: "" };

  const inMatch = text.match(/^(.+?)\s+(in\s+.+)$/i);
  if (inMatch) {
    return {
      line1: inMatch[1].trim().toUpperCase(),
      line2: inMatch[2].trim().toUpperCase(),
    };
  }

  return { line1: text.toUpperCase(), line2: "" };
}

function telHref(phone) {
  if (!phone) return "#";
  const digits = String(phone).replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function scrollToContactSection(sectionId) {
  const id = (sectionId || "contact-us").replace(/^#/, "").replace(/^\//, "");
  const targets = [
    document.getElementById(id),
    document.getElementById("contact-us"),
    document.getElementById("quote-form-section"),
  ].filter((el) => el instanceof HTMLElement);

  const element = targets[0];
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Banner26({ content }) {
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
  const heroImage =
    firstImageSrc(banner.file_name) ||
    buildImageSrc(IMAGE_BASE, "hero/hero.webp");

  const profileImage = firstImageSrc(
    banner.file_name2,
    banner.file_name3,
    banner.overlay_image,
  );
  const labels = content?.form_labels ?? {};
  const form_head = {
    title:
      banner.form_title ||
      labels.default_title ||
      content?.form_head?.title ||
      "",
    sub_title:
      banner.form_description ||
      labels.default_sub_title ||
      content?.form_head?.sub_title ||
      "",
  };
  const features = resolveRefArray(content, banner, "features");
  const phone =
    banner.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const needHelpLabel =
    typeof banner.need_help_label === "string"
      ? banner.need_help_label.trim()
      : "";

  const badgeText = (data.tagline || data.description || "").trim();
  const headingParts = splitHeading(data.heading || data.title);
  const contactMenuItem = content?.navbar?.menu_items?.find((item) =>
    /contact/i.test(String(item?.link ?? "")),
  );
  const connectLabel =
    (typeof banner.connect_label === "string" && banner.connect_label.trim()) ||
    contactMenuItem?.title ||
    "";
  const contactSectionId =
    (typeof banner.connect_link === "string" && banner.connect_link.trim()) ||
    (typeof contactMenuItem?.link === "string" && contactMenuItem.link.trim()) ||
    "contact-us";
  const contactHash = `#${contactSectionId.replace(/^#/, "").replace(/^\//, "")}`;

  return (
    <FullContainer
      id="banner"
      className={cn(
        "relative min-h-[580px] w-full overflow-hidden pt-[72px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[760px] lg:overflow-visible lg:pt-[100px]",
        poppins.className,
      )}
    >
      {heroImage ? (
        <>
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              clipPath: BANNER_CLIP,
            }}
          />
          {/* Light left overlay — keeps black text readable on dark image areas */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            style={{
              clipPath: BANNER_CLIP,
              background:
                "linear-gradient(105deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.32) 30%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.04) 65%, transparent 78%)",
            }}
            aria-hidden
          />
        </>
      ) : null}
      <Container className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:pb-16 lg:pt-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-center lg:gap-14 xl:grid-cols-[minmax(0,1.1fr)_400px]">
          {/* LEFT — content */}
          <div className="flex flex-col items-start text-left">
            {badgeText ? (
              <div
                className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-black px-4 py-2 text-sm font-medium text-black sm:text-[15px]"
                style={{ backgroundColor: ALIGN_BAR }}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: BADGE_YELLOW }}
                  aria-hidden
                />
                <span className="capitalize">{badgeText}</span>
              </div>
            ) : null}
            {(headingParts.line1 || headingParts.line2) ? (
              <h1 className="mt-5 max-w-[521px] text-[32px] font-bold uppercase leading-[34px] tracking-normal sm:text-[42px] sm:leading-[44px] lg:text-[55px] lg:leading-[57px]">
                {headingParts.line1 ? (
                  <span className="block text-black">{headingParts.line1}</span>
                ) : null}
                {headingParts.line2 ? (
                  <span
                    className="mt-1 block"
                    style={{ color: ACCENT_RED }}
                  >
                    {headingParts.line2}
                  </span>
                ) : null}
              </h1>
            ) : null}
            {data.description ? (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-black/85 sm:text-[17px]">
                {data.description}
              </p>
            ) : null}
            {features?.length > 0 ? (
              <ul className="mt-6 grid w-full max-w-xl grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {features.map((feature, idx) => {
                  const text =
                    typeof feature === "object" ? feature?.text : feature;
                  if (!text) return null;

                  return (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5"
                    >
                      <span
                        className="relative inline-block h-4 w-4 shrink-0"
                        aria-hidden
                      >
                        <ShieldCheck
                          className="absolute left-[12.5%] right-[12.5%] top-[4.17%] bottom-[4.17%] h-full w-full text-black"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="max-w-[202px] text-[16px] font-normal leading-[100%] tracking-normal text-black">
                        {text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              {connectLabel ? (
                <a
                  href={contactHash}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContactSection(contactSectionId);
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-black px-6 py-2.5 text-[15px] font-semibold text-black transition-colors hover:opacity-90"
                  style={{ backgroundColor: ALIGN_BAR }}
                >
                  {connectLabel}
                </a>
              ) : null}

              {phone || profileImage ? (
                <div className="flex items-center gap-3">
                  <div className="relative flex shrink-0 items-center">
                    {phone ? (
                      <a
                        href={telHref(phone)}
                        className="relative z-0 flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-90"
                        style={{ backgroundColor: PHONE_RING_YELLOW }}
                        aria-label={needHelpLabel || phone}
                      >
                        <Phone
                          className="h-5 w-5 text-black"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                      </a>
                    ) : null}

                    {profileImage ? (
                      <span
                        className={cn(
                          "relative z-10 h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md",
                          phone && "-ml-4",
                        )}
                      >
                        <Image
                          src={profileImage}
                          alt={data.altImage || data.imageTitle || banner.alt || ""}
                          fill
                          className="object-cover"
                          sizes="52px"
                        />
                      </span>
                    ) : null}
                  </div>

                  {phone ? (
                    <div className="flex flex-col leading-tight text-black">
                      <span className="text-sm font-medium">{needHelpLabel}</span>
                      <a
                        href={telHref(phone)}
                        className="text-lg font-bold transition-opacity hover:opacity-80 sm:text-xl"
                      >
                        {phone}
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {/* RIGHT — form (shifted into lower white space on desktop) */}
          <div className="mx-auto mb-6 w-full max-w-[400px] mt-8 pt-6 sm:max-w-none sm:pt-10 lg:mb-8 lg:mt-10 lg:max-w-[400px] lg:translate-y-14 xl:translate-y-[4rem]">
            <QuoteForm26
              form_head={form_head}
              labels={labels}
              phone={phone}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
