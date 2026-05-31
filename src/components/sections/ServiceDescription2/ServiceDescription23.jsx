"use client";

import React, { useMemo } from "react";
import {
  Settings2,
  Users,
  Monitor,
  Smartphone,
  Database,
  Layers,
  ShieldCheck,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const BRAND_BLUE = "#0483B2";

const CARD_ICONS = [Settings2, Users, Monitor, Smartphone, Database, Layers, ShieldCheck];

/** Remove markdown asterisks from displayed text (content unchanged in CMS). */
function cleanDisplayText(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .trim();
}

function stripFirstMatchingHeadingHtml(html, title) {
  if (!html || !title) return html;
  const normalizedTitle = title.trim().toLowerCase();
  const re = /<h[123][^>]>([\s\S]?)<\/h[123]>/i;
  const match = html.match(re);
  if (!match) return html;
  const innerText = match[1]
    .replace(/<[^>]*>/g, "")
    .trim()
    .toLowerCase();
  if (innerText !== normalizedTitle) return html;
  const start = match.index ?? 0;
  return (html.slice(0, start) + html.slice(start + match[0].length)).trim();
}

/** Parse **Title** + paragraph blocks from CMS markdown without changing stored content. */
function parseBenefitCards(description) {
  if (!description || typeof description !== "string") {
    return { sectionHeading: "", intro: "", cards: [] };
  }

  let text = description.trim();
  let sectionHeading = "";

  const headingMatch = text.match(/^#{1,2}\s+(.+?)(?:\r?\n\r?\n|\r?\n)/);
  if (headingMatch) {
    sectionHeading = cleanDisplayText(headingMatch[1]);
    text = text.slice(headingMatch[0].length).trim();
  }

  const firstCardMatch = text.match(/\*\*[^*]+\*\*\s*\r?\n/);
  let intro = "";
  let cardSource = text;

  if (firstCardMatch && firstCardMatch.index != null && firstCardMatch.index > 0) {
    intro = text.slice(0, firstCardMatch.index).trim();
    cardSource = text.slice(firstCardMatch.index);
  }

  const cards = [];
  const cardRe = /\*\*([^*]+)\*\*\s*\r?\n([\s\S]*?)(?=\r?\n\r?\n\*\*|$)/g;
  let match = cardRe.exec(cardSource);

  while (match) {
    const cardTitle = cleanDisplayText(match[1]);
    const body = cleanDisplayText(
      match[2].replace(/\r\n/g, " ").replace(/\s+/g, " "),
    );

    if (cardTitle && body) {
      cards.push({ title: cardTitle, description: body });
    }
    match = cardRe.exec(cardSource);
  }

  return { sectionHeading, intro, cards };
}

function scrollToQuote() {
  const offset = 80;
  const scrollToEl = (el) => {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  const targets = [
    document.getElementById("quote-form-section"),
    document.getElementById("contact-us"),
    document.getElementById("banner-quote-form"),
  ].filter((el) => el instanceof HTMLElement);

  const anchorY = window.scrollY + offset + 40;
  const below = targets.find((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    return top >= anchorY - 20;
  });

  if (below) {
    scrollToEl(below);
    return;
  }

  if (targets.length > 0) {
    scrollToEl(targets[targets.length - 1]);
    return;
  }

  const fallback = document.querySelector('[class*="quote-form"]');
  if (fallback instanceof HTMLElement) {
    scrollToEl(fallback);
  }
}

const cardTransition =
  "transition-[background-color,box-shadow,color] duration-800 ease-in-out";

function BenefitCard({ card, index }) {
  const Icon = CARD_ICONS[index % CARD_ICONS.length];
  return (
    <article
      className={cn(
        poppins.className,
        "group flex flex-col items-center rounded-2xl bg-transparent px-5 py-10 text-center sm:px-6 sm:py-12",
        cardTransition,
        "hover:bg-[#0483B2] hover:duration-800 hover:shadow-[0_14px_32px_rgba(4,131,178,0.35)]",
      )}
    >
      <div
        className={cn(
          "mb-5 flex h-14 w-14 items-center justify-center rounded-[10px] bg-[#0483B2] text-white",
          cardTransition,
          "group-hover:bg-white group-hover:text-[#0483B2]",
        )}
      >
        <Icon
          className={cn("h-7 w-7", cardTransition)}
          strokeWidth={2}
          aria-hidden
        />
      </div>

      <h3
        className={cn(
          "text-lg font-bold leading-snug text-black sm:text-xl",
          cardTransition,
          "group-hover:text-white",
        )}
      >
        {card.title}
      </h3>

      <div
        className={cn(
          "my-4 h-px w-10 bg-neutral-300",
          cardTransition,
          "group-hover:bg-white/75",
        )}
        aria-hidden
      />

      <p
        className={cn(
          "max-w-[280px] text-sm leading-relaxed text-black sm:text-[15px]",
          cardTransition,
          "group-hover:text-white/90",
        )}
      >
        {card.description}
      </p>
    </article>
  );
}

export default function ServiceDescription23({ content }) {
  const block =
    content?.service_description2 &&
    typeof content.service_description2 === "object"
      ? content.service_description2
      : {};

  const title =
    typeof block.title === "string" ? cleanDisplayText(block.title) : "";
  const description =
    typeof block.description === "string" ? block.description.trim() : "";

  const { sectionHeading, intro, cards } = useMemo(
    () => parseBenefitCards(description),
    [description],
  );

  const displayTitle = title || sectionHeading;

  const introHtml = useMemo(() => {
    if (!intro) return "";
    return md.render(cleanDisplayText(intro));
  }, [intro]);

  const descriptionHtml = useMemo(() => {
    if (cards.length > 0) return "";
    const rendered = description ? md.render(description) : "";
    return stripFirstMatchingHeadingHtml(rendered, displayTitle);
  }, [description, displayTitle, cards.length]);

  if (!displayTitle && !introHtml && !descriptionHtml && cards.length === 0) {
    return null;
  }

  const phone =
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "";
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";

  return (
    <FullContainer
      id="service_description2"
      className={cn(poppins.className, "bg-white py-12 md:py-16 lg:py-20")}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto ">
          {displayTitle ? (
            <h2 className="text-center text-[32px] font-bold leading-tight text-black sm:text-[40px] md:text-[44px]">
              {displayTitle}
            </h2>
          ) : null}

          {displayTitle ? (
            <div
              className="mx-auto mt-4 h-1 w-16 rounded-full"
              style={{ backgroundColor: BRAND_BLUE }}
              aria-hidden
            />
          ) : null}

          {introHtml ? (
            <div
              className={cn(
                "prose prose-neutral mx-auto mt-6 max-w-3xl text-center prose-p:text-neutral-600",
                displayTitle ? "" : "mt-0",
              )}
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          ) : null}

          {cards.length > 0 ? (
            <ul
              className={cn(
                "mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8",
                introHtml ? "mt-8" : "",
              )}
            >
              {cards.map((card, index) => (
                <li key={`${card.title}-${index}`} className="min-w-0">
                  <BenefitCard card={card} index={index} />
                </li>
              ))}
            </ul>
          ) : null}

          {descriptionHtml ? (
            <div
              className={cn(
                "prose prose-neutral mx-auto mt-8 max-w-4xl prose-p:text-neutral-600",
                displayTitle ? "" : "mt-0",
              )}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : null}

          <div className="mt-10 flex flex-col items-center justify-center gap-4  border-neutral-200 pt-10 sm:flex-row sm:flex-wrap md:mt-14">
            <button
              type="button"
              onClick={scrollToQuote}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#CC3333] px-8 py-3 text-lg font-extrabold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] "
            >
              Get A Quote
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>

            {phone ? (
              <Link
                href={phoneHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-8 py-3 text-lg font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: "#D32F2F" }}
              >
                <Phone className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
                <span>{phone}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
