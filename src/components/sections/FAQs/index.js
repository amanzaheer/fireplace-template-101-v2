"use client";
/**
 * FAQs section: accordion of questions and answers.
 */
import FAQs1 from "./FAQs1";
import FAQs2 from "./FAQs2";
import FAQs3 from "./FAQs3";
import FAQs4 from "./FAQs4";
import FAQs5 from "./FAQs5";
import FAQs6 from "./FAQs6";
import FAQs7 from "./FAQs7";
import FAQs8 from "./FAQs8";
import FAQs9 from "./FAQs9";
import FAQs14 from "./FAQs14";
import FAQs15 from "./FAQs15";
import FAQs12 from "./FAQs12";
import FAQs11 from "./FAQs11";
import FAQs10 from "./FAQs10";
import FAQs11 from "./FAQs11";
import FAQs12 from "./FAQs12";
import FAQs13 from "./FAQs13";
import FAQs14 from "./FAQs14";
import FAQs15 from "./FAQs15"
import FAQs16 from "./FAQs16";
import FAQs10 from "./FAQs10"
import FAQs17 from "./FAQs17"
import FAQs18 from "./FAQs18"
import FAQs17 from "./FAQs17";
import FAQs20 from "./FAQs20";
import FAQs19 from "./FAQs19";
import FAQs21 from "./FAQs21";

const variants = {
  FAQs1,
  FAQs2,
  FAQs3,
  FAQs4,
  FAQs5,
  FAQs6,
  FAQs7,
  FAQs8,
  FAQs9,
  FAQs10,
  FAQs11,
  FAQs12,
  FAQs13,
  FAQs14,
  FAQs15,
  FAQs12,
  FAQs11,
  FAQs16,
  FAQs10,
  FAQs17,
  FAQs18,
  FAQs16,
  FAQs17,
  FAQs20,
  FAQs19,
  FAQs21,
};

export default function FAQs({ variant, content }) {
  const name = String(variant ?? "FAQs21").trim();
  const Component = variants[name] ?? FAQs21;
  return <Component content={content} />;
}


export {
  FAQs1,
  FAQs2,
  FAQs3,
  FAQs4,
  FAQs5,
  FAQs6,
  FAQs7,
  FAQs8,
  FAQs9,
  FAQs10,
  FAQs11,
  FAQs12,
  FAQs13,
  FAQs14,
  FAQs15,
  FAQs16,
  FAQs17,
  FAQs19,
  FAQs20,
  FAQs21,
  variants,
};
