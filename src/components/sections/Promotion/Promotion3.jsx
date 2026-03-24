"use client";

import { Phone, ShieldCheck } from "lucide-react";
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

const CheckIcon = ({ isMainCard }) => (
  <ShieldCheck
    className={`w-5 h-5 mt-0.5 shrink-0 ${isMainCard ? "text-white" : "text-[#f3a008]"}`}
  />
);

const PromotionCard = ({
  heading,
  subheading,
  features,
  phone,
  isMainCard = false,
}) => {
  return (
    <div
      className={`relative flex flex-col h-full rounded-[22px] p-6 md:p-7 border shadow-sm ${
        isMainCard
          ? "bg-[#f3a008] text-white border-[#e39a00] md:scale-[1.02]"
          : "bg-white text-[#121212] border-[#e7e7e7]"
      }`}
    >
      {heading && (
        <div className="mb-2">
          <MaybeMarkdown
            as="h3"
            className={`font-extrabold tracking-tight leading-tight ${
              isMainCard ? "text-[39px]" : "text-[42px]"
            }`}
          >
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown
              as="p"
              className={`font-bold leading-tight mb-2 ${isMainCard ? "text-[37px]" : "text-[38px]"}`}
            >
              {subheading}
            </MaybeMarkdown>
          )}
        </div>
      )}

      <div className="space-y-2.5 flex-1 mt-2">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 text-[30px] leading-snug ${
              isMainCard ? "text-white/95" : "text-[#212020]"
            }`}
          >
            <CheckIcon isMainCard={isMainCard} />
            <MaybeMarkdown as="span" className="pt-0.5">
              {feature}
            </MaybeMarkdown>
          </div>
        ))}
      </div>

      {isMainCard ? (
        <a
          href={phone ? `tel:${phone}` : "#"}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white text-[#f3a008] font-extrabold px-5 py-2.5 text-[36px] leading-none"
        >
          <Phone className="w-4 h-4" />
          {phone || "(888)-249-0566"}
        </a>
      ) : (
        <a
          href={phone ? `tel:${phone}` : "#"}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#f3a008] text-white font-extrabold uppercase px-6 py-2.5 text-[18px] md:text-[16px] leading-none"
        >
          Call Us Today
          <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
};

export default function Promotion3({ content }) {
  const promotion = content?.promotion ?? {};
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];

  return (
    <FullContainer id="promo" className="py-10 md:py-14 bg-[#efefef]">
      <Container>
        <div className="w-full">
          <MaybeMarkdown
            as="h2"
            className="text-3xl md:text-5xl font-extrabold text-center text-[#212020] mb-8 md:mb-10 tracking-tight"
          >
            {title}
          </MaybeMarkdown>
          {description && (
            <MaybeMarkdown
              as="p"
              className="text-center text-[#545454] mb-8 max-w-3xl mx-auto"
            >
              {description}
            </MaybeMarkdown>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 w-full">
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
