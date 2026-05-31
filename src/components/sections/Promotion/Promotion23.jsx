"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const hasMarkdown = /[*_`#\[\]~>]/.test(children);
  if (!hasMarkdown) {
    return <Tag className={className}>{children}</Tag>;
  }

  const html = md.render(children).replace(/^<p>([\s\S]*?)<\/p>\n?$/, "$1");

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const CARD_BG = "#0483B2";
const BUTTON_BG = "#FFFFFF";
const BUTTON_TEXT = "#FF4811";

const CheckIcon = () => (
  <span
    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
    style={{ backgroundColor: "#FFFFFF" }}
  >
    <svg
      className="h-4 w-4 text-orange-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </span>
);

const PromotionCard = ({
  heading,
  subheading,
  features,
  phoneHref,
  isMainCard = false,
}) => {
  return (
    <div
      className={`relative flex h-full flex-col rounded-[12px] p-6 text-white shadow-lg transition-all duration-200 ${isMainCard ? "md:-translate-y-2" : ""
        }`}
      style={{
        backgroundColor: CARD_BG,
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {heading && (
        <div className="mb-4 text-center">
          <MaybeMarkdown
            as="h3"
            className="mb-2 text-2xl font-extrabold uppercase tracking-tight text-black"
          >
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown
              as="p"
              className="mb-2 text-2xl font-extrabold text-black"
            >
              {subheading}
            </MaybeMarkdown>
          )}
          <div
            className="mx-auto my-4 w-3/4 border-b border-dotted"
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
          />
        </div>
      )}
      <div className="flex-1 space-y-3">
        {(Array.isArray(features) ? features : []).map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 text-sm font-medium leading-6 text-white"
          >
            <CheckIcon />
            <MaybeMarkdown as="span" className="pt-0.5 text-white">
              {feature}
            </MaybeMarkdown>
          </div>
        ))}
      </div>
      <a
        href={phoneHref}
        className={`${poppins.className} mt-6 block w-full rounded py-3 text-center transition-all duration-200 hover:opacity-90 focus:outline-none`}
        style={{
          backgroundColor: BUTTON_BG,
          color: BUTTON_TEXT,
          fontWeight: 500,
          fontSize: "23.08px",
          lineHeight: "100%",
          letterSpacing: "0%",
        }}
      >
        Call For Redeem
      </a>
    </div>
  );
};

export default function Promotion23({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];
  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";

  return (
    <FullContainer id="promo" className="bg-white">
      <Container>
        <div className="w-full pb-12 pt-8 md:pb-16 md:pt-12">
          <MaybeMarkdown
            as="h2"
            className="mb-8 text-center text-4xl font-extrabold tracking-tight text-black"
          >
            {title}
          </MaybeMarkdown>

          {description && (
            <MaybeMarkdown
              as="p"
              className="mx-auto mb-10 max-w-2xl text-center text-gray-700"
            >
              {description}
            </MaybeMarkdown>
          )}

          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {details.map((item, index) => (
              <PromotionCard
                key={index}
                heading={item.heading}
                subheading={item.subheading}
                features={item.features}
                phoneHref={phoneHref}
                isMainCard={index === 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
