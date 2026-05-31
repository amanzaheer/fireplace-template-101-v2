"use client";
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
    color={isMainCard ? "white" : "#FF0011"}
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
    "mt-2 mx-auto inline-flex min-h-[56px] w-[260px] flex-row items-center justify-center gap-3 rounded-[10px] bg-white px-5 shadow-lg transition-opacity hover:opacity-95";
  const phoneTextClass = `${inter.className} text-base font-bold leading-none text-[#FF0011] md:text-xl`;

  return (
    <div
      className={`relative flex flex-col h-full rounded-t-[22px] rounded-b-none p-6 md:p-7 shadow-sm mt-6 ${
        isMainCard
          ? "bg-[#FF0011] text-white md:scale-[1.02]"
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
              isMainCard ? "text-white" : "text-[#212020]"
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
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M8.58003 0H2.89394e-05V1C-0.00653503 4.84967 1.10365 8.6186 3.19603 11.85C4.73807 14.2328 6.76725 16.262 9.15003 17.804C12.3814 19.8964 16.1504 21.0066 20 21H21V12.42L14.31 10.933L12.45 12.793C10.748 11.6994 9.30126 10.2523 8.20803 8.55L10.067 6.69L8.58003 0Z"
                fill="#FF0011"
              />
            </svg>
          </span>
          <span className={phoneTextClass}>{phone}</span>
        </a>
      ) : (
        <a
          href={phoneLink}
          className={`${rubik.className} mt-1 mx-auto h-[44.9px] inline-flex w-fit gap-2 rounded-sm items-center justify-center bg-[#FF0011] text-white font-semibold uppercase px-6 py-3 md:px-7 md:py-4 text-[12px] md:text-[14px] leading-none`}
        >
          Call Us Today
          <span aria-hidden="true" className=" text-white">→</span>
        </a>
      )}
    </div>
  );
};
export default function Promotion18({ content }) {
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
            className={`${rubik.className} text-4xl font-poppins md:text-[44px] font-regular text-center text-[#212020] mb-8 md:mb-10 tracking-tight`}
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
