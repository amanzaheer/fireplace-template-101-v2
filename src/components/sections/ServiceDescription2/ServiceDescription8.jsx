"use client";

import md from "@/lib/markdown";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import PrimaryPhone from "@/components/common/PrimaryPhone";
import QuoteButton from "@/components/common/QuoteButton";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserratTitle = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const montserratContent = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sd2-body",
  display: "swap",
});

export default function ServiceDescription8({ content }) {
  const title = String(content?.service_description2?.title ?? "").trim();
  const text = content?.service_description2?.description ?? "";
  const html = text ? md.render(text) : "";
  if (!title && !html && !text) return null;

  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="service_description2" className="py-6 md:py-8">
      <Container>
        <div className="mx-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg md:mx-0">
          {title ? (
            <h2
              className={cn(
                montserratTitle.className,
                "mb-6 text-center text-[44px] font-bold leading-[53px] tracking-tight text-[#000000] not-italic",
              )}
            >
              {title}
            </h2>
          ) : null}

          {html ? (
            <div className={cn("py-5", montserratContent.variable)}>
              <div
                className={cn(
                  "prose mx-auto max-w-full font-[var(--font-sd2-body)] text-[#000000]",
                  "[&_p]:!text-[16px] [&_p]:!font-normal [&_p]:!leading-[1.65] [&_p]:!text-[#000000]",
                  "[&_li]:!text-[16px] [&_li]:!leading-[1.65] [&_li]:!text-[#000000]",
                  "[&_ul]:!text-[#000000] [&_ol]:!text-[#000000]",
                  "[&_h1]:!font-[var(--font-sd2-body)] [&_h1]:!text-[28px] [&_h1]:!font-bold [&_h1]:!leading-tight [&_h1]:!tracking-tight [&_h1]:!text-[#000000]",
                  "[&_h2]:!font-[var(--font-sd2-body)] [&_h2]:!text-[24px] [&_h2]:!font-semibold [&_h2]:!leading-snug [&_h2]:!tracking-tight [&_h2]:!text-[#000000]",
                  "[&_h3]:!font-[var(--font-sd2-body)] [&_h3]:!text-[20px] [&_h3]:!font-semibold [&_h3]:!leading-snug [&_h3]:!text-[#000000]",
                  "[&_h4]:!font-[var(--font-sd2-body)] [&_h4]:!text-[18px] [&_h4]:!font-semibold [&_h4]:!leading-snug [&_h4]:!text-[#000000]",
                  "[&_strong]:!font-semibold [&_strong]:!text-[#000000]",
                  "[&_a]:!font-[var(--font-sd2-body)] [&_a]:!text-[#000000] [&_a]:underline-offset-2 hover:[&_a]:opacity-80",
                )}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          ) : null}
          {phone ? (
            <div className="mt-2 flex w-full flex-col gap-3 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <div
                className={
                  "[&_button]:!min-h-[48px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#ff6600] [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#e65c00] [&_button]:!transition-colors [&_svg]:!text-white"
                }
              >
                <PrimaryPhone phone={phone} variant="orange" />
              </div>
              <div
                className={
                  "[&_button]:!min-h-[48px] [&_button]:!w-auto [&_button]:!min-w-[160px] [&_button]:!rounded-none [&_button]:!border-0 [&_button]:!bg-[#ff6600] [&_button]:!p-0 [&_button]:!px-7 [&_button]:!py-3 [&_button]:!text-sm [&_button]:!font-bold [&_button]:!uppercase [&_button]:!tracking-wide [&_button]:!text-white [&_button]:!shadow-none [&_button]:hover:!bg-[#e65c00] [&_button]:!transition-colors [&_button]:!items-center [&_button]:!justify-center [&_h2]:!m-0 [&_h2]:!text-sm [&_h2]:!font-bold [&_h2]:!leading-none [&_h2]:!text-white [&_svg]:!h-4 [&_svg]:!w-4 [&_svg]:!text-white"
                }
              >
                <QuoteButton phone={phone} variant="orange" />
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </FullContainer>
  );
}
