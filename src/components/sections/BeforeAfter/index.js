"use client";/**
 * BeforeAfter section: multiple designs, one export.
 */
import BeforeAfter1 from "./BeforeAfter1";
import BeforeAfter2 from "./BeforeAfter2";
import BeforeAfter3 from "./BeforeAfter3";
import BeforeAfter4 from "./BeforeAfter4";
import BeforeAfter6 from "./BeforeAfter6";
import BeforeAfter7 from "./BeforeAfter7";
import BeforeAfter10 from "./BeforeAfter10";
import BeforeAfter11 from "./BeforeAfter11";
import BeforeAfter12 from "./BeforeAfter12";
import BeforeAfter13 from "./BeforeAfter13";
import BeforeAfter14 from "./BeforeAfter14";
import BeforeAfter15 from "./BeforeAfter15";
import BeforeAfter16 from "./BeforeAfter16";
import BeforeAfter17 from "./BeforeAfter17";
import BeforeAfter19 from "./BeforeAfter19";
import BeforeAfter20 from "./BeforeAfter20";
const variants = {
  BeforeAfter1,
  BeforeAfter2,
  BeforeAfter3,
  BeforeAfter4,
  BeforeAfter6,
  BeforeAfter7,
  BeforeAfter11,
  BeforeAfter14,
  BeforeAfter15,
  BeforeAfter12,
  BeforeAfter10,
  BeforeAfter13,
  BeforeAfter16,
  BeforeAfter17,
  BeforeAfter20,
  BeforeAfter19,
  };

export default function BeforeAfter({ variant, content }) {
  const name = variant ?? "BeforeAfter20";
  const Component = variants[name] ?? BeforeAfter20;
  return <Component content={content} />;
}
export { 
  BeforeAfter1,
  BeforeAfter2,
  BeforeAfter3,
  BeforeAfter4,
  BeforeAfter6,
  BeforeAfter7,
  BeforeAfter11,
  BeforeAfter14,
  BeforeAfter15,
  BeforeAfter12,
  BeforeAfter10,
  BeforeAfter13,
  BeforeAfter16,
  BeforeAfter17,
  BeforeAfter19,
  variants };

