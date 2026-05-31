"use client";

import React, { useMemo } from "react";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import FiveStars from "@/components/common/FiveStars";
import { Poppins } from "next/font/google";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function testimonialQuote(item) {
  const text = item?.quote ?? item?.text ?? item?.review ?? "";
  return typeof text === "string" ? text.trim() : "";
}

function testimonialDate(item) {
  const raw =
    item?.date ??
    item?.time_ago ??
    item?.posted ??
    item?.review_date ??
    "";
  return typeof raw === "string" ? raw.trim() : "";
}

export default function Testimonials18({ content }) {
  const data = content?.testimonials ?? {};
  const testimonials = Array.isArray(data.list) ? data.list : [];
  const title =
    data.title ?? data.heading ?? "What Our Customers Say";
  const subtitle =
    data.subtitle ??
    data.description ??
    data.sub_title ??
    "150+ verified Google Reviews from happy customers";

  const gridItems = useMemo(
    () => testimonials.slice(0, 6),
    [testimonials],
  );

  if (!gridItems.length) return null;

  return (
    <FullContainer className="bg-black py-10 md:py-14 lg:py-16" id="testimonials">
      <Container className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2
              className={`${poppins.className} text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]`}
            >
              {title}
            </h2>
            {subtitle ? (
              <p
                className={`${poppins.className} mx-auto mt-3 max-w-3xl text-sm font-normal text-white/90 sm:text-base md:mt-4 md:text-lg`}
              >
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 md:mt-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-3">
            {gridItems.map((testimonial, index) => {
              const name = testimonial?.name ?? testimonial?.author ?? "";
              const quote = testimonialQuote(testimonial);
              const date = testimonialDate(testimonial);

              return (
                <article
                  key={testimonial?.id ?? `${name}-${index}`}
                  className={`flex min-h-[220px] flex-col rounded-xl bg-white p-5 shadow-sm sm:min-h-[200px] md:p-6 ${poppins.className}`}
                >
                  <FiveStars
                    className="shrink-0 justify-start"
                    starClassName="!text-[#FF0011]"
                  />

                  {quote ? (
                    <p className={`mt-4 flex-1 text-left text-sm leading-relaxed font-poppins text-black text-[12px] md:text-[15px]`}>
                      {quote}
                    </p>
                  ) : (
                    <div className="mt-4 flex-1" />
                  )}

                  <div className="mt-4 border-t-2 border-neutral-200 pt-0">
                    <div className="flex items-center justify-between gap-3">
                      {name ? (
                        <p className="text-sm font-bold text-black sm:text-base">
                          {name}
                        </p>
                      ) : (
                        <span />
                      )}
                      {date ? (
                        <p className="shrink-0 text-sm text-black/80 sm:text-[15px]">
                          {date}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
