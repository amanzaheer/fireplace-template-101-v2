"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Montserrat, Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const CARD_RED = "#E31E24";
const ICON_RED = "#D90209";

const CARD_FRAME_CLASS =
  "box-border flex w-full max-w-[540px] flex-none flex-col items-center overflow-hidden rounded-t-[32px] rounded-b-none bg-white p-0 sm:rounded-t-[36px] lg:min-h-[644.73px] lg:w-[540px] lg:rounded-t-[40px]";

const CARD_HEADER_CLASS =
  "flex w-full flex-col items-center gap-2 self-stretch rounded-t-[32px] border-t border-black bg-black px-4 py-4 text-center text-white sm:rounded-t-[36px] sm:px-5 sm:py-5 lg:rounded-t-[40px] lg:px-6";

const CARD_RED_STRIP_CLASS =
  "flex w-full items-center justify-center gap-[10px] self-stretch rounded-b-none px-6 py-[23px] text-base font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90";

function getCardsPerView(width) {
  if (width < 768) return 1;
  return 2;
}

function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string") return <Tag className={className}>{children}</Tag>;
  const hasMarkdown = /[*_`#\[\]~>]/.test(children);
  if (!hasMarkdown) return <Tag className={className}>{children}</Tag>;
  const html = md.render(children).replace(/^<p>([\s\S]*?)<\/p>\n?$/, "$1");
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function CheckIcon() {
  return (
    <span className="relative mt-1 inline-block h-7 w-7 shrink-0" aria-hidden>
      <span
        className="absolute flex items-center justify-center rounded-full box-border"
        style={{
          left: "8.33%",
          right: "8.34%",
          top: "8.33%",
          bottom: "8.33%",
          border: "3.22556px solid #D90209",
        }}
      >
        <Check
          className="h-3 w-3"
          strokeWidth={2.5}
          fill="none"
          style={{ color: ICON_RED }}
        />
      </span>
    </span>
  );
}

function PromotionCard({ heading, subheading, description, features, ctaLabel, phoneHref }) {
  const featureList = Array.isArray(features) ? features : [];
  const hasHeader = Boolean(heading || subheading || description);

  return (
    <article className={CARD_FRAME_CLASS}>
      {hasHeader ? (
        <div className={cn(CARD_HEADER_CLASS, "shrink-0")}>
          {heading && subheading ? (
            <>
              <MaybeMarkdown as="p" className="text-sm font-medium text-white">
                {heading}
              </MaybeMarkdown>
              <MaybeMarkdown
                as="h3"
                className="w-full text-[24px] font-bold leading-snug text-white sm:text-[28px] md:text-[32px]"
              >
                {subheading}
              </MaybeMarkdown>
            </>
          ) : heading ? (
            <MaybeMarkdown
              as="h3"
              className="w-full text-[24px] font-bold leading-snug text-white sm:text-[28px] md:text-[32px]"
            >
              {heading}
            </MaybeMarkdown>
          ) : subheading ? (
            <MaybeMarkdown
              as="h3"
              className="w-full text-[24px] font-bold leading-snug text-white sm:text-[28px] md:text-[32px]"
            >
              {subheading}
            </MaybeMarkdown>
          ) : null}

          {description ? (
            <MaybeMarkdown as="p" className="w-full text-xs leading-relaxed text-white/75 md:text-sm">
              {description}
            </MaybeMarkdown>
          ) : null}
        </div>
      ) : null}

      {featureList.length > 0 ? (
        <div className="flex w-full flex-1 flex-col justify-start self-stretch border-x border-black px-5 py-4 sm:px-[29.893px]">
          <ul className="flex w-full flex-col gap-[8px]">
            {featureList.map((feature, index) => (
              <li
                key={index}
                className={cn(
                  "flex w-full items-start gap-[8px] text-[clamp(15px,2vw,22px)] font-normal leading-[150%] tracking-normal text-black sm:text-[25.8px] sm:leading-[160%]",
                  montserrat.className,
                )}
              >
                <CheckIcon />
                <MaybeMarkdown as="span" className="min-w-0 flex-1 break-words">
                  {feature}
                </MaybeMarkdown>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <a
        href={phoneHref}
        className={cn(CARD_RED_STRIP_CLASS, poppins.className, "mt-auto shrink-0")}
        style={{ backgroundColor: CARD_RED }}
      >
        {ctaLabel}
      </a>
    </article>
  );
}

export default function Promotion26({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];
  const ctaLabel = promotion?.cta_label ?? "";

  const phone =
    promotion?.cta_phone ??
    content?.contact_info?.phone ??
    content?.navbar?.phone ??
    "";
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);
  const maxIndex = Math.max(0, details.length - cardsPerView);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(getCardsPerView(window.innerWidth));
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const translateValue = useMemo(
    () => `${-(activeIndex * (100 / cardsPerView))}%`,
    [activeIndex, cardsPerView],
  );

  const showSlider = details.length > cardsPerView;

  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (!details.length) return null;

  return (
    <FullContainer id="promo" className={`bg-white py-12 md:py-16 ${poppins.className}`}>
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1440px]">
          {title ? (
            <MaybeMarkdown
              as="h2"
              className="text-center text-[32px] font-bold leading-tight text-black md:text-[40px] lg:text-[44px]"
            >
              {title}
            </MaybeMarkdown>
          ) : null}

          {description ? (
            <MaybeMarkdown
              as="p"
              className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-700 md:text-base"
            >
              {description}
            </MaybeMarkdown>
          ) : null}

          <div className="relative mt-10 md:mt-12">
            <div className="overflow-hidden">
              <ul
                className="flex items-stretch transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${translateValue})` }}
              >
                {details.map((item, index) => (
                  <li
                    key={index}
                    className="flex w-full shrink-0 justify-center self-stretch px-3 md:w-1/2"
                  >
                    <PromotionCard
                      heading={item.heading}
                      subheading={item.subheading}
                      description={item.description}
                      features={item.features}
                      ctaLabel={ctaLabel}
                      phoneHref={phoneHref}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {showSlider ? (
              <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous promotions"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-black shadow-sm transition hover:bg-neutral-100"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next promotions"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-black shadow-sm transition hover:bg-neutral-100"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
