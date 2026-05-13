"use client";

import { Poppins } from "next/font/google";
import { mdiShieldCheckOutline } from "@mdi/js";
import Icon from "@mdi/react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import md from "@/lib/markdown";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
const promotionHeading = poppins;
const promotionBody = poppins;

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
    "$1",
  );

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function featureLineCount(item) {
  return Array.isArray(item?.features)
    ? item.features.length
    : 0;
}

/** Cards with exactly 5 features first (leftmost in the cards row); all others keep their relative order. */
function orderDetailsFiveFirst(details) {
  if (!Array.isArray(details) || details.length === 0) {
    return details;
  }

  const five = [];
  const rest = [];

  for (const item of details) {
    if (featureLineCount(item) === 5) {
      five.push(item);
    } else {
      rest.push(item);
    }
  }

  return [...five, ...rest];
}

function FeatureCheckIcon({ variant = "dark" }) {
  const isOrange = variant === "orange";

  if (isOrange) {
    return (
      <span
        className="mt-0.5 inline-flex h-[29.42px] w-[30.25px] shrink-0 items-center justify-center rounded-[5px] bg-[#f2a33c] px-[8px] py-[6px] text-white"
        aria-hidden
      >
        <Icon
          path={mdiShieldCheckOutline}
          size={null}
          className="h-[17.42px] w-[14.25px]"
        />
      </span>
    );
  }

  return (
    <span
      className="mt-0.5 flex h-[20.2px] w-[20.2px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-black bg-transparent text-black"
      aria-hidden
    >
      <svg
        className="h-2.5 w-2.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function PhoneGlyph({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

const R_CARD = "rounded-[18px] md:rounded-[20px]";
const R_INNER = "rounded-[12px] md:rounded-[8.41px]";
const R_CTA = "rounded-xl md:rounded-[10px]";

function PromotionCard(props) {
  const {
    subheading,
    heading,
    description,
    features,
    phone,
    ctaLabel,
    plainShell = false,
  } = props;

  const featuresList = Array.isArray(features)
    ? features
    : [];

  const label =
    (typeof ctaLabel === "string" &&
      ctaLabel.trim()) ||
    phone;

  const articleClass = plainShell
    ? cn(
        "flex h-full min-h-0 w-full  flex-col justify-center  bg-transparent px-0 py-2",
        "md:mx-auto md:w-full md:max-w-[260px] md:min-h-0 md:gap-5 md:px-0 md:py-4",
      )
    : cn(
        "flex h-full min-h-0 w-full flex-col gap-5 bg-gradient-to-b from-[#4b2ea2] to-[#1e70bf] px-4 py-7 shadow-lg shadow-black/25",
        "md:mx-auto md:w-full md:max-w-[440px] md:min-h-[482.16px] md:gap-[25.24px] md:px-6 md:py-[42.07px]",
        R_CARD,
      );
  return (
    <article className={articleClass}>
      <div
        className={cn(
          "flex min-h-0 flex-col",
          plainShell
            ? "items-start gap-3"
            : "flex-1 items-stretch gap-1.5 md:gap-2",
        )}
      >
        {subheading && !plainShell ? (
          <MaybeMarkdown
            as="p"
            className="text-center text-sm font-medium text-white/95 md:text-[15px]"
          >
            {subheading}
          </MaybeMarkdown>
        ) : null}

        {heading ? (
          <MaybeMarkdown
            as="h3"
            className={cn(
              promotionHeading.className,
              "not-italic text-white",
              plainShell
                ? "max-w-[12rem] text-left text-[26px] font-bold uppercase leading-[32px] tracking-normal"
                : "mx-auto w-full text-center text-[26px] font-semibold leading-[1.4] tracking-normal sm:text-[30px] md:text-[35.34px]",
            )}
          >
            {heading}
          </MaybeMarkdown>
        ) : null}

        {description ? (
          <MaybeMarkdown
            as="p"
            className={cn(
              "text-[13px] font-normal leading-relaxed text-white/90 md:text-[13px]",
              plainShell
                ? "text-left"
                : "mx-auto mt-1.5 max-w-[22rem] text-center md:mt-2",
            )}
          >
            {description}
          </MaybeMarkdown>
        ) : null}
      </div>

      {featuresList.length > 0 ? (
        <div
          className={cn(
            "w-full shrink-0",
            plainShell
              ? "mx-0 max-w-full bg-transparent px-0 py-0 shadow-none"
              : cn(
                  "mx-auto max-w-[min(100%,22rem)] bg-white px-4 py-4 shadow-[0_8px_28px_rgba(0,0,0,0.14)]",
                  "md:w-[300px] md:min-h-[280px] md:max-w-none md:px-[22px] md:py-[26px]",
                  R_INNER,
                ),
          )}
        >
          <ul
            className={cn(
              "flex flex-col",
              plainShell ? "gap-3 md:gap-3.5" : "gap-3 md:gap-[13.46px]",
            )}
          >
            {featuresList.map((feature, index) => (
              <li
                key={index}
                className={cn(
                  promotionBody.className,
                  "flex items-start text-left",
                  plainShell
                    ? "gap-[10px] text-[16px] font-regular leading-[1.2] tracking-tight text-white"
                    : "gap-2.5 text-[13.46px] font-normal leading-[1.2] tracking-normal text-neutral-900",
                )}
              >
                <FeatureCheckIcon variant={plainShell ? "orange" : "dark"} />

                <MaybeMarkdown
                  as="span"
                  className="min-w-0 pt-0.5"
                >
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
            "flex shrink-0 items-center justify-center gap-2 bg-[#f2a33c] text-white shadow-md shadow-black/15 transition-[opacity,transform] hover:opacity-95 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a33c]",
            plainShell
              ? "mt-2 w-full max-w-[200px] self-start px-4 py-2.5 text-[13px] font-semibold normal-case tracking-normal"
              : cn(
                  "mx-auto w-full max-w-[min(100%,22rem)] px-5 py-3.5 text-center text-xs font-bold uppercase tracking-[0.12em]",
                  "md:w-[300px] md:max-w-none md:px-5 md:py-3.5 md:text-[13px]",
                ),
            R_CTA,
          )}
        >
          {plainShell ? (
            <>
              <PhoneGlyph className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </>
          ) : (
            label
          )}
        </a>
      ) : null}
    </article>
  );
}

export default function Promotion9({ content }) {
  const promotion = content?.promotion ?? {};

  const title = promotion?.title;
  const description = promotion?.description;

  const rawDetails = Array.isArray(
    promotion?.details,
  )
    ? promotion.details
    : [];

  const details = orderDetailsFiveFirst(rawDetails);

  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  const ctaLabel =
    typeof promotion?.cta_label === "string"
      ? promotion.cta_label.trim()
      : "";

  const hasDesc = Boolean(description);
  const hasTitle = Boolean(title);

  return (
    <FullContainer
      id="promo"
      className="bg-[#1a1a1a]"
    >
      <Container className="max-w-[min(100%,88rem)] px-4 sm:px-5 md:px-6">
        <div
          className={cn(
            "w-full pb-12 pt-10 md:pb-16 md:pt-12",
            "md:grid md:items-start md:gap-x-8 md:gap-y-10",
            hasDesc
              ? "md:grid-cols-[minmax(200px,320px)_minmax(0,1fr)_minmax(0,1fr)]"
              : "md:grid-cols-2",
          )}
        >
          {title ? (
            <MaybeMarkdown
              as="h2"
              className={cn(
                promotionHeading.className,
                "text-center text-[1.65rem] font-semibold tracking-tight text-white sm:text-3xl md:text-[2rem] md:leading-tight",
                hasDesc
                  ? "md:col-span-3"
                  : "md:col-span-2",
              )}
            >
              {title}
            </MaybeMarkdown>
          ) : null}

          {description ? (
            <div
              className={cn(
                "flex flex-col",
                hasTitle &&
                  hasDesc &&
                  "md:row-start-2",
                hasDesc &&
                  !hasTitle &&
                  "md:row-start-1",
                title
                  ? "mt-6 md:mt-0"
                  : "mt-8 md:mt-0",
              )}
            >
              <MaybeMarkdown
                as="div"
                className={cn(
                  promotionHeading.className,
                  "prose prose-invert prose-headings:mt-0 prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-white prose-p:my-2 prose-ul:my-2 prose-li:my-1 max-w-none text-sm leading-relaxed text-white/90 md:text-left md:text-[15px]",
                )}
              >
                {description}
              </MaybeMarkdown>

              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className={cn(
                    "mt-6 inline-flex w-full max-w-full items-center justify-center gap-2.5 bg-[#f2a33c] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-black/15 transition-[opacity,transform] hover:opacity-95 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a33c] sm:text-base",
                    R_CTA,
                  )}
                >
                  <PhoneGlyph className="h-5 w-5 shrink-0 opacity-95" />

                  <span className="truncate">
                    {phone}
                  </span>
                </a>
              ) : null}
            </div>
          ) : null}

          <div
            className={cn(
              "flex flex-col gap-[20px] md:flex-row md:flex-nowrap md:items-stretch md:justify-end md:gap-[20px]",
              hasDesc &&
                "md:col-span-2 md:col-start-2",
              hasDesc &&
                hasTitle &&
                "md:row-start-2",
              hasDesc &&
                !hasTitle &&
                "md:row-start-1",
              !hasDesc && "md:col-span-2",
              !hasDesc &&
                hasTitle &&
                "md:row-start-2",
              !hasDesc &&
                !hasTitle &&
                "md:row-start-1",
              title || description
                ? "mt-10 md:mt-0"
                : "mt-0",
            )}
          >
            {details.map((item, index) => {
              const n = featureLineCount(item);
              const isPlain = n === 5;
              return (
                <div
                  key={`${n}-${index}-${item?.heading ?? ""}`}
                  className={cn(
                    "flex min-h-0 min-w-0",
                    isPlain
                      ? "md:mr-auto md:max-w-[260px] md:flex-none md:items-center md:self-center"
                      : "md:w-[440px] md:max-w-[440px] md:flex-none md:basis-[440px]",
                  )}
                >
                  <PromotionCard
                    subheading={item.subheading}
                    heading={item.heading}
                    description={item.description}
                    features={item.features}
                    phone={phone}
                    ctaLabel={ctaLabel}
                    plainShell={isPlain}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}