"use client";

import { Montserrat } from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Slogan9({ content }) {
  const block = content?.slogan ?? {};
  const title = block.title ?? "";
  const description = block.description ?? "";

  if (!title && !description) return null;

  return (
    <FullContainer
      id="slogan"
      className="flex flex-col items-center justify-center bg-white pb-10 pt-6 md:pt-12"
    >
      <Container
        className={`flex flex-col items-center justify-center text-center ${montserrat.className}`}
      >
        {title ? (
          <h2
            className="mb-4 w-full self-stretch"
            style={{
              color: "#000",
              fontSize: "30px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "53px",
            }}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className="mb-4 w-full max-w-3xl"
            style={{
              color: "#000",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
            }}
          >
            {description}
          </p>
        ) : null}
      </Container>
    </FullContainer>
  );
}
