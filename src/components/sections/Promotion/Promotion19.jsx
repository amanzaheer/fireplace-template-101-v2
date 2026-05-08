"use client";

import Image from "next/image";
import Icon from "@mdi/react";
import { mdiShieldCheckOutline } from "@mdi/js";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Poppins, Inter, Rubik } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string")
    return <Tag className={className}>{children}</Tag>;
  const hasMarkdown = /[*_`#\[\]~>]/.test(children);
  if (!hasMarkdown) return <Tag className={className}>{children}</Tag>;
  const html = md.render(children).replace(/^<p>([\s\S]*?)<\/p>\n?$/, "$1");
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

const CheckIcon = ({ isMainCard }) => (
  <Icon
    path={mdiShieldCheckOutline}
    size={1.2}
    color={isMainCard ? "#ffffff" : "#000000"}
    className={`${isMainCard ? "mt-0.5" : "mt-0"} shrink-0`}
  />
);

const PromotionCard = ({
  heading,
  subheading,
  features,
  phone,
  isMainCard = false,
  isFirstCard = false,
}) => {
  const phoneLink = phone ? `tel:${phone}` : "#";
  const phoneButtonClass =
    "mt-2 mx-auto h-[65px]  w-[260px] inline-flex flex-row items-center justify-center gap-2 rounded-full bg-[#cc3333] text-white shadow-lg transition-all hover:bg-red-700 font-inter";
  const phoneTextClass = `${inter.className} text-sm md:text-[20px] lg:text-lg font-inter font-bold text-white mt-1 leading-none`;

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl rounded-b-non p-6 md:p-7 shadow-sm mt-6 ${
        isMainCard
          ? "bg-[#1a75bb] text-white md:scale-[1.02]"
          : "bg-white text-[#121212]"
      }`}
    >
      {heading && (
        <div className={`mb-2 ${isFirstCard ? "text-center" : ""}`}>
          <MaybeMarkdown
            as="h3"
            className={`${poppins.className} font-extrabold tracking-tight leading-tight ${
              isMainCard
                ? "text-[22px] md:text-[27px] text-center"
                : "text-[28px] md:text-[32px] text-center"
            }`}
          >
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown
              as="p"
              className={`${rubik.className} font-normal leading-tight mb-2 ${isMainCard ? "text-[22px] md:text-[27px]" : "text-[24px] md:text-[28px]"}`}
            >
              {subheading}
            </MaybeMarkdown>
          )}
        </div>
      )}

      <div className="space-y-1 flex-1 mt-4">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-1  text-[30px] leading-snug ${
              isMainCard ? "text-white/95" : "text-[#212020]"
            }`}
          >
            <CheckIcon isMainCard={isMainCard} />
            <MaybeMarkdown
              as="span"
              className={`${inter.className} text-[14px] md:text-[16px]`}
            >
              {feature}
            </MaybeMarkdown>
          </div>
        ))}
      </div>

      {isMainCard ? (
        <a href={phoneLink} className={phoneButtonClass}>
          <span className="flex h-[30px] w-[30px] items-center justify-center">
            <Image
              src="/st-icons/Temp17/call17.png"
              alt="Phone"
              width={18}
              height={18}
              className="h-[30px] w-[30px] shrink-0"
            />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className={`${inter.className} text-[16px] font-normal text-white`}>
              CLICK TO CALL
            </span>
            <span className={phoneTextClass}>{phone}</span>
          </span>
        </a>
      ) : (
        <a
          href={phoneLink}
          className={`${rubik.className} mt-1 mx-auto h-[44.9px] inline-flex w-fit gap-2 rounded-sm items-center justify-center bg-black text-white font-semibold uppercase px-6 py-3 md:px-7 md:py-4 text-[12px] md:text-[14px] leading-none`}
        >
          Call Us Today
          <span aria-hidden="true" className="text-[#FF0504]">→</span>
        </a>
      )}
    </div>
  );
};

export default function Promotion19({ content }) {
  const promotion = content?.promotion ?? {};
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];

  return (
    <FullContainer id="promo" className="py-10 mt-40 md:mt-30 md:py-14 bg-[#efefef]">
      <Container>
        <div className="w-full">
          <MaybeMarkdown
            as="h2"
            className={`${rubik.className} text-4xl md:text-[44px] font-bold text-center text-[#212020] mb-8 md:mb-10 tracking-tight`}
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
                isFirstCard={index === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
