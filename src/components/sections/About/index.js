"use client";

/*
 * About section: multiple designs, one export.
 */

import About1 from "./About1";
import About2 from "./About2";
import About3 from "./About3";
import About4 from "./About4";
import About5 from "./About5";
import About6 from "./About6";
import About7 from "./About7";
import About8 from "./About8";
import About9 from "./About9";
import About10 from "./About10";
import About11 from "./About11";
import About12 from "./About12";
import About13 from "./About13";
import About14 from "./About14";
import About15 from "./About15";
import About16 from "./About16";
import About17 from "./About17";
import About19 from "./About19";
import About20 from "./About20";
import About21 from "./About21";
import About22 from "./About22";
import About24 from "./About24";

const variants = {
  About1,
  About2,
  About3,
  About4,
  About5,
  About6,
  About7,
  About8,
  About9,
  About10,
  About11,
  About12,
  About13,
  About14,
  About15,
  About16,
  About17,
  About19,
  About20,
  About21,
  About22,
  About24,
};

export default function About({ variant, content }) {
  const name = String(variant ?? "About21").trim();
  const Component = variants[name] ?? About21;
  return <Component content={content} />;
}
export {
  About1,
  About2,
  About3,
  About4,
  About5,
  About6,
  About7,
  About8,
  About9,
  About10,
  About11,
  About12,
  About13,
  About14,
  About15,
  About16,
  About17,
  About19,
  About20,
  About21,
  About22,
  About24,
  variants,
};
