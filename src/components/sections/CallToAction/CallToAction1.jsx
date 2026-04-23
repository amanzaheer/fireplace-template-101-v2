import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function CallToAction1({ content }) {
  const section = content?.call_to_action ?? content?.calltoaction ?? {};
  const heading = section?.heading ?? section?.title ?? "Get a free quote from a";
 
  const description =
    section?.description ??
    "Our pros offer great prices & great service. Find out the exact price of your home project today!";
  const phone =
    section?.cta_phone ?? content?.contact_info?.phone ?? content?.navbar?.phone ?? "";
  const phoneLabel = phone || "(123)-456-7890";
  const phoneHref = phone ? `tel:${phone}` : "#";

  const estimateLink = section?.button_link ? `#${section.button_link}` : "#contact-us";
  const estimateLabel = section?.button_text ?? "Get a free estimate";

  return (
    <FullContainer
      id="call_to_action"
      className={`bg-transparent py-8 md:py-10 ${poppins.className}`}
    >
      <Container>
        <div className="relative overflow-hidden rounded-[22px] bg-black px-5 py-6 text-white md:px-10 md:py-8">
          <div className="pointer-events-none absolute inset-0" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-[700px]">
              <h2 className="text-[24px] font-normal leading-[1.1] md:text-[40px]">
                {heading}
              
              </h2>
              <p className="mt-3 max-w-[650px] text-[15px] font-medium leading-snug text-white/95 md:text-[18px]">
                {description}
              </p>
            </div>

            <div className="flex w-full max-w-[370px] flex-col gap-4 md:w-auto">
              <a
                href={estimateLink}
                className="inline-flex h-[46px] w-[238px] items-center justify-center rounded-full border-2 border-[#ff5a1f] bg-[#180700] px- text-center text-[20px] font-bold uppercase leading-none tracking-wide text-white shadow-[0_0_0_2px_rgba(255,90,31,0.2),0_0_18px_rgba(255,90,31,0.45)] transition-opacity hover:opacity-95"
              >
                {estimateLabel}
              </a>

              <a
                href={phoneHref}
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full border-3 border-white  bg-[#d94915] px-6 text-[16px] font-bold uppercase leading-none text-white shadow-[0_0_0_2px_rgba(255,90,31,0.2),0_0_18px_rgba(255,90,31,0.45)] transition-opacity hover:opacity-95"
              >
                <span>Call Now:</span>
                <span className="normal-case text-[20px]">{phoneLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}