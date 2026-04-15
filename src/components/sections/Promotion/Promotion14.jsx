"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Inter, Rubik, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const rubikTitle = Rubik({
  subsets: ["latin"],
  weight: ["400"],
});

/** Center card — grey CTA phone number */
const rubikCta = Rubik({
  subsets: ["latin"],
  weight: ["600"],
});

const poppinsSideTitle = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

/** Left / right promo card headings */
const SIDE_TITLE_CLASS = `${poppinsSideTitle.className} text-center text-[32px] font-bold not-italic leading-[40px] text-black [&_strong]:font-bold`;

const CENTER_BG = "#191515";
const CTA_PILL_BG = "#E9E8E7";
const CTA_ICON_ORANGE = "#F59402";
/** Side cards — list shield bullets */
const SIDE_BULLET = "#786F6F";
/** Side cards — CTA button background */
const SIDE_CTA_BG = "#786F6F";

const SHIELD_CHECK_PATH =
  "M21 11.6667C21 18.1417 16.52 24.1967 10.5 25.6667C4.48 24.1967 0 18.1417 0 11.6667V4.66667L10.5 0L21 4.66667V11.6667ZM10.5 23.3333C14.875 22.1667 18.6667 16.9633 18.6667 11.9233V6.18333L10.5 2.54333L2.33333 6.18333V11.9233C2.33333 16.9633 6.125 22.1667 10.5 23.3333ZM8.16667 18.6667L3.5 14L5.145 12.355L8.16667 15.365L15.855 7.67667L17.5 9.33333";

function ShieldCheckIcon({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={26}
      viewBox="0 0 21 26"
      fill="none"
      className="mt-0.5 h-[25.667px] w-[21px] shrink-0"
      aria-hidden
    >
      <path d={SHIELD_CHECK_PATH} fill={fill} />
    </svg>
  );
}

