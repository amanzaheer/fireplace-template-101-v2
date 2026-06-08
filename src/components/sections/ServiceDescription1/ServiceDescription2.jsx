"use client";

import React, { useMemo } from "react";
import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { resolveRefArray } from "@/lib/content-helpers";
import { Poppins, Rubik } from "next/font/google";
import WhyChoose2 from "@/components/sections/WhyChoose/WhyChoose2";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const headingClass = `${rubik.className} text-center text-[44px] font-normal leading-none tracking-normal text-[#212020]`;

function stripMarkdownInline(text) {
  if (typeof text !== "string") return "";
  return text.replace(/\*\*/g, "").replace(/\*/g, "").trim();
}

function parseMarkdownHeading(text) {
  if (typeof text !== "string") return "";
  const match = text.match(/^\s*#{1,6}\s+(.+?)(?:\r?\n|$)/);
  return match ? stripMarkdownInline(match[1]) : "";
}

function stripLeadingHeading(text, heading) {
  if (typeof text !== "string") return "";
  const lines = text.split(/\r?\n/);
  let index = 0;
  while (index < lines.length && lines[index].trim() === "") index += 1;

  const headingMatch = lines[index]?.trim().match(/^#{1,6}\s+(.+)$/);
  if (!headingMatch) return text.trim();

  const lineHeading = stripMarkdownInline(headingMatch[1]).toLowerCase();
  const normalizedHeading = heading ? heading.trim().toLowerCase() : lineHeading;

  if (lineHeading !== normalizedHeading) return text.trim();

  index += 1;
  while (index < lines.length && lines[index].trim() === "") index += 1;
  return lines.slice(index).join("\n").trim();
}

function parseBulletCards(text) {
  if (typeof text !== "string") return [];
  const cards = [];
  const regex = /^[-*+]\s+\*\*([^*]+)\*\*:?\s*(.*)$/gm;
  let match = regex.exec(text);
  while (match) {
    const description = match[2].trim();
    if (match[1].trim() || description) {
      cards.push({
        title: stripMarkdownInline(match[1]),
        description: stripMarkdownInline(description),
      });
    }
    match = regex.exec(text);
  }
  return cards;
}

function parseBoldBlockCards(text) {
  if (typeof text !== "string") return [];
  const cards = [];
  const parts = text.split(/\n(?=\*\*[^*]+\*\*)/);
  for (const part of parts) {
    const match = part.match(/^\*\*([^*]+)\*\*\s*\n?([\s\S]*)$/);
    if (!match) continue;
    const description = match[2].trim();
    if (!description) continue;
    cards.push({
      title: stripMarkdownInline(match[1]),
      description: stripMarkdownInline(description),
    });
  }
  return cards;
}

function splitIntroLead(intro) {
  const trimmed = typeof intro === "string" ? intro.trim() : "";
  if (!trimmed) return { lead: "", body: "" };

  const newlineIndex = trimmed.indexOf("\n");
  if (newlineIndex !== -1) {
    return {
      lead: trimmed.slice(0, newlineIndex).trim(),
      body: trimmed.slice(newlineIndex + 1).trim(),
    };
  }

  const sentenceEnd = trimmed.search(/[.!?](?:\s+|$)/);
  if (sentenceEnd !== -1) {
    return {
      lead: trimmed.slice(0, sentenceEnd + 1).trim(),
      body: trimmed.slice(sentenceEnd + 1).trim(),
    };
  }

  return { lead: trimmed, body: "" };
}

function splitIntroAndList(text) {
  if (typeof text !== "string") return { intro: "", listBody: "" };
  const listStart = text.search(/^[-*+]\s+\*\*/m);
  if (listStart === -1) {
    const boldStart = text.search(/^\*\*[^*]+\*\*\s*$/m);
    if (boldStart === -1) return { intro: text.trim(), listBody: "" };
    return {
      intro: text.slice(0, boldStart).trim(),
      listBody: text.slice(boldStart).trim(),
    };
  }
  return {
    intro: text.slice(0, listStart).trim(),
    listBody: text.slice(listStart).trim(),
  };
}

function normalizeCardItem(item) {
  if (!item || typeof item !== "object") return null;
  const title = String(item.title ?? item.heading ?? "").trim();
  const description = String(
    item.description ?? item.text ?? item.body ?? "",
  ).trim();
  if (!title && !description) return null;
  return { title, description };
}

function FeatureCard({ title, description }) {
  return (
    <article className="flex h-full flex-col rounded-[24px] border border-gray-200 bg-white px-5 py-8 text-center shadow-[0_20px_30px_-10px_rgba(0,0,0,0.30)] md:px-6 md:py-10">
      {title ? (
        <h3
          className={`${rubik.className} text-lg  leading-snug text-[#212020] md:text-[20px] font-bold `}
        >
          {title}
        </h3>
      ) : null}
      {description ? (
        <p
          className={`${rubik.className} mt-4 text-sm leading-relaxed text-[#5a5a5a] md:text-[16px]`}
        >
          {description}
        </p>
      ) : null}
    </article>
  );
}

export default function ServiceDescription2({ content }) {
  const block = content?.service_description1 ?? {};
  const rawDescription =
    typeof block.description === "string" ? block.description.trim() : "";
  const blockTitle =
    typeof block.title === "string" ? block.title.trim() : "";

  const { heading, introLeadHtml, introBodyHtml, cards } = useMemo(() => {
    const parsedHeading =
      blockTitle || parseMarkdownHeading(rawDescription) || "";
    const body = stripLeadingHeading(rawDescription, parsedHeading);
    const fromList = resolveRefArray(content, block, "list")
      .map(normalizeCardItem)
      .filter(Boolean);

    const buildIntroParts = (intro) => {
      if (!intro) {
        return { introLeadHtml: "", introBodyHtml: "" };
      }
      const { lead, body: introBody } = splitIntroLead(intro);
      return {
        introLeadHtml: lead ? md.render(lead) : "",
        introBodyHtml: introBody ? md.render(introBody) : "",
      };
    };

    if (fromList.length > 0) {
      const { intro } = splitIntroAndList(body);
      return {
        heading: parsedHeading,
        ...buildIntroParts(intro),
        cards: fromList,
      };
    }

    const { intro, listBody } = splitIntroAndList(body);
    const bulletCards = parseBulletCards(listBody || body);
    const boldCards =
      bulletCards.length > 0 ? [] : parseBoldBlockCards(listBody || body);
    const parsedCards = bulletCards.length > 0 ? bulletCards : boldCards;

    return {
      heading: parsedHeading,
      ...buildIntroParts(intro),
      cards: parsedCards,
    };
  }, [blockTitle, content, block, rawDescription]);

  const hasIntro = Boolean(introLeadHtml || introBodyHtml);
  if (!heading && !hasIntro && cards.length === 0) return null;

  return (
    <>
      <FullContainer id="service_description1" className="bg-white py-10 md:py-14">
        <Container className="px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            {heading ? (
              <h2 className={`${headingClass} mx-auto max-w-4xl`}>
                {heading}
              </h2>
            ) : null}

            {hasIntro ? (
              <div
                className={`${rubik.className} mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-black md:mt-8 md:text-[16px] [&_p]:mb-0 [&_p]:leading-relaxed`}
              >
                {introLeadHtml ? (
                  <div
                    className="font-bold [&_p]:font-bold [&_strong]:font-bold"
                    dangerouslySetInnerHTML={{ __html: introLeadHtml }}
                  />
                ) : null}
                {introBodyHtml ? (
                  <div
                    className={`${introLeadHtml ? "mt-2" : ""} font-normal`}
                    dangerouslySetInnerHTML={{ __html: introBodyHtml }}
                  />
                ) : null}
              </div>
            ) : null}

            {cards.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-5">
                {cards.map((card, index) => (
                  <FeatureCard
                    key={`${card.title}-${index}`}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </FullContainer>

      <WhyChoose2 content={content} />
    </>
  );
}
