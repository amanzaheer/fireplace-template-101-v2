"use client";
/**
 * TermsAndConditions section: multiple designs, one export.
 * `variant` comes from domain config (layouts.json via SectionLayout).
 */
import TermsAndConditions1 from "./terms-and-conditions1";
import TermsAndConditions2 from "./terms-and-conditions2";
import TermsAndConditions3 from "./terms-and-conditions3";
import TermsAndConditions4 from "./terms-and-conditions4";

const variants = {
  "terms-and-conditions1": TermsAndConditions1,
  "terms-and-conditions2": TermsAndConditions2,
  "terms-and-conditions3": TermsAndConditions3,
  "terms-and-conditions4": TermsAndConditions4,
};

export default function TermsAndConditions({ variant, content }) {
  const name = variant ?? "terms-and-conditions1";
  const Component = variants[name] ?? TermsAndConditions1;
  return <Component content={content} />;
}

export { TermsAndConditions1, TermsAndConditions2, TermsAndConditions3, TermsAndConditions4 };