function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string") return <Tag className={className}>{children}</Tag>;
  const hasMarkdown = /[*_`#\[\]~>]/.test(children);
  if (!hasMarkdown) return <Tag className={className}>{children}</Tag>;
  const html = md.render(children).replace(/^<p>([\s\S]*?)<\/p>\n?$/, "$1");
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Light cards: shield + check (#786F6F, 21×25.667px) */
function CheckOutline() {
  return <ShieldCheckIcon fill={SIDE_BULLET} />;
}

/** Center card list marker — shield + check (#F59402) */
function CheckOrange() {
  return <ShieldCheckIcon fill={CTA_ICON_ORANGE} />;
}

function featureText(line) {
  if (line == null) return "";
  if (typeof line === "string") return line;
  if (typeof line === "object" && line.text) return String(line.text);
  if (typeof line === "object" && line.title) return String(line.title);
  return String(line);
}

function SidePromoCard({ heading, subheading, features, phone }) {
  const list = Array.isArray(features) ? features : [];
  const tel = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[360px] flex-col gap-8 self-stretch rounded-[18px] bg-white p-8 shadow-[0_4px_28px_rgba(15,23,42,0.08)] ring-1 ring-neutral-200/90 md:p-9 lg:p-10">
      <header className="shrink-0 text-center">
        {heading ? (
          <MaybeMarkdown as="h3" className={SIDE_TITLE_CLASS}>
            {heading}
          </MaybeMarkdown>
        ) : null}
        {subheading ? (
          <MaybeMarkdown
            as="p"
            className={heading ? `mt-2 ${SIDE_TITLE_CLASS}` : SIDE_TITLE_CLASS}
          >
            {subheading}
          </MaybeMarkdown>
        ) : null}
      </header>
      <ul className="flex min-h-0 flex-1 list-none flex-col gap-3.5 p-0">
        {list.map((line, i) => (
          <li key={i} className="flex gap-3 text-left">
            <CheckOutline />
            <MaybeMarkdown
              as="span"
              className={`${inter.className} text-base font-normal not-italic leading-normal text-black`}
            >
              {featureText(line)}
            </MaybeMarkdown>
          </li>
        ))}
      </ul>
      <Link
        href={tel}
        className={`${inter.className} mx-auto mt-auto inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[10px] px-[38px] py-[15px] text-xs font-normal uppercase tracking-wide text-white transition hover:opacity-90 sm:text-sm`}
        style={{ backgroundColor: SIDE_CTA_BG }}
      >
        <span>Call us today</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
      </Link>
    </div>
  );
}

function CenterPromoCard({ bannerLabel, heading, features, phone }) {
  const list = Array.isArray(features) ? features : [];
  const tel = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";
  const displayPhone = phone || "—";

  return (
    <div
      className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[360px] flex-col overflow-hidden rounded-[20px] shadow-[1px_4px_15px_0_rgba(0,0,0,0.13)] lg:min-h-[520px] lg:scale-[1.02]"
      style={{ backgroundColor: CENTER_BG }}
    >
      {/* Orange promo label — thoda neeche taake top zyada tight na lage */}
      <div
        className="mx-auto mt-3 flex w-full max-w-[332px] shrink-0 items-center justify-center gap-[10px] rounded-t-[10px] py-[14px] sm:mt-4"
        style={{ backgroundColor: CTA_ICON_ORANGE }}
      >
        <p
          className={`${inter.className} text-center text-sm font-medium normal-case tracking-wide text-white md:text-base`}
        >
          {bannerLabel}
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-8 px-[10px] pb-10 pt-5">
        <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-[18px]">
          {heading ? (
            <MaybeMarkdown
              as="h3"
              className={`${rubikTitle.className} w-full shrink-0 text-center text-[34px] font-normal not-italic leading-normal text-white [&_strong]:font-normal [&_strong]:text-white`}
            >
              {heading}
            </MaybeMarkdown>
          ) : null}
          <ul className="flex min-h-0 w-full max-w-full flex-1 list-none flex-col gap-3.5 p-0">
            {list.map((line, i) => (
              <li key={i} className="flex w-full gap-3 text-left">
                <CheckOrange />
                <MaybeMarkdown
                  as="span"
                  className={`${inter.className} text-lg font-normal not-italic leading-normal text-white`}
                >
                  {featureText(line)}
                </MaybeMarkdown>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={tel}
          className="mx-auto mt-auto flex w-full max-w-[300px] min-w-0 shrink-0 items-center justify-center gap-[10px] rounded-[10px] px-5 py-2 transition hover:opacity-90 sm:py-[9px]"
          style={{ backgroundColor: CTA_PILL_BG }}
        >
          <Phone
            className="h-[21px] w-[21px] shrink-0"
            style={{ color: CTA_ICON_ORANGE }}
            strokeWidth={2.25}
            aria-hidden
          />
          <span
            className={`${rubikCta.className} text-center text-[24px] not-italic leading-normal text-[#F59402] [overflow-wrap:anywhere] sm:whitespace-nowrap`}
          >
            {displayPhone}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function Promotion14({ content }) {
  const promotion = content?.promotion ?? {};
  const details = Array.isArray(promotion?.details) ? promotion.details : [];
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const bannerLabel = promotion?.title?.trim() || "Monthly Promotion";

  if (details.length === 0) return null;

  return (
    <FullContainer id="promo" className="bg-white py-12 md:py-16 lg:py-20">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch justify-items-center gap-6 md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-6 lg:pt-1">
          {details.map((item, index) => {
            const heading = item?.heading ?? "";
            const subheading = item?.subheading ?? "";
            const features = item?.features;

            if (index === 1) {
              return (
                <CenterPromoCard
                  key={index}
                  bannerLabel={bannerLabel}
                  heading={heading}
                  features={features}
                  phone={phone}
                />
              );
            }

            return (
              <SidePromoCard
                key={index}
                heading={heading}
                subheading={subheading}
                features={features}
                phone={phone}
              />
            );
          })}
        </div>
      </Container>
    </FullContainer>
  );
}
