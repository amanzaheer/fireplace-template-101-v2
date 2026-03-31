"use client";

import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import md from "@/lib/markdown";

function MaybeMarkdown({ as: Tag = "span", className, children }) {
  if (typeof children !== "string") return <Tag className={className}>{children}</Tag>;
  const hasMarkdown = /[*_`#\[\]~>]/.test(children);
  if (!hasMarkdown) return <Tag className={className}>{children}</Tag>;
  const html = md.render(children).replace(/^<p>([\s\S]*?)<\/p>\n?$/, "$1");
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const CheckIcon = ({ isMainCard }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center size-6 rounded-full border mt-0.5 ${
      isMainCard ? "border-[#f15a06] text-[#f15a06]" : "border-[#c36a35] text-[#c36a35]"
    }`}
    aria-hidden
  >
    <svg
      className="w-3.5 h-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </span>
);

const PromotionCard = ({
  heading,
  subheading,
  features,
  isMainCard = false,
}) => {
  return (
    <div
      className={`relative flex flex-col h-full border p-5 md:p-6 transition-all duration-200 ${
        isMainCard
          ? "bg-black text-white border-black shadow-[0_5px_10px_rgba(0,0,0,0.25)] md:scale-[1.02]"
          : "bg-white text-[#1f2937] border-[#2f2f2f]"
      }`}
    >
      {heading && (
        <div className="mb-5">
          <MaybeMarkdown as="h3" className={`font-semibold tracking-tight leading-tight ${isMainCard ? "text-[18px] md:text-[20px]" : "text-[18px] md:text-[20px]"}`}>
            {heading}
          </MaybeMarkdown>
          {subheading && (
            <MaybeMarkdown as="p" className={`font-bold leading-tight mt-2 mb-3 ${isMainCard ? "text-[28px] md:text-[32px]" : "text-[28px] md:text-[32px]"}`}>
              {subheading}
            </MaybeMarkdown>
          )}
          <p className={`text-[15px] mb-0 leading-relaxed ${isMainCard ? "text-white/85" : "text-gray-600"}`}>
            Posuere nulla ut feugiat odio neque duis vulputate eget scelerisque. Eleifend.
          </p>
        </div>
      )}

      <div className="space-y-3 flex-1">
        {(Array.isArray(features) ? features : [])?.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 text-[15px] md:text-[16px] leading-relaxed ${
              isMainCard ? "text-white" : "text-[#424242]"
            }`}
          >
            <CheckIcon isMainCard={isMainCard} />
            <MaybeMarkdown as="span" className="pt-0.5 min-w-0">{feature}</MaybeMarkdown>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 py-3 font-bold uppercase text-[15px] tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f15a06] focus:ring-offset-2 ${
          isMainCard
            ? "bg-[#f15a06] text-white hover:bg-[#d94f05]"
            : "bg-[#d95411] text-white hover:bg-[#be470c]"
        }`}
      >
        CALL US TODAY
      </button>
    </div>
  );
};

export default function Promotion5({ content }) {
  const promotion = content?.promotion ?? {};
  const title = promotion?.title ?? "Monthly Promotion";
  const description = promotion?.description;
  const details = Array.isArray(promotion?.details) ? promotion.details : [];

  return (
    <FullContainer id="promo" className="bg-[#ededed]">
      {/* Same width + horizontal padding as Navbar5: Container default max-w-[1270px], px-3 md:px-4 */}
      <Container className="mx-auto">
        <div className="w-full pb-12 pt-10 md:pt-12">
          <MaybeMarkdown as="h2" className="text-4xl md:text-5xl font-extrabold text-center text-[#222] mb-8 md:mb-10 tracking-tight">
            {title}
          </MaybeMarkdown>
          {description && (
            <MaybeMarkdown as="p" className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
              {description}
            </MaybeMarkdown>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 w-full items-stretch">
            {details.map((item, index) => (
              <PromotionCard
                key={index}
                heading={item.heading}
                subheading={item.subheading}
                features={item.features}
                isMainCard={index === 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}