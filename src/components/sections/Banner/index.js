/**
 * Banner section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
"use client";
import Banner1 from "./Banner1";
import Banner2 from "./Banner2";
import Banner3 from "./Banner3";
import Banner4 from "./Banner4";
import Banner5 from "./Banner5";
import Banner6 from "./Banner6";
import Banner7 from "./Banner7";
import Banner8 from "./Banner8";
import Banner9 from "./Banner9";
import Banner10 from "./Banner10";
import Banner11 from "./Banner11";
import Banner12 from "./Banner12";
import Banner13 from "./Banner13";
import Banner14 from "./Banner14";
import Banner15 from "./Banner15";
import Banner16 from "./Banner16";
import Banner17 from "./Banner17";
import Banner19 from "./Banner19";
import Banner20 from "./Banner20";
import Banner21 from "./Banner21";
import Banner23 from "./Banner23";
const variants = {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
  Banner8,
  Banner9,
  Banner10,
  Banner11,
  Banner12,
  Banner13,
  Banner14,
  Banner15,
  Banner16,
  Banner17,
  Banner19,
  Banner20,
  Banner21,
  Banner23,
  };

export default function Banner({ variant, content }) {
  const name = String(variant ?? '').trim() || 'Banner23';
  const Component = variants[name] ?? Banner23;
  return <Component content={content} />;
}
export {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
  Banner8,
  Banner9,
  Banner10,
  Banner11,
  Banner12,
  Banner13,
  Banner14,
  Banner15,
  Banner16,
  Banner17,
  Banner19,
  Banner20,
  Banner21,
  Banner23,
  variants,
};
 


