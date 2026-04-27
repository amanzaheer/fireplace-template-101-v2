"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { ArrowRight } from "lucide-react";
import {Poppins, Inter, Rubik} from "next/font/google";
import Image from "next/image";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
  subsets: ["regular"],
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

const PromotionCard = ({
  heading,
  subheading,
  features,
  phone,
  isMainCard = false,
}) => {
  const telHref = phone ? `tel:${phone}` : "#";
  const featureList = (
    <div
      className={`pt-4 ${isMainCard ? "space-y-3 md:space-y-3.5" : "space-y-2.5"}`}
    >
      {(Array.isArray(features) ? features : [])?.map((feature, index) => (
        <div
          key={index}
          className={`${inter.className} flex items-start font-normal leading-tight ${
            isMainCard ? "text-white/95" : "text-[#1c1c1c]"
          }`}
        >
          <div className="w-5 h-auto whitespace-nowrap shrink-0">
            <Image
              src="/st-icons/Temp2/shieldCheck.png"
              alt="Check"
              width={16}
              height={16}
              className="w-auto h-5 md:h-[26px]"
            />
          </div>
          <MaybeMarkdown as="span" className={`${inter.className} pt-0.5 pl-1 text-[16px]`}>
            {feature}
          </MaybeMarkdown>
        </div>
      ))}
    </div>
  );

  const cta = (
    <div className={`flex justify-center items-center shrink-0 ${isMainCard ? "pt-6 md:pt-8" : "pt-4"}`}>
      {isMainCard ? (
        <a
          href={telHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D91F27] hover:bg-[#bf1b22] text-white px-6 py-2.5 md:px-7 md:py-3 w-fit mx-auto font-semibold leading-none transition-colors"
        >
          <Image
            src="/st-icons/Temp2/call1.png"
            alt="Phone"
            width={16}
            height={16}
            className="w-auto h-5 md:h-[22px]"
          />
          <span className={`${rubik.className} text-white text-xl lg:text-2xl font-normal`}>
            {phone || "(888)-249-0566"}
          </span>
        </a>
      ) : (
        <a
          href={telHref}
          className={`${rubik.className} inline-flex items-center uppercase font-medium text-sm justify-center gap-2 rounded-full bg-[#D91F27] hover:bg-[#bf1b22] text-white px-8 py-3.5 w-fit mx-auto leading-none transition-colors`}
        >
          Call Us Today
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );

  if (isMainCard) {
    return (
      <div
        className="relative z-10 flex w-full flex-col overflow-hidden rounded-2xl p-4 md:p-5 bg-[#171316] text-white shadow-[0_10px_26px_rgba(0,0,0,0.26)] ring-1 ring-black/10 transition-all duration-200 md:scale-[1.05] md:shadow-[0_18px_40px_rgba(0,0,0,0.32)]"
      >
        <div className="bg-[#d91f27] rounded-t-lg p-2 md:p-3">
          {heading ? (
            <MaybeMarkdown
              as="h3"
              className={`${poppins.className} text-center text-[30px] font-normal leading-[1.05] text-white md:text-[34px]`}
            >
              {heading}
            </MaybeMarkdown>
          ) : null}
        </div>
        <div className="flex flex-col">
          {subheading ? (
            <MaybeMarkdown
              as="p"
              className={`${poppins.className} text-left text-[24px] font-normal leading-[1.05] text-white md:text-[28px]`}
            >
              {subheading}
            </MaybeMarkdown>
          ) : null}
          {featureList}
          {cta}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col rounded-2xl border border-[#ececec] bg-white p-4 text-[#161616] shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-200">
      {heading ? (
        <div className="text-center">
          <MaybeMarkdown
            as="h3"
            className={`${poppins.className} text-[28px] font-normal leading-[1.05] tracking-tight text-[#111] md:text-[32px]`}
          >
            {heading}
          </MaybeMarkdown>
          {subheading ? (
            <MaybeMarkdown
              as="p"
              className={`${poppins.className} mt-2 text-[23px] font-normal leading-[1.05] text-[#151515] md:text-[27px]`}
            >
              {subheading}
            </MaybeMarkdown>
          ) : null}
        </div>
      ) : null}
      {featureList}
      {cta}
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
    <FullContainer id="promo" className="bg-[#ffffff]">
      <Container>
        <div className="w-full py-10 md:py-16 md:pb-20">
          <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_1.1fr_1fr] md:items-center md:gap-5">
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
