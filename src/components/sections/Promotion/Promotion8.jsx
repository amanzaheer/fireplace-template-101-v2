"use client";

import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import md from "@/lib/markdown";

const promotionHeading = Poppins({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});
/**
 * Renders a string as plain text (preserving existing styles) when it contains
 * no markdown, or as HTML when markdown syntax is detected.
 * The wrapping element and className are passed through so styles stay intact.
 *
 * Uses md.render() (handles ## headings, **bold**, etc.) and strips the outer
 * <p>…</p> that markdown-it wraps plain paragraphs in, so the Tag's own
 * styles are not disrupted.
 */
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
function featureLineCount(item) {
  return Array.isArray(item?.features) ? item.features.length : 0;
}

/**
 * Puts cards with the same number of feature lines next to each other so a 2-column
 * row pairs equal-height content. Groups that have 2+ cards come first (sorted by
 * line count descending); leftover single cards follow.
 */
function orderDetailsForPairedAlignment(details) {
  if (!Array.isArray(details) || details.length <= 1) return details;

  const groups = new Map();
  for (const item of details) {
    const n = featureLineCount(item);
    if (!groups.has(n)) groups.set(n, []);
    groups.get(n).push(item);
  }

  const keysDesc = [...groups.keys()].sort((a, b) => b - a);
  const pairedFirst = [];
  const singles = [];
  for (const k of keysDesc) {
    const items = groups.get(k);
    if (items.length >= 2) pairedFirst.push(...items);
    else singles.push(...items);
  }

  return [...pairedFirst, ...singles];
}

function FeatureCheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white text-white"
      aria-hidden
    >
      <svg
        className="h-3.5 w-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/** Reference: navy shell ≈4–6px; orange “island” + CTA clearly rounder (~12–14px) */
const R_OUTER = "rounded-md";
const R_ORANGE = "rounded-xl md:rounded-[14px]";
const R_CTA = "rounded-xl md:rounded-[13px]";

function PromotionCard({
  subheading,
  heading,
  description,
  features,
  phone,
  ctaLabel,
}) {
  const featuresList = Array.isArray(features) ? features : [];
  const label = ctaLabel || phone;

  return (
    <article
      className={cn(
        "flex h-full min-h-0 w-full flex-col bg-[#061f4a] px-6 py-6 shadow-md md:px-8 md:py-8",
        R_OUTER,
      )}
    >
      {/* Fills extra height so orange panel + CTA sit on one baseline across all cards */}
      <div className="flex min-h-0 flex-1 flex-col items-stretch">
        {subheading ? (
          <MaybeMarkdown
            as="p"
            className="mb-2 text-center text-sm font-medium text-white md:mb-2.5 md:text-[15px]"
          >
            {subheading}
          </MaybeMarkdown>
        ) : null}

        {heading ? (
          <MaybeMarkdown
            as="h3"
            className={cn(
              promotionHeading.className,
              "mx-auto w-full max-w-[22rem] text-center text-[22px] font-semibold not-italic leading-[1.35] text-white sm:max-w-[24rem] sm:text-[26px] md:max-w-[26rem] md:text-[32px] md:leading-[1.4]",
            )}
          >
            {heading}
          </MaybeMarkdown>
        ) : null}

        {description ? (
          <MaybeMarkdown
            as="p"
            className="mx-auto mt-3 max-w-[22rem] text-center text-[13px] font-normal leading-relaxed text-white/90 sm:max-w-[24rem] md:mt-3.5 md:text-sm"
          >
            {description}
          </MaybeMarkdown>
        ) : null}
      </div>

      {featuresList.length > 0 ? (
        <div
          className={cn(
            "mx-auto mt-5 w-full max-w-[min(100%,22rem)] shrink-0 bg-[#D6510A] px-4 py-4 md:mt-6 md:max-w-[min(100%,24rem)] md:px-5 md:py-5",
            R_ORANGE,
          )}
        >
          <ul className="flex flex-col gap-3 md:gap-3.5">
            {featuresList.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-left text-[13px] font-medium leading-snug text-white md:text-[14px]"
              >
                <FeatureCheckIcon />
                <MaybeMarkdown as="span" className="min-w-0 pt-0.5">
                  {feature}
                </MaybeMarkdown>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {phone && label ? (
        <a
          href={`tel:${phone}`}
          className={cn(
            "mt-4 flex w-full shrink-0 items-center justify-center gap-[10px] bg-[#D6510A] px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6510A] md:mt-5 md:px-6 md:py-4 md:text-sm",
            R_CTA,
          )}
        >
          {label}
        </a>
      ) : null}
    </article>
  );
}

export default function Promotion8({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title;
  const description = promotion?.description;
  const rawDetails = Array.isArray(promotion?.details) ? promotion.details : [];
  const details = orderDetailsForPairedAlignment(rawDetails);
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const ctaLabel =
    typeof promotion?.cta_label === "string" ? promotion.cta_label.trim() : "";
  return (
    <FullContainer id="promo" className="bg-white">
      <Container className="max-w-[min(100%,88rem)] px-4 sm:px-5 md:px-6">
        <div className="w-full pb-10 pt-8 md:pb-14 md:pt-10">
          {title ? (
            <MaybeMarkdown
              as="h2"
              className="text-center text-xl font-bold tracking-tight text-neutral-900 md:text-2xl"
            >
              {title}
            </MaybeMarkdown>
          ) : null}
          {description ? (
            <MaybeMarkdown
              as="p"
              className={cn(
                "mx-auto max-w-xl text-center text-sm leading-relaxed text-neutral-600 md:text-[15px]",
                title ? "mt-3 md:mt-4" : "mt-0",
              )}
            >
              {description}
            </MaybeMarkdown>
          ) : null}

          <div
            className={cn(
              "flex flex-col items-stretch gap-[1.375rem] md:flex-row md:flex-nowrap md:items-stretch md:gap-[1.625rem]",
              title || description ? "mt-8 md:mt-10" : "mt-0 md:mt-0",
            )}
          >
            {details.map((item, index) => (
              <div
                key={`${featureLineCount(item)}-${index}-${item?.heading ?? ""}`}
                className="flex min-h-0 min-w-0 flex-1"
              >
                <PromotionCard
                  subheading={item.subheading}
                  heading={item.heading}
                  description={item.description}
                  features={item.features}
                  phone={phone}
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
