"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Inter, Montserrat } from "next/font/google";
import { ArrowRight, Check } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

const CheckIcon = () => (
  <span
    className="inline-flex shrink-0 items-center justify-center w-6 h-6 rounded-full border border-white/90 text-white"
    aria-hidden
  >
    <Check className="w-3.5 h-3.5 stroke-3" />
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
  isMainCard = false,
  isLastCard = false,
}) => {
  return (
    <div
      className={`relative flex flex-col h-full min-h-[500px] p-6 text-white transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.25)] bg-[linear-gradient(180deg,#c58a2e_0%,#151a1f_45%,#0f1215_100%)] ${
        isMainCard ? "pt-6" : ""
      }`}
    >
      {heading && (
        <div className="mb-3 text-center">
          <MaybeMarkdown as="h3" className={`${montserrat.className} text-2xl font-semibold tracking-tight mb-2 uppercase`}>
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown as="p" className={`${montserrat.className} text-2xl font-bold mb-2`}>
              {subheading}
            </MaybeMarkdown>
          )}
          <div
            // className={`border-b border-dotted w-3/4 mx-auto my-4 ${isMainCard ? "border-white/60" : "border-blue-950"}`}
          />
        </div>
      )}

      <div
        className={`flex flex-col items-center gap-3 flex-1 w-full ${
          isMainCard ? "mt-8" : isLastCard ? "mt-6" : "mt-3"
        }`}
      >
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`${inter.className} flex w-full items-start gap-2 text-xs md:text-sm font-medium text-white leading-snug`}
          >
            <CheckIcon />
            <MaybeMarkdown as="span" className="min-w-0 flex-1 text-left wrap-break-word">
              {feature}
            </MaybeMarkdown>
          </div>
        ))}
      </div>

      <button
        className={`${montserrat.className} w-full max-w-[512px] h-[50px] mt-6 mx-auto flex items-center justify-center gap-2 bg-[#f4aa2a] text-black font-extrabold text-xl tracking-wide uppercase transition-all duration-200 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2`}
      >
        {isMainCard ? (
        <span className={`${montserrat.className} inline-flex items-center font-bold text-lg md:text-[24px] gap-2`}>
          <PhoneCallIcon className="w-5 h-5" />
          {phone || "(888)-249-0566"}
        </span>
        ) : (
        <span className={`${montserrat.className} text-lg md:text-[18px] flex items-center justify-center gap-2`}>
          <span className="text-black">Call Us Today</span>
          <ArrowRight className="w-5 h-5 text-black" />
        </span>
        )}
      </button>
    </div>
  );
};

export default function Promotion9({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];
  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  return (
    <FullContainer id="promo">
      <Container>
        <div className="w-full pb-12 pt-8">
          <MaybeMarkdown as="h2" className={`${montserrat.className} text-4xl md:text-[44px] font-extrabold text-center text-[#2d2d2d] mb-8 tracking-tight`}>
            {title}
          </MaybeMarkdown>
          {description && (
            <MaybeMarkdown as="p" className={`${inter.className} text-center text-gray-700 mb-8 max-w-2xl mx-auto`}>
              {description}
            </MaybeMarkdown>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full">
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
