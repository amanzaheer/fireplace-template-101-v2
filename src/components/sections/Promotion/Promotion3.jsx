"use client";

import { Phone } from "lucide-react";
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
    color={isMainCard ? "#ffffff" : "#f3a008"}
    className="mt-0.5 shrink-0"
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
      className={`relative flex flex-col h-full rounded-[22px] p-6 md:p-7 border shadow-sm mt-6 ${
        isMainCard
          ? "bg-[#f59403] text-white border-[#f59403] md:scale-[1.02]"
          : "bg-white text-[#121212] border-[#e7e7e7]"
      }`}
    >
      {heading && (
        <div className="mb-2">
          <MaybeMarkdown
            as="h3"
            className={`${poppins.className} font-extrabold tracking-tight leading-tight ${
              isMainCard
                ? "text-[22px] md:text-[27px]"
                : "text-[28px] md:text-[32px]"
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

      <div className="space-y-2.5 flex-1 mt-4">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-1.5 text-[30px] leading-snug ${
              isMainCard ? "text-white/95" : "text-[#212020]"
            }`}
          >
            <CheckIcon isMainCard={isMainCard} />
            <MaybeMarkdown
              as="span"
              className={`${inter.className}  text-[14px] md:text-[16px]`}
            >
              {feature}
            </MaybeMarkdown>
          </div>
        ))}
      </div>

      {isMainCard ? (
        <a
          href={phone ? `tel:${phone}` : "#"}
          className="mt-2 inline-flex w-fit mb-4 items-center gap-2 rounded-full bg-white text-[#f3a008] font-semibold px-5 py-2.5 text-[28px] leading-none"
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
          {phone || "(888)-249-0566"}
        </a>
      ) : (
        <a
          href={phone ? `tel:${phone}` : "#"}
          className={`${rubik.className} mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#f59403] text-white font-semibold uppercase px-6 py-3 md:px-7 md:py-4 text-[12px] md:text-[14px] leading-none`}
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
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
