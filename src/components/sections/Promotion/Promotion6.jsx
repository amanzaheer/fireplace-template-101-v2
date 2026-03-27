"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";

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

const CheckIcon = ({ filled }) => (
  <span
    className={`inline-flex items-center justify-center w-5 h-5 rounded border-2 border-blue-900 mt-1.5 ${
      filled ? "bg-blue-900" : "bg-white"
    }`}
  >
    <svg
      className={`w-4 h-4 ${filled ? "text-white" : "text-blue-900"}`}
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
  isMainCard = false,
}) => {
  return (
    <div
      className={`relative flex flex-col h-full border-2 border-dashed border-blue-950 rounded-md p-6 transition-all duration-200 ${
        isMainCard
          ? "bg-blue-950 text-white shadow-xl z-10 scale-105"
          : "bg-white text-blue-950"
      }`}
    >
      {heading && (
        <div className="mb-3 text-center">
          <MaybeMarkdown as="h3" className="text-2xl font-semibold tracking-tight mb-2 uppercase">
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown as="p" className="text-2xl font-bold mb-2">
              {subheading}
            </MaybeMarkdown>
          )}
          <div
            className={`border-b border-dotted w-3/4 mx-auto my-4 ${isMainCard ? "border-white/60" : "border-blue-950"}`}
          />
        </div>
      )}

      <div className="space-y-3 flex-1">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 text-sm font-medium ${
              isMainCard ? "" : "text-black"
            }`}
          >
            <CheckIcon filled={!isMainCard} />
            <MaybeMarkdown as="span" className="pt-0.5">{feature}</MaybeMarkdown>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 py-2 rounded font-bold text-xl tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
          isMainCard
            ? "bg-white text-blue-950 hover:bg-blue-100"
            : "bg-blue-950 text-white hover:bg-blue-800"
        }`}
      >
        Call For Redeem
      </button>
    </div>
  );
};

export default function Promotion6({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];

  return (
    <FullContainer id="promo">
      <Container>
        <div className="w-full pb-12 pt-8">
          <MaybeMarkdown as="h2" className="text-4xl font-extrabold text-center text-blue-950 mb-8 tracking-tight">
            {title}
          </MaybeMarkdown>
          {description && (
            <MaybeMarkdown as="p" className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
              {description}
            </MaybeMarkdown>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full">
            {details.map((item, index) => (
              <PromotionCard
                key={index}
                heading={item.heading}
                subheading={item.subheading}
                features={item.features}
                isMainCard={index === 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
