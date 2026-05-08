"use client";

/**
 * WhyChoose section: multiple designs, one export.
 */

import WhyChoose1 from "./WhyChoose1";
import WhyChoose2 from "./WhyChoose2";
import WhyChoose3 from "./WhyChoose3";
import WhyChoose4 from "./WhyChoose4";
import WhyChoose5 from "./WhyChoose5";
import WhyChoose6 from "./WhyChoose6";
import WhyChoose7 from "./WhyChoose7";
import WhyChoose8 from "./WhyChoose8";
import WhyChoose9 from "./WhyChoose9";
import WhyChoose10 from "./WhyChoose10";
import WhyChoose11 from "./WhyChoose11";
import WhyChoose12 from "./WhyChoose12";
import WhyChoose13 from "./WhyChoose13";
import WhyChoose14 from "./WhyChoose14";
import WhyChoose15 from "./WhyChoose15";
import WhyChoose16 from "./WhyChoose16";
import WhyChoose17 from "./WhyChoose17";
import WhyChoose19 from "./WhyChoose19";
import WhyChoose20 from "./WhyChoose20";

const variants = {
  WhyChoose1,
  WhyChoose2,
  WhyChoose3,
  WhyChoose4,
  WhyChoose5,
  WhyChoose6,
  WhyChoose7,
  WhyChoose8,
  WhyChoose9,
  WhyChoose10,
  WhyChoose11,
  WhyChoose12,
  WhyChoose13,
  WhyChoose14,
  WhyChoose15,
  WhyChoose16,
  WhyChoose17,
  WhyChoose19,
  WhyChoose20,
};

export default function WhyChoose({ variant, content }) {
  const name = String(variant ?? "WhyChoose19").trim();
  const Component = variants[name] ?? WhyChoose19;

  return <Component content={content} />;
}

export {
  WhyChoose1,
  WhyChoose2,
  WhyChoose3,
  WhyChoose4,
  WhyChoose5,
  WhyChoose6,
  WhyChoose7,
  WhyChoose8,
  WhyChoose9,
  WhyChoose10,
  WhyChoose11,
  WhyChoose12,
  WhyChoose13,
  WhyChoose14,
  WhyChoose15,
  WhyChoose16,
  WhyChoose17,
  WhyChoose19,
  WhyChoose20,
  variants,
};