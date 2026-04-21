"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { ArrowRight } from "lucide-react";
import {Poppins, Inter, Rubik} from "next/font/google";
import { mdiShieldCheckOutline } from "@mdi/js";
import Icon from "@mdi/react";
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

const CheckIcon = ({ isMainCard }) => (
    <Icon
      path={mdiShieldCheckOutline}
      size={1.3}
      color={isMainCard ? "#f3a008" : "#f3a008"}
      className="mt-0.5 shrink-0"
    />
  );

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
  title,
  phone,
  isMainCard = false,
}) => {
  const telHref = phone ? `tel:${phone}` : "#";
  const featureList = (
    <div
      className={`pt-4 space-y-1`}
    >
      {(Array.isArray(features) ? features : [])?.map((feature, index) => (
        <div
          key={index}
          className={`${inter.className} flex items-center font-normal leading-tight ${
            isMainCard ? "text-white/95" : "text-[#1c1c1c]"
          }`}
        >
          <div className="w-fit h-auto whitespace-nowrap shrink-0">
            <CheckIcon isMainCard={isMainCard} />
          </div>
          <MaybeMarkdown as="span" className={`${inter.className} pt-0.5 pl-1 text-[16px] lg:text-[19px]`}>
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
          className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-[#f3a008] px-6 py-2 md:px-4 md:py-2.5 w-fit mx-auto font-semibold leading-none transition-colors"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-[22px] md:w-[22px]"
            aria-hidden
          >
            <path
              d="M9.05768 0H3.05505e-05V1.05567C-0.00689884 5.11965 1.16509 9.0984 3.37395 12.5097C5.00184 15.0251 7.14399 17.1673 9.65942 18.7952C13.0707 21.004 17.0495 22.176 21.1134 22.1691H22.1691V13.1114L15.1067 11.5416L13.1431 13.5052C11.3464 12.3507 9.81906 10.823 8.66498 9.02598L10.6275 7.06244L9.05768 0Z"
              fill="#f3a008"
            />
          </svg>
          <span className={`${rubik.className} text-[20px] lg:text-[25px] font-semibold`}>
            {phone || "(888)-249-0566"}
          </span>
        </a>
      ) : (
        <a
          href={telHref}
          className={`${rubik.className} inline-flex items-center uppercase font-medium text-sm justify-center gap-2 rounded-md bg-[#786f6f] hover:bg-[#786f6f]/90 text-white px-8 py-3.5 w-fit mx-auto leading-none transition-colors`}
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
        <div className="bg-[#f3a008] rounded-t-lg p-2 md:p-3">
          {title ? (
            <MaybeMarkdown
              as="h3"
              className={`${poppins.className} text-center text-[24px] lg:text-[35px] font-normal leading-[1.05] text-white`}
            >
              {title}
            </MaybeMarkdown>
          ) : null}
        </div>
        <div>
        {heading ? (
            <MaybeMarkdown
              as="h3"
              className={`${poppins.className} text-center text-[20px] lg:text-[28px] font-bold pt-4 leading-[1.05] text-white`}
            >
              {heading}
            </MaybeMarkdown>
          ) : null}
        </div>
        <div className="flex flex-col">
          {subheading ? (
            <MaybeMarkdown
              as="p"
              className={`${poppins.className} text-left text-[18px] font-normal leading-[1.05] text-white md:text-[22px]`}
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
            className={`${poppins.className} text-[24px] lg:text-[33px] font-semibold leading-[1.05] tracking-tight text-[#111]`}
          >
            {heading}
          </MaybeMarkdown>
          {subheading ? (
            <MaybeMarkdown
              as="p"
              className={`${poppins.className} mt-2 text-[22px] lg:text-[30px] font-normal leading-[1.05] text-[#151515]`}
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

export default function Promotion14({ content }) {
  const promotion = content?.promotion ?? {};
  const details = Array.isArray(promotion?.details) ? promotion.details.slice(0, 3) : [];
  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const promotionTitle = promotion?.title ?? "";
  return (
    <FullContainer id="promo" className="bg-[#ffffff]">
      <Container>
        <div className="w-full py-10 md:py-16 md:pb-20">
          <div className="grid mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_1.1fr_1fr] md:items-center md:gap-5">
            {details.map((item, index) => (
              <PromotionCard
                key={index}
                heading={item.heading}
                subheading={item.subheading}
                features={item.features}
                phone={phone}
                isMainCard={index === 1}
                title={promotionTitle}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
