"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";
import { Rubik, Inter, Poppins } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
}); 
/** Burnt orange / rust accent for checks and CTA (matches promo reference) */
const ACCENT = "#c2410c";

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

function CheckIcon() {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center w-7 h-7 rounded-full mt-0.5"
      style={{ backgroundColor: ACCENT }}
      aria-hidden
    >
      <Check className="w-4 h-4 text-white" strokeWidth={3} />
    </span>
  );
}

const PromotionCard = ({ overline, title, description, features, phoneHref }) => {
  return (
    <div className="relative flex flex-col h-full bg-black text-white text-center p-8 md:p-10 shadow-lg">
      {(overline || title) && (
        <div className="space-y-3 mb-6">
          {overline ? (
            <MaybeMarkdown
              as="p"
              className="text-sm md:text-base font-normal text-white/90 uppercase tracking-wide"
            >
              {overline}
            </MaybeMarkdown>
          ) : null}
          {title ? (
            <MaybeMarkdown
              as="h3"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
            >
              {title}
            </MaybeMarkdown>
          ) : null}
        </div>
      )}

      {description ? (
        <MaybeMarkdown
          as="p"
          className="text-sm md:text-base text-white/85 leading-relaxed max-w-md mx-auto mb-8"
        >
          {description}
        </MaybeMarkdown>
      ) : null}

      <div className="space-y-3 flex-1 flex flex-col items-center">
        <ul className="w-full max-w-sm mx-auto space-y-3 text-left">
          {(Array.isArray(features) ? features : []).map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm md:text-base font-medium text-white">
              <CheckIcon />
              <MaybeMarkdown as="span" className="pt-0.5 leading-snug">
                {feature}
              </MaybeMarkdown>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={phoneHref}
        className="w-full max-w-sm mx-auto mt-8 py-3.5 px-6 font-bold text-sm md:text-base uppercase tracking-wider text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/40"
        style={{ backgroundColor: ACCENT }}
      >
        Call Us Today
      </Link>
    </div>
  );
};

export default function Promotion6({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "Monthly Promotions";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];
  const phone =
    content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, "")}` : "#";

  return (
    <FullContainer id="promo" className="bg-white">
      <Container>
        <div className="w-full pb-12 md:pb-16 pt-10 md:pt-14">
          <MaybeMarkdown
            as="h2"
            className={`${poppins.className} text-3xl md:text-4xl font-extrabold text-center text-neutral-900 mb-4 md:mb-6 tracking-tight`}
          >
            {title}
          </MaybeMarkdown>
          {description ? (
            <MaybeMarkdown
              as="p"
              className="text-center text-neutral-300 max-w-3xl mx-auto mb-10 md:mb-12 text-base md:text-lg "
            >
              {description}
            </MaybeMarkdown>
          ) : null}
          <div className="flex flex-nowrap gap-6 md:gap-8 w-full max-w-7xl mx-auto overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth [scrollbar-gutter:stable]">
            {details.map((item, index) => {
              const hasSubheading = Boolean(item.subheading);
              const overline =
                item.overline ?? (hasSubheading ? item.heading : "") ?? "";
              const cardTitle =
                item.title ??
                (hasSubheading ? item.subheading : item.heading) ??
                "";
              const cardDescription = item.description ?? item.body ?? "";
              return (
                <div
                  key={index}
                  className="min-w-[min(100%,280px)] flex-1 basis-0 shrink-0 md:min-w-0 md:shrink"
                >
                  <PromotionCard
                    overline={overline}
                    title={cardTitle}
                    description={cardDescription}
                    features={item.features}
                    phoneHref={phoneHref}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
