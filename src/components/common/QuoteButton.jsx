"use client";

import { TextQuote } from "lucide-react";

export default function QuoteButton({ phone, label = "" }) {
  const handleClick = () => {
    const el =
      document.getElementById("quote-form-section") ??
      document.querySelector('.quote-form, [id*="quote"], [class*="quote-form"]');

    if (el) {
      const offset = 80;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex w-[217.278px] items-center justify-center gap-[21.095px] rounded-[12px] bg-[#786F6F] px-[40.08px] py-[12.657px] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#786F6F]"
    >
      <div className="flex items-center gap-2">
        <TextQuote className="h-5 w-5" />
        {label ? <span>{label}</span> : null}
      </div>
    </button>
  );
}
