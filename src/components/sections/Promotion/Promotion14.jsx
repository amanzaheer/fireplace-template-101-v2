"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Poppins, Inter } from "next/font/google";
import { ArrowRight } from "lucide-react";

const poppins = Poppins({
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

const CheckIcon = ({ isMainCard = false }) => (
  isMainCard ? (
    <span className="inline-flex items-center justify-center w-7 h-7 md:w-7 md:h-7">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden
      >
        <path
          d="M24.5 12.8333C24.5 19.3083 20.02 25.3633 14 26.8333C7.98 25.3633 3.5 19.3083 3.5 12.8333V5.83329L14 1.16663L24.5 5.83329V12.8333ZM14 24.5C18.375 23.3333 22.1667 18.13 22.1667 13.09V7.34996L14 3.70996L5.83333 7.34996V13.09C5.83333 18.13 9.625 23.3333 14 24.5ZM11.6667 19.8333L7 15.1666L8.645 13.5216L11.6667 16.5316L19.355 8.84329L21 10.5"
          fill="#F59402"
        />
      </svg>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center w-[21px] h-[25.667px] md:w-[21px] md:h-[25.667px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="26"
        viewBox="0 0 21 26"
        fill="none"
        aria-hidden
      >
        <path
          d="M21 11.6667C21 18.1417 16.52 24.1967 10.5 25.6667C4.48 24.1967 0 18.1417 0 11.6667V4.66667L10.5 0L21 4.66667V11.6667ZM10.5 23.3333C14.875 22.1667 18.6667 16.9633 18.6667 11.9233V6.18333L10.5 2.54333L2.33333 6.18333V11.9233C2.33333 16.9633 6.125 22.1667 10.5 23.3333ZM8.16667 18.6667L3.5 14L5.145 12.355L8.16667 15.365L15.855 7.67667L17.5 9.33333"
          fill="#786F6F"
        />
      </svg>
    </span>
  )
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
}) => {
  const buttonContent = isMainCard ? (
    <span className={`${poppins.className} inline-flex items-center font-semibold text-lg md:text-[24px] gap-2`}>
      <PhoneCallIcon className="w-6 h-6" />
      {phone || "(888)-249-0566"}
    </span>
  ) : (
    <span className={`${inter.className} text-xs md:text-sm flex items-center justify-center gap-2`}>
      <span className="text-white">Call Us Today</span>
      <ArrowRight className="w-4 h-4 text-white" />
    </span>
  );

  return (
    <div
      className={`relative flex flex-col h-full p-6 transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-2xl ${
        isMainCard
          ? "bg-[#191515] text-white shadow-[1px_4px_15px_0_rgba(0,0,0,0.13)] z-10 min-h-[460px]"
          : "w-[320px] h-[285px] px-[14px] pt-[14px] pb-[2px] flex-col justify-start items-stretch rounded-[20px] bg-[#FFF] shadow-[1px_4px_15px_0_rgba(0,0,0,0.13)] text-black mx-auto"
      }`}
    >
      {isMainCard && (
        <button
          className={`${poppins.className} flex w-[350px] max-w-full items-center justify-center gap-[10px] rounded-t-[10px] rounded-b-none bg-[#F59402] py-[14px] text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 mx-auto mt-2 mb-5`}
        >
          {buttonContent}
        </button>
      )}

      {heading && (
        <div className={`${isMainCard ? "mb-3 text-center" : "mb-2 text-center"}`}>
          <MaybeMarkdown as="h3" className={`${poppins.className} text-2xl font-semibold tracking-tight mb-2 uppercase`}>
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown as="p" className={`${poppins.className} text-2xl font-bold mb-2`}>
              {subheading}
            </MaybeMarkdown>
          )}
          <div
            // className={`border-b border-dotted w-3/4 mx-auto my-4 ${isMainCard ? "border-white/60" : "border-blue-950"}`}
          />
        </div>
      )}

      <div className={`${isMainCard ? "space-y-1.5 flex-1" : "space-y-1.5 flex-none"}`}>
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`${inter.className} flex items-start gap-1 text-sm md:text-[16px] font-medium ${
              isMainCard ? "" : "text-black"
            }`}
          >
            <CheckIcon isMainCard={isMainCard} />
            <MaybeMarkdown as="span" className="pt-0">{feature}</MaybeMarkdown>
          </div>
        ))}
      </div>

      <button
        className={`${isMainCard ? poppins.className : inter.className} rounded flex items-center justify-center gap-2 mt-6 font-semibold text-lg md:text-[24px] tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
          isMainCard
            ? "w-[255px] h-[48px] bg-[#E9E8E7] text-[#F59402] hover:bg-[#dbd9d8] mx-auto"
            : "px-[34px] py-[13px] rounded-[10px] bg-[#786F6F] text-white hover:bg-[#6e6666] mx-auto gap-[10px] mt-3 mb-0"
        }`}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default function Promotion14({ content }) {
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
          <MaybeMarkdown as="h2" className={`${poppins.className} text-4xl md:text-[44px] font-extrabold text-center text-[#2d2d2d] mb-8 tracking-tight`}>
            {title}
          </MaybeMarkdown>
          {description && (
            <MaybeMarkdown as="p" className={`${inter.className} text-center text-gray-700 mb-8 max-w-2xl mx-auto`}>
              {description}
            </MaybeMarkdown>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full">
            {details.map((item, index) => (
              <PromotionCard
                key={index}
                heading={item.heading}
                subheading={item.subheading}
                features={item.features}
                phone={phone}
                isMainCard={index === 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
