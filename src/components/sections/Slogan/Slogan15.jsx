"use client";

import { Montserrat ,Rubik} from "next/font/google";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Link from "next/link";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
});
const rubik = Rubik({
    subsets: ["latin"],
    weight: ["700"],
  });

function BannerCtaIcon({ className }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={39}
        height={38}
        viewBox="0 0 39 38"
        fill="none"
        className={cn("h-[28px] w-[29px] shrink-0", className)}
        aria-hidden
      >
        <path
          d="M15.9343 0H5.37446e-05V1.80952C-0.0121365 8.77558 2.04963 15.5955 5.93547 21.4428C8.79926 25.7545 12.5677 29.4264 16.9929 32.2167C22.994 36.0029 29.9935 38.0118 37.1429 37.9999H39V22.4743L26.5757 19.7835L23.1215 23.1492C19.9606 21.1703 17.2737 18.5517 15.2435 15.4714L18.6959 12.1057L15.9343 0Z"
          fill="#fff4e6"
        />
      </svg>
    );
  }

export default function Slogan9({ content }) {
    const block = content?.slogan ?? {};
    const banner = content?.banner ?? {};
    const title = block.title ?? "";
    const description = block.description ?? "";
    const phone =
    banner.cta_phone?.trim() ||
    content?.contact_info?.phone?.trim() ||
    content?.navbar?.phone?.trim() ||
    "(800) 555-1212";
  const tel = `tel:${phone.replace(/\s/g, "")}`;

    if (!title && !description) return null;

    return (
        <FullContainer
            id="slogan"
            className="flex flex-col items-center justify-center bg-[#fff4e6] pb-10 pt-6 md:pt-12"
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
                <Link
                    href={tel}
                    className="inline-flex items-center gap-3 rounded-xl bg-[#786f6f] px-5 py-2  transition hover:bg-[#62370c] sm:px-6 sm:py-2.5 "
                >
                    <BannerCtaIcon />
                    <span
                        className={`${rubik.className} text-[24px] font-bold not-italic leading-normal text-[#fff4e6]`}
                    >
                        {phone}
                    </span>
                </Link>
            </Container>
        </FullContainer>
    );
}
