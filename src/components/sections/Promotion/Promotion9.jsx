"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Phone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
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

function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string") return <Tag className={className}>{children}</Tag>;
  const hasMarkdown = /[*_`#\[\]~>]/.test(children);
  if (!hasMarkdown) return <Tag className={className}>{children}</Tag>;
  const html = md.render(children).replace(/^<p>([\s\S]*?)<\/p>\n?$/, "$1");
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function LeftOrangeCheckIcon() {
  return (
    <span
      className="inline-flex h-[29.42px] min-w-[30.25px] shrink-0 items-center justify-center rounded-[5px] bg-[#EFA536] px-2 py-[6px]"
      aria-hidden
    >
      <ShieldCheck className="h-[14px] w-[14px] text-[#FFFFFF]" strokeWidth={2.5} />
    </span>
  );
}

function CardListCheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#040404] bg-transparent">
      <svg
        className="h-3 w-3 shrink-0 text-[#040404]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </span>
  );
}

function resolvePhone(content) {
  const raw =
    content?.navbar?.phone ??
    content?.contact_info?.phone ??
    content?.banner?.cta_phone ??
    "";
  return typeof raw === "string" ? raw : "";
}

function PromotionGradientCard({
  heading,
  subheading,
  cardDescription,
  features,
  phoneLink,
  ctaLabel,
}) {
  const list = Array.isArray(features) ? features : [];

  return (
    <div className="flex h-full min-h-0 w-full max-w-[420px] flex-col rounded-2xl bg-gradient-to-b from-[#4b26a6] to-[#1a73e8] p-5 shadow-xl sm:p-6">
      <div className="flex flex-col gap-1 sm:gap-1.5">
        <div className="flex h-[148px] shrink-0 flex-col justify-start overflow-hidden text-center sm:h-[158px]">
          {subheading ? (
            <MaybeMarkdown
              as="p"
              className={`${poppins.className} mb-1 text-xs font-semibold uppercase tracking-wide text-white/90 sm:text-sm`}
            >
              {subheading}
            </MaybeMarkdown>
          ) : null}
          {heading ? (
            <MaybeMarkdown
              as="h3"
              className={`${poppins.className} line-clamp-3 text-[32px] font-bold uppercase leading-[1.1] tracking-tight text-[#FFFFFF] sm:text-[35.34px]`}
            >
              {heading}
            </MaybeMarkdown>
          ) : null}
          {cardDescription ? (
            <MaybeMarkdown
              as="p"
              className={`${poppins.className} mx-auto mt-1 line-clamp-3 max-w-[280px] text-center text-[12px] leading-snug text-white/85 sm:max-w-[320px] sm:text-[13px]`}
            >
              {cardDescription}
            </MaybeMarkdown>
          ) : null}
        </div>

        <div className="-mt-0.5 w-full min-w-0 shrink-0 rounded-xl bg-white p-3.5 shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] sm:-mt-1 sm:p-4">
          <ul className="flex flex-col gap-2.5 sm:gap-3">
            {list.map((feature, index) => (
              <li
                key={index}
                className={`${poppins.className} flex items-start gap-3 text-[13.46px] font-medium leading-snug text-[#040404]`}
              >
                <CardListCheckIcon />
                <MaybeMarkdown as="span" className="min-w-0 flex-1 leading-snug">
                  {feature}
                </MaybeMarkdown>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={phoneLink}
          className={`${poppins.className} flex w-full shrink-0 items-center justify-center rounded-xl bg-[#f2a33c] px-4 py-3 text-center text-[21.04px] font-bold uppercase tracking-wide text-[#FFFFFF] shadow-md transition-colors hover:bg-[#e89430] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4b26a6]`}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

export default function Promotion9({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];
  const ctaLabel =
    typeof promotion?.cta_label === "string" && promotion.cta_label.trim()
      ? promotion.cta_label.trim()
      : "Call For Redeem";

  const phoneDisplay = resolvePhone(content);
  const phoneLink = phoneDisplay ? `tel:${phoneDisplay}` : "#";

  const leftBlock = details[0];
  const promoCards = details.slice(1);

  const showLeft = Boolean(
    leftBlock &&
      (leftBlock.heading ||
        leftBlock.subheading ||
        (Array.isArray(leftBlock.features) && leftBlock.features.length > 0)),
  );

  const gridClass =
    showLeft && promoCards.length >= 2
      ? "grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8"
      : showLeft && promoCards.length === 1
        ? "grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8"
        : promoCards.length >= 2
          ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-8"
          : "grid grid-cols-1 gap-8";

  const leftFeatures = Array.isArray(leftBlock?.features)
    ? leftBlock.features
    : [];

  return (
    <FullContainer id="promo" className="bg-[#121212]">
      <Container>
        <div className="w-full py-12 md:py-16">
          <div
            className={cn(
              "mb-5 grid w-full grid-cols-1 md:mb-6",
              showLeft ? "lg:grid-cols-3 lg:gap-6 xl:gap-8" : "",
            )}
          >
            <div
              className={cn(
                "text-center",
                showLeft ? "lg:col-span-2 lg:col-start-2" : "",
              )}
            >
              <MaybeMarkdown
                as="h2"
                className={cn(
                  `${poppins.className} text-[44px] font-extrabold tracking-tight text-[#FFFFFF]`,
                  description ? "mb-3" : "",
                )}
              >
                {title}
              </MaybeMarkdown>
              {description ? (
                <MaybeMarkdown
                  as="p"
                  className="mx-auto max-w-2xl text-center text-base text-white/75"
                >
                  {description}
                </MaybeMarkdown>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              gridClass,
              "items-start lg:items-stretch",
            )}
          >
            {showLeft ? (
              <div className="flex min-h-0 w-full max-w-lg flex-col justify-center gap-6 self-start lg:h-full lg:max-w-md lg:self-stretch lg:justify-center lg:gap-5">
                <div className="w-full">
                  {leftBlock.heading ? (
                    <MaybeMarkdown
                      as="h3"
                      className={`${poppins.className} mb-6 text-[26px] font-bold uppercase leading-[32px] tracking-normal text-[#FFFFFF]`}
                    >
                      {leftBlock.heading}
                    </MaybeMarkdown>
                  ) : null}
                  {leftBlock.subheading ? (
                    <MaybeMarkdown
                      as="p"
                      className="mb-4 text-base font-semibold text-white/90"
                    >
                      {leftBlock.subheading}
                    </MaybeMarkdown>
                  ) : null}
                  {leftFeatures.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                      {leftFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-[10px]"
                        >
                          <LeftOrangeCheckIcon />
                          <MaybeMarkdown
                            as="span"
                            className={`${poppins.className} min-w-0 flex-1 text-[16px] font-medium leading-[100%] tracking-normal text-[#FFFFFF]`}
                          >
                            {feature}
                          </MaybeMarkdown>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {phoneDisplay ? (
                  <a
                    href={phoneLink}
                    className={`${rubik.className} mt-2 inline-flex h-[47px] w-[217px] shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#EFA536] text-[19px] font-semibold text-[#FFFFFF] shadow-md transition-colors hover:bg-[#e49a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]`}
                  >
                    <Phone className="h-5 w-5 shrink-0 text-[#FFFFFF]" strokeWidth={2.25} />
                    <span>{phoneDisplay}</span>
                  </a>
                ) : null}
              </div>
            ) : null}

            {promoCards.map((item, index) => (
              <div
                key={item?.heading ?? index}
                className="flex min-h-0 w-full min-w-0 justify-center lg:h-full"
              >
                <PromotionGradientCard
                  heading={item.heading}
                  subheading={item.subheading}
                  cardDescription={
                    item.card_description ??
                    item.description ??
                    item.blurb ??
                    ""
                  }
                  features={item.features}
                  phoneLink={phoneLink}
                  ctaLabel={ctaLabel}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
