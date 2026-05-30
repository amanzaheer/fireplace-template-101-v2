"use client";
import Testimonials1 from "./Testimonials1";
import Testimonials2 from "./Testimonials2";
import Testimonials3 from "./Testimonials3";
import Testimonials4 from "./Testimonials4";
import Testimonials5 from "./Testimonials5";
import Testimonials6 from "./Testimonials6";
import Testimonials7 from "./Testimonials7";
import Testimonials8 from "./Testimonials8";
import Testimonials9 from "./Testimonials9";
import Testimonials10 from "./Testimonials10";
import Testimonials11 from "./Testimonials11";
import Testimonials12 from "./Testimonials12";
import Testimonials13 from "./Testimonials13";
import Testimonials14 from "./Testimonials14";
import Testimonials15 from "./Testimonials15";
import Testimonials16 from "./Testimonials16";
import Testimonials17 from "./Testimonials17";
import Testimonials19 from "./Testimonials19";
import Testimonials20 from "./Testimonials20";
import Testimonials21 from "./Testimonials21";
import Testimonials26 from "./Testimonials26";
import Testimonials27 from "./Testimonials27";
import Testimonials28 from "./Testimonials28";
import Testimonials30 from "./Testimonials30";
import Testimonials31 from "./Testimonials31";
const variants = {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials4,
  Testimonials6,
  Testimonials7,
  Testimonials8,
  Testimonials9,
  Testimonials5,
  Testimonials10,
  Testimonials14,
  Testimonials15,
  Testimonials17,
  Testimonials13,
  Testimonials11,
  Testimonials12,
  Testimonials16,
  Testimonials17,
  Testimonials20,
  Testimonials19,
  Testimonials21,
  Testimonials26,
  Testimonials27,
  Testimonials28,
  Testimonials30,
  Testimonials31,
};

export default function Testimonials({ variant, content }) {
  const name = String(variant ?? "Testimonials21").trim();
  const Component = variants[name] ?? Testimonials21  ;
  return <Component content={content} />;
}

export {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials4,
  Testimonials5,
  Testimonials6,
  Testimonials7,
  Testimonials8,
  Testimonials9,
  Testimonials10,
  Testimonials11,
  Testimonials12,
  Testimonials13,
  Testimonials14,
  Testimonials15,
  Testimonials16,
  Testimonials17,
  Testimonials19,
  Testimonials20,
  Testimonials21,
  Testimonials26,
  Testimonials27,
  Testimonials28,
  Testimonials30,
  Testimonials31,
  variants,
};

