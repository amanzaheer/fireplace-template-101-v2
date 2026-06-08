"use client";

import { Poppins } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ACCENT_RED = "#FF0707";

function renderTitle(title, highlightedText) {
  if (!title) return null;
  if (!highlightedText || !title.includes(highlightedText)) {
    return <span className="text-black">{title}</span>;
  }

  const [before, ...rest] = title.split(highlightedText);
  const after = rest.join(highlightedText);
  return (
    <>
      <span className="text-black">{before}</span>
      <span style={{ color: ACCENT_RED }}>{highlightedText}</span>
      <span className="text-black">{after}</span>
    </>
  );
}

export default function InformationSection27({ content }) {
  const info = content?.information_section ?? {};
  const title = info.title ?? "";
  const highlightedText = info.highlighted_text ?? "";
  const subTitle = info.sub_title ?? "";
  const description = info.description ?? "";
  const callNowLabel =
    info.call_now_label ?? content?.service_benefits?.call_now_label ?? "CALL NOW:";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  if (!title && !subTitle && !description) return null;

  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";

  return (
    <FullContainer
      id="information-section"
      className={`bg-white py-10 md:py-14 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {title ? (
            <h2 className="text-[26px] font-bold leading-tight text-black sm:text-[32px] md:text-[36px]">
              {renderTitle(title, highlightedText)}
            </h2>
          ) : null}

          {subTitle ? (
            <h3 className="mt-6 w-full text-xl  flex items-center justify-center text-center font-bold leading-snug text-black sm:text-2xl md:text-[26px]">
              {subTitle}
            </h3>
          ) : null}

          {description ? (
            <p className="mt-4 w-full text-center text-sm leading-[1.75] text-[#222] md:text-base">
              {description}
            </p>
          ) : null}

          {phone ? (
            <a
              href={telHref}
              className="mt-8 inline-flex min-w-[260px] flex-col items-center px-7 border py-4 text-center text-white transition-opacity hover:opacity-95 md:px-8 md:py-5"
              style={{ backgroundColor: ACCENT_RED }}
            >
              <span className="text-sm font-semibold uppercase tracking-wide md:text-[26px]">
                {callNowLabel}
              </span>
              <span className="mt-1 text-xl font-bold leading-none sm:text-2xl md:text-[30px]">
                {phone}
              </span>
            </a>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
