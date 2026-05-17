"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Montserrat } from "next/font/google";
import { Check } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Renders markdown only when markdown syntax exists
 */
function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const hasMarkdown = /[*_`#\[\]~>]/.test(children);

  if (!hasMarkdown) {
    return <Tag className={className}>{children}</Tag>;
  }

  const html = md.render(children).replace(
    /^<p>([\s\S]*?)<\/p>\n?$/,
    "$1"
  );

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const CheckIcon = () => (
  <span
    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#d51215] text-[#d51215]"
    aria-hidden
  >
    <Check className="h-3.5 w-3.5 stroke-3" />
  </span>
);

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

const PromotionCard = ({
  heading,
  subheading,
  features,
  phone = "",
  ctaLabel = "",
  isMainCard = false,
  isLastCard = false,
}) => {
  const phoneHref = phone
    ? `tel:${String(phone).replace(/[^\d+]/g, "")}`
    : "#";

  return (
    <div
      className={`relative flex h-full min-h-[500px] flex-col overflow-hidden border-x-2 border-black bg-white p-6 text-black transition-all duration-200 ${
        isMainCard ? "pt-6" : ""
      }`}
    >
      {/* Header */}
      {heading && (
        <div className="-mx-6 -mt-6 mb-3 flex h-[132px] w-auto flex-col justify-center bg-[#4685ac] px-6 py-4 text-center text-white">
          <MaybeMarkdown
            as="h3"
            className={`${montserrat.className} mb-2 text-2xl font-semibold uppercase tracking-tight`}
          >
            {heading}
          </MaybeMarkdown>

          {subheading && (
            <MaybeMarkdown
              as="p"
              className={`${montserrat.className} mb-2 text-2xl font-bold`}
            >
              {subheading}
            </MaybeMarkdown>
          )}
        </div>
      )}

      {/* Features */}
      <div
        className={`flex flex-1 flex-col items-center gap-3 w-full ${
          isMainCard ? "mt-8" : isLastCard ? "mt-6" : "mt-3"
        }`}
      >
        {(Array.isArray(features) ? features : []).map((feature, index) => (
          <div
            key={index}
            className={`${montserrat.className} flex w-full items-start gap-2 text-xs font-medium leading-snug text-black md:text-sm`}
          >
            <CheckIcon />

            <MaybeMarkdown
              as="span"
              className="min-w-0 flex-1 break-words text-left"
            >
              {feature}
            </MaybeMarkdown>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href={phoneHref}
        className={`${montserrat.className} mt-auto flex h-[56px] w-[calc(100%+3rem)] -mx-6 -mb-6 items-center justify-center gap-2 border-none bg-[#d51215] px-6 text-center text-lg font-extrabold uppercase tracking-wide text-white outline-none ring-0 transition-all duration-200 hover:bg-[#b90f12] active:scale-[0.98]`}
      >
        {isMainCard ? (
          <span className="inline-flex items-center gap-2 text-white md:text-[24px]">
            <PhoneCallIcon className="h-5 w-5 text-white" />
            {phone}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2 text-white md:text-[18px]">
            {ctaLabel ? (
              ctaLabel
            ) : phone ? (
              <>
                <PhoneCallIcon className="h-5 w-5 shrink-0 text-white" />
                {phone}
              </>
            ) : null}
          </span>
        )}
      </a>
    </div>
  );
};

export default function Promotion10({ content }) {
  const promotion = content?.promotion ?? {};

  const title = promotion?.title ?? "";
  const description = promotion?.description;

  const details = Array.isArray(promotion?.details)
    ? promotion.details
    : [];

  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const secondaryRaw =
    typeof promotion?.secondary_cta_label === "string"
      ? promotion.secondary_cta_label.trim()
      : "";

  const primaryCtaRaw =
    typeof promotion?.cta_label === "string"
      ? promotion.cta_label.trim()
      : "";

  const sideCardCtaLabel = secondaryRaw || primaryCtaRaw;

  return (
    <FullContainer id="promo">
      <Container>
        <div className="w-full pb-12 pt-8">
          {/* Title */}
          {title ? (
            <MaybeMarkdown
              as="h2"
              className={`${montserrat.className} mb-8 text-center text-4xl font-extrabold tracking-tight text-[#2d2d2d] md:text-[44px]`}
            >
              {title}
            </MaybeMarkdown>
          ) : null}

          {/* Description */}
          {description && (
            <MaybeMarkdown
              as="p"
              className={`${montserrat.className} mx-auto mb-8 max-w-2xl text-center text-gray-700`}
            >
              {description}
            </MaybeMarkdown>
          )}

          {/* Cards */}
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {details.map((item, index) => {
              const isMain = index === 1;
              const isLast = index === details.length - 1;

              return (
                <PromotionCard
                  key={index}
                  heading={item.heading}
                  subheading={item.subheading}
                  features={item.features}
                  phone={phone}
                  ctaLabel={sideCardCtaLabel}
                  isMainCard={isMain}
                  isLastCard={isLast}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}