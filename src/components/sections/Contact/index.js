"use client";
/**
 * Contact section: quote form and contact form.
 */
import Contact1 from "./Contact1";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Contact4 from "./Contact4";
import Contact5 from "./Contact5";
import Contact6 from "./Contact6";
import Contact7 from "./Contact7";
import Contact8 from "./Contact8";
import Contact9 from "./Contact9";
import Contact10 from "./Contact10";
import Contact11 from "./Contact11";
import Contact12 from "./Contact12";
import Contact13 from "./Contact13";
import Contact14 from "./Contact14";
import Contact15 from "./Contact15";
import Contact16 from "./Contact16";
import Contact17 from "./Contact17";
import Contact20 from "./Contact20";
import Contact19 from "./Contact19";
import Contact21 from "./Contact21";
import Contact24 from "./Contact24";
const variants = {
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact5,
  Contact6,
  Contact7,
  Contact8,
  Contact9,
  Contact10,
  Contact11,
  Contact12,
  Contact13,
  Contact14,
  Contact15,
  Contact16,
  Contact17,
  Contact20,
  Contact19,
  Contact21,
  Contact24,
};

export default function Contact({ variant, content }) {
  const name = variant ?? "Contact21";
  const Component = variants[name] ?? Contact21;
  return <Component content={content} />;
}
export {
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact5,
  Contact6,
  Contact7,
  Contact8,
  Contact9,
  Contact10,
  Contact11,
  Contact12,
  Contact13,
  Contact14,
  Contact15,
  Contact16,
  Contact17,
  Contact19,
  Contact20,
  Contact21,
  Contact24,
  variants,
};


