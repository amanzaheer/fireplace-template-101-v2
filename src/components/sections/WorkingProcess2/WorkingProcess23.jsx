"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/** Same size for all pills — center only moves up on desktop for featured feel */
const CARD_CLASS =
  "mx-auto box-border flex w-full max-w-[280px] shrink-0 flex-col items-center justify-center gap-3 rounded-[120px] px-5 py-10 text-center sm:max-w-[320px] sm:gap-4 sm:rounded-[180px] sm:px-7 sm:py-12 md:max-w-[340px] lg:h-[498px] lg:w-[360px] lg:max-w-[360px] lg:gap-[17px] lg:rounded-[240px] lg:px-[29.89px] lg:py-[21.98px] min-h-[340px] sm:min-h-[400px] md:min-h-[460px]";
const ICON_CLASS = "h-11 w-11 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14";
const ICON_FALLBACK_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-lg sm:h-12 sm:w-12 lg:h-14 lg:w-14";
const LEVEL_TEXT_CLASS = "text-sm font-bold leading-[1.2] sm:text-[15px] lg:text-[16px]";
const TITLE_TEXT_CLASS = "text-lg font-bold leading-[1.2] sm:text-xl lg:text-[24px]";
const DESCRIPTION_TEXT_CLASS =
  "w-full text-xs font-normal leading-[1.4] sm:text-sm lg:text-[14px]";
// ─── Level 1 card (left) — edit only this block ─────────────────────────────
const LEVEL_1_STYLES = {
  card: {
    className: CARD_CLASS,
    backgroundColor: "#E8E8E8",
  },
  icon: {
    className: ICON_CLASS,
    fallbackClassName: `${ICON_FALLBACK_CLASS} bg-[#3b7dd8]`,
  },
  level: `${LEVEL_TEXT_CLASS} text-black`,
  title: `${TITLE_TEXT_CLASS} text-black`,
  description: `${DESCRIPTION_TEXT_CLASS} text-black`,
};

// ─── Level 2 card (center / featured) — edit only this block ────────────────
const LEVEL_2_STYLES = {
  card: {
    className: CARD_CLASS,
    backgroundColor: "#D32F2F",
  },
  icon: {
    className: `${ICON_CLASS} brightness-0 invert`,
    fallbackClassName: `${ICON_FALLBACK_CLASS} bg-white/20`,
  },
  level: `${LEVEL_TEXT_CLASS} text-white`,
  title: `${TITLE_TEXT_CLASS} text-white`,
  description: `${DESCRIPTION_TEXT_CLASS} text-white`,
};

// ─── Level 3 card (right) — edit only this block ────────────────────────────
const LEVEL_3_STYLES = {
  card: {
    className: CARD_CLASS,
    backgroundColor: "#E8E8E8",
  },
  icon: {
    className: ICON_CLASS,
    fallbackClassName: `${ICON_FALLBACK_CLASS} bg-[#3b7dd8]`,
  },
  level: `${LEVEL_TEXT_CLASS} text-black`,
  title: `${TITLE_TEXT_CLASS} text-black`,
  description: `${DESCRIPTION_TEXT_CLASS} text-black`,
};

/** Center shifts up on lg+ only — same card size, taller visual emphasis */
const CARD_WRAPPER_BY_INDEX = [
  "flex shrink-0 justify-center lg:translate-y-4",
  "relative z-10 flex shrink-0 justify-center lg:-translate-y-8",
  "flex shrink-0 justify-center lg:translate-y-4",
];

const LEVEL_STYLES_BY_INDEX = [LEVEL_1_STYLES, LEVEL_2_STYLES, LEVEL_3_STYLES];

const SHIELD_ICON_PATH =
  "M32.8757 0.298469C33.2181 0.102877 33.6057 0 34 0C34.3943 0 34.7819 0.102877 35.1243 0.298469L66.8576 18.4318C67.2045 18.63 67.4929 18.9163 67.6935 19.2618C67.8941 19.6073 67.9999 19.9997 68 20.3993V23.6633C68.0001 33.6637 64.7422 43.3919 58.7195 51.3753C52.6968 59.3587 44.2371 65.1627 34.6211 67.9086C34.2151 68.0243 33.7849 68.0243 33.3789 67.9086C23.7629 65.1627 15.3032 59.3587 9.28049 51.3753C3.25776 43.3919 -0.000124619 33.6637 3.57519e-09 23.6633L3.57519e-09 20.3993C0.000128873 19.9997 0.105859 19.6073 0.306478 19.2618C0.507098 18.9163 0.795477 18.63 1.1424 18.4318L32.8757 0.298469ZM32.0597 48.5558L51.6347 24.0803L48.0987 21.2515L31.4069 42.1094L19.584 32.2585L16.6827 35.7401L32.0597 48.5558Z";

/** Exact design SVGs: level 1 blue, level 2 white, level 3 blue */
const STEP_ICON_FILLS = ["#0483B2", "#ffffff", "#0483B2"];

function ProcessShieldIcon({ fill = "#0483B2" }) {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={SHIELD_ICON_PATH}
        fill={fill}
      />
    </svg>
  );
}

function StepIcon({ index }) {
  const fill =
    STEP_ICON_FILLS[index] ??
    STEP_ICON_FILLS[index % STEP_ICON_FILLS.length];
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center sm:h-12 sm:w-12 lg:h-14 lg:w-14">
      <ProcessShieldIcon fill={fill} />
    </span>
  );
}

function ProcessPillCard({ step, index, styles }) {
  const level =
    step?.level ??
    step?.label ??
    (typeof step?.step === "string" ? step.step : null) ??
    `Level ${index + 1}`;

  const title = step?.title ?? "";
  const description = step?.description ?? "";

  return (
    <article
      className={styles.card.className}
      style={{ backgroundColor: styles.card.backgroundColor }}
    >
      <StepIcon index={index} />

      {level ? <p className={styles.level}>{level}</p> : null}

      {title ? <h3 className={styles.title}>{title}</h3> : null}

      {description ? <p className={styles.description}>{description}</p> : null}
    </article>
  );
}
export default function WorkingProcess23({ content }) {
  const section =
    content?.our_process ??
    content?.working_process ??
    content?.workingprocess ??
    {};

  const heading = section?.heading ?? section?.title ?? "";
  const steps = Array.isArray(section?.list) ? section.list : [];

  if (steps.length === 0) return null;

  const displaySteps = steps.slice(0, 3);

  return (
    <FullContainer
      id="working_process"
      className={`bg-white py-12 md:py-16 lg:py-20 ${montserrat.className}`}
    >
      <Container className="px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1200px]">
          {heading ? (
            <h2 className="text-center text-2xl font-extrabold leading-tight text-black sm:text-3xl md:text-4xl lg:text-[40px]">
              {heading}
            </h2>
          ) : null}

          <div
            className={cn(
              "mt-8 flex flex-col flex-wrap items-center justify-center gap-6 sm:mt-10 sm:gap-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-10",
            )}
          >
            {displaySteps.map((step, index) => (
              <div
                key={`${step?.title ?? "step"}-${index}`}
                className={CARD_WRAPPER_BY_INDEX[index] ?? CARD_WRAPPER_BY_INDEX[0]}
              >
                <ProcessPillCard
                  step={step}
                  index={index}
                  styles={LEVEL_STYLES_BY_INDEX[index] ?? LEVEL_1_STYLES}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
