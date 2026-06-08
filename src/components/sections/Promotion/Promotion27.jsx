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
    "mt-2 mx-auto h-[65px]  w-[260px] inline-flex flex-row items-center justify-center gap-2  bg-[#BF1309] text-white shadow-lg transition-all hover:bg-red-700 font-inter";
  const phoneTextClass = `${inter.className} text-sm md:text-[20px] lg:text-lg font-inter font-bold text-white mt-1 leading-none`;

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl rounded-b-non p-6 md:p-7 shadow-sm mt-6 ${
        isMainCard
          ? "bg-[#00163A] text-white md:scale-[1.02]"
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
          <span className="flex h-[40px] w-[40px] items-center  justify-center">
            <svg
              width="62"
              height="62"
              viewBox="0 0 62 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.7857 27.6753C40.2897 27.1793 40.0417 26.5653 40.0417 25.8333C40.0417 25.1014 40.2897 24.4883 40.7857 23.994C41.2817 23.4997 41.8948 23.2517 42.625 23.25C43.3552 23.2483 43.9692 23.4963 44.4669 23.994C44.9646 24.4917 45.2118 25.1048 45.2083 25.8333C45.2049 26.5618 44.9569 27.1758 44.4643 27.6753C43.9718 28.1747 43.3587 28.4218 42.625 28.4167C41.8913 28.4115 41.2782 28.1635 40.7857 27.6727M36.1667 22.0875L33.4542 19.375C34.7028 18.1264 36.1133 17.1688 37.6857 16.5023C39.2581 15.8358 40.9045 15.5017 42.625 15.5C44.3455 15.4983 45.9928 15.8324 47.5669 16.5023C49.141 17.1723 50.5507 18.1298 51.7958 19.375L49.0833 22.0875C48.2222 21.2264 47.2431 20.559 46.1461 20.0854C45.049 19.6118 43.8753 19.375 42.625 19.375C41.3747 19.375 40.2018 19.6118 39.1065 20.0854C38.0112 20.559 37.0312 21.2264 36.1667 22.0875ZM51.5375 54.25C46.1556 54.25 40.8382 53.0772 35.5854 50.7315C30.3326 48.3858 25.5535 45.0594 21.2479 40.7521C16.9424 36.4448 13.6167 31.6656 11.2711 26.4146C8.92542 21.1635 7.75172 15.8462 7.75 10.4625C7.75 9.6875 8.00833 9.04167 8.525 8.525C9.04167 8.00833 9.6875 7.75 10.4625 7.75H20.925C21.5278 7.75 22.066 7.95494 22.5396 8.36483C23.0132 8.77472 23.2931 9.25867 23.3792 9.81667L25.0583 18.8583C25.1444 19.5472 25.1229 20.1285 24.9937 20.6021C24.8646 21.0757 24.6278 21.4847 24.2833 21.8292L18.0187 28.1583C18.8799 29.7514 19.902 31.2902 21.0852 32.7747C22.2683 34.2593 23.5712 35.6913 24.9937 37.0708C26.3285 38.4056 27.7278 39.6438 29.1917 40.7857C30.6556 41.9275 32.2056 42.9712 33.8417 43.9167L39.9125 37.8458C40.3 37.4583 40.8063 37.1681 41.4315 36.9752C42.0567 36.7824 42.6698 36.7281 43.2708 36.8125L52.1833 38.6208C52.7861 38.7931 53.2812 39.1056 53.6687 39.5586C54.0562 40.0115 54.25 40.517 54.25 41.075V51.5375C54.25 52.3125 53.9917 52.9583 53.475 53.475C52.9583 53.9917 52.3125 54.25 51.5375 54.25Z"
                fill="white"
              />
            </svg>
          </span>
          <span className="flex flex-col items-start leading-none">
            <span
              className={`${inter.className} text-[16px] font-normal text-white`}
            >
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
          <span aria-hidden="true" className="text-white">
            →
          </span>
        </a>
      )}
    </div>
  );
};

export default function Promotion27({ content }) {
  const promotion = content?.promotion ?? {};
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];

  return (
    <FullContainer
      id="promo"
      className="py-10 mt-40 md:mt-30 md:py-14 bg-[#efefef]"
    >
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
