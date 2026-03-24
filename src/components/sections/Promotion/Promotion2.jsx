"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Phone, ArrowRight, ShieldCheckIcon } from "lucide-react";

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

const PromotionCard = ({
  heading,
  subheading,
  features,
  phone,
  isMainCard = false,
}) => {
  return (
    <div
      className={`relative flex flex-col p-4 h-full rounded-2xl transition-all duration-200 ${
        isMainCard
          ? "bg-[#171316] text-white shadow-[0_10px_26px_rgba(0,0,0,0.26)] z-10 md:-my-4 md:scale-[1.03] overflow-hidden"
          : "bg-white text-[#161616] shadow-[0_6px_18px_rgba(0,0,0,0.12)] border border-[#ececec]"
      }`}
    >
      {isMainCard && (
        <div className="bg-[#D91F27] rounded-t-lg  py-2">
          <MaybeMarkdown as="h3" className="text-[38px]  md:text-[40px] font-normal leading-[1.05] text-white text-center">
            {heading}
          </MaybeMarkdown>
        </div>
      )}

      {heading && (
        <div className={`text-center `}>
          {!isMainCard && (
            <MaybeMarkdown as="h3" className="text-[40px] md:text-[42px] font-black uppercase leading-none tracking-tight text-[#111]">
              {heading}
            </MaybeMarkdown>
          )}
          {subheading && (
            <MaybeMarkdown
              as="p"
              className={`mt-2 leading-tight ${
                isMainCard
                  ? "text-[44px] md:text-[46px] font-extrabold text-white text-left"
                  : "text-2xl md:text-3xl font-medium text-[#151515]"
              }`}
            >
              {subheading}
            </MaybeMarkdown>
          )}
        </div>
      )}

      <div className={`space-y-2.5 flex-1 pt-4 `}>
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 text-[16px] leading-tight ${
              isMainCard ? "text-white/95 font-medium" : "text-[#1c1c1c] font-medium"
            }`}
          >
            <ShieldCheckIcon
              strokeWidth={1.6}
              className={`w-5 h-5 mt-0.5 shrink-0 ${
                isMainCard ? "text-[#d3272f]" : "text-[#c92028]"
              }`}
            />
            <MaybeMarkdown as="span" className="pt-0.5">{feature}</MaybeMarkdown>
          </div>
        ))}
      </div>

      <div className={` pt-4 flex justify-center items-center`}>
        {isMainCard ? (
          <a
            href={phone ? `tel:${phone}` : "#"}
            className=" inline-flex items-center justify-center gap-2 rounded-full bg-[#D91F27] hover:bg-[#bf1b22] text-white px-8 py-3.5 w-fit mx-auto font-semibold leading-none transition-colors"
          >
            <Phone className="w-5 h-5" />
            {phone || "(888)-249-0566"}
          </a>
        ) : (
          <a
            href={phone ? `tel:${phone}` : "#"}
            className=" inline-flex items-center justify-center gap-2 rounded-full bg-[#D91F27] hover:bg-[#bf1b22] text-white px-8 py-3.5 w-fit mx-auto font-semibold leading-none transition-colors"
          >
            Call Us Today
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default function Promotion2({ content }) {
  const promotion = content?.promotion ?? {};
  const details = Array.isArray(promotion?.details) ? promotion.details.slice(0, 3) : [];
  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";

  return (
    <FullContainer id="promo" className="bg-[#f4f4f4]">
      <Container>
        <div className="w-full py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 w-full max-w-[1160px] mx-auto items-stretch">
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
