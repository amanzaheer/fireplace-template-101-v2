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
    <article className="flex h-full min-h-0 flex-col rounded-xl bg-[#061f4a] px-5 py-6 shadow-md md:rounded-2xl md:px-6 md:py-7">
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
              "mx-auto w-full max-w-[20rem] text-center text-[22px] font-semibold not-italic leading-[1.35] text-white sm:max-w-[22rem] sm:text-[26px] md:max-w-[24rem] md:text-[32px] md:leading-[1.4]",
            )}
          >
            {heading}
          </MaybeMarkdown>
        ) : null}

        {description ? (
          <MaybeMarkdown
            as="p"
            className="mx-auto mt-3 max-w-[20rem] text-center text-[13px] font-normal leading-relaxed text-white/90 sm:max-w-[22rem] md:mt-3.5 md:text-sm"
          >
            {description}
          </MaybeMarkdown>
        ) : null}

        {featuresList.length > 0 ? (
          <div className="mt-5 w-full rounded-lg bg-[#D6510A] px-4 py-4 md:mt-6 md:rounded-[10px] md:px-5 md:py-5">
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
      </div>

      {phone && label ? (
        <a
          href={`tel:${phone}`}
          className="mt-5 flex w-full shrink-0 items-center justify-center gap-[10px] rounded-lg bg-[#D6510A] px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6510A] md:mt-6 md:px-6 md:py-4 md:text-sm"
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
      <Container className="max-w-5xl">
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
              "grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6",
              title || description ? "mt-8 md:mt-10" : "mt-0 md:mt-0",
            )}
          >
            {details.map((item, index) => (
              <PromotionCard
                key={`${featureLineCount(item)}-${index}-${item?.heading ?? ""}`}
                subheading={item.subheading}
                heading={item.heading}
                description={item.description}
                features={item.features}
                phone={phone}
                ctaLabel={ctaLabel}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
