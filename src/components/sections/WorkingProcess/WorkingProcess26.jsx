"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const CARD_RED = "#B81309";
const CARD_GRAY = "#E9E9E9";

const SHIELD_ICON_PATH =
  "M32.8757 0.298469C33.2181 0.102877 33.6057 0 34 0C34.3943 0 34.7819 0.102877 35.1243 0.298469L66.8576 18.4318C67.2045 18.63 67.4929 18.9163 67.6935 19.2618C67.8941 19.6073 67.9999 19.9997 68 20.3993V23.6633C68.0001 33.6637 64.7422 43.3919 58.7195 51.3753C52.6968 59.3587 44.2371 65.1627 34.6211 67.9086C34.2151 68.0243 33.7849 68.0243 33.3789 67.9086C23.7629 65.1627 15.3032 59.3587 9.28049 51.3753C3.25776 43.3919 -0.000124619 33.6637 3.57519e-09 23.6633L3.57519e-09 20.3993C0.000128873 19.9997 0.105859 19.6073 0.306478 19.2618C0.507098 18.9163 0.795477 18.63 1.1424 18.4318L32.8757 0.298469ZM32.0597 48.5558L51.6347 24.0803L48.0987 21.2515L31.4069 42.1094L19.584 32.2585L16.6827 35.7401L32.0597 48.5558Z";

function parseLevelNumber(level) {
  const match = String(level ?? "").match(/\d+/);
  const parsed = match ? Number.parseInt(match[0], 10) : Number.NaN;
  return Number.isNaN(parsed) ? null : parsed;
}

function getStepDescription(step) {
  if (!step || typeof step !== "object") {
    return typeof step === "string" ? step : "";
  }
  const value =
    step.description ?? step.desc ?? step.text ?? step.details ?? step.content ?? "";
  return typeof value === "string" ? value : "";
}

function normalizeProcessSteps(rawSteps) {
  if (!Array.isArray(rawSteps)) return [];

  return rawSteps
    .map((step, index) => {
      if (!step || typeof step !== "object") {
        const text = typeof step === "string" ? step : "";
        return {
          level: `Level ${index + 1}`,
          title: `Step ${index + 1}`,
          description: text,
          highlighted: false,
        };
      }

      return {
        ...step,
        level:
          step.level ??
          step.subtitle ??
          step.tag ??
          `Level ${index + 1}`,
        title: step.title ?? `Step ${index + 1}`,
        description: getStepDescription(step),
        highlighted:
          step.highlighted ?? step.active ?? step.is_featured ?? false,
      };
    })
    .sort((a, b) => {
      const levelA = parseLevelNumber(a.level);
      const levelB = parseLevelNumber(b.level);
      if (levelA !== null && levelB !== null && levelA !== levelB) {
        return levelA - levelB;
      }
      return 0;
    });
}

function ProcessShieldIcon({ fill = CARD_RED, className }) {
  return (
    <svg
      className={className}
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

export default function WorkingProcess26({ content }) {
  const section =
    content?.our_process ??
    content?.working_process ??
    content?.workingprocess ??
    {};

  const heading = section?.heading ?? section?.title ?? "";
  const sectionIntro =
    typeof section?.description === "string" ? section.description.trim() : "";
  const stepsFromContent = Array.isArray(section?.list)
    ? section.list
    : Array.isArray(section?.description)
      ? section.description
      : Array.isArray(section?.steps)
        ? section.steps
        : [];
  const displaySteps = normalizeProcessSteps(stepsFromContent).slice(0, 3);

  if (!heading && displaySteps.length === 0) return null;

  return (
    <FullContainer
      id="working_process"
      className={`bg-white py-12 md:py-16 lg:py-20 ${poppins.className}`}
    >
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full">
          {heading ? (
            <h2 className="text-center text-[32px] font-bold leading-tight text-black md:text-[40px] lg:text-[44px]">
              {heading}
            </h2>
          ) : null}

          {sectionIntro ? (
            <p className="mx-auto mt-4 max-w-[640px] text-center text-[15px] leading-relaxed text-black/80 md:text-[16px]">
              {sectionIntro}
            </p>
          ) : null}

          {displaySteps.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 justify-items-center gap-4 sm:mt-10 sm:gap-[17px] md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {displaySteps.map((step, index) => {
                const highlighted = index === 2;
                const level = step.level;
                const title = step.title;
                const description = step.description;

                return (
                  <div
                    key={`${level}-${title}-${index}`}
                    className={cn(
                      "flex w-full max-w-[360px] flex-col items-center rounded-[32px] text-center sm:rounded-[36px] lg:rounded-[40px]",
                      "min-h-[400px] px-5 py-5 sm:min-h-[440px] sm:px-6 sm:py-6 lg:h-[498px] lg:min-h-[498px] lg:px-[29.89px] lg:py-[21.98px]",
                      highlighted ? "text-white" : "text-black",
                    )}
                    style={{
                      backgroundColor: highlighted ? CARD_RED : CARD_GRAY,
                    }}
                  >
                    <ProcessShieldIcon
                      fill={highlighted ? "#FFFFFF" : CARD_RED}
                      className="h-[68px] w-[68px] shrink-0"
                    />

                    <p
                      className={cn(
                        "mt-6 text-[22px] font-bold leading-tight md:text-[24px]",
                        highlighted ? "text-white" : "text-black",
                      )}
                    >
                      {level}
                    </p>

                    <h3
                      className={cn(
                        "mt-2 text-[26px] font-bold leading-tight md:text-[30px]",
                        highlighted ? "text-white" : "text-black",
                      )}
                    >
                      {title}
                    </h3>

                    {description ? (
                      <p
                        className={cn(
                          "mt-5 flex-1 overflow-y-auto text-[15px] font-normal leading-[1.65] md:text-[16px]",
                          highlighted ? "text-white/95" : "text-black/90",
                        )}
                      >
                        {description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
