"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Poppins, Inter } from "next/font/google";
import Icon from "@mdi/react";
import { mdiShieldCheckOutline } from "@mdi/js";
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

const CheckIcon = ({ filled }) => (
  <span
    className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded `}
  >
    <Icon
      path={mdiShieldCheckOutline}
      size={4}
      className={filled ? "text-[#c9da28]" : "text-[#c9da28]"}
    />
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
}) => {
  return (
    <div
      className={`relative flex flex-col h-full p-6 transition-all duration-200 shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-[18px] ${
        isMainCard
          ? "bg-[#4c2477] text-white shadow-xl z-10 min-h-[480px]"
          : "bg-white text-black min-h-[430px]"
      }`}
    >
      {heading && (
        <div className="mb-3 text-center">
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

      <div className="space-y-1.5 flex-1">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`${inter.className} flex items-start gap-1 text-sm md:text-[16px] font-medium ${
              isMainCard ? "" : "text-black"
            }`}
          >
            <CheckIcon filled={!isMainCard} />
            <MaybeMarkdown as="span" className="pt-0">{feature}</MaybeMarkdown>
          </div>
        ))}
      </div>

      <button
        className={`${isMainCard ? poppins.className : inter.className} rounded flex items-center justify-center gap-2 mt-6 font-semibold text-lg md:text-[20px] lg:text-[24px] tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
          isMainCard
            ? "w-[255px] h-[48px] md:w-[224px] lg:w-[255px] bg-[#c7db1f] text-black hover:bg-[#b2c91c] hover:text-black hover:cursor-pointer mx-auto"
            : "w-[219px] h-[54px] md:w-[200px] md:h-[50px] lg:w-[219px] lg:h-[54px] bg-[#c7db1f] text-black hover:bg-[#b2c91c] hover:cursor-pointer  mx-auto"
        }`}
      >
        {isMainCard ? 
        <span className={`${poppins.className} inline-flex items-center font-bold text-lg md:text-[18px] lg:text-[24px] gap-2`}>
          <PhoneCallIcon className="w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          {phone || "(888)-249-0566"}
        </span>
        : 
        <span className={`${inter.className} text-xs md:text-[15px] lg:text-[18px] font-poppins flex items-center font-bold justify-center gap-2`}>  
          <span className="text-black font-bold font-poppins">CALL US TODAY</span>
          <ArrowRight className="w-4 h-4 text-black font-bold" />
        </span>
        
        }
        
      </button>
    </div>
  );
};

export default function Promotion13({ content }) {
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
