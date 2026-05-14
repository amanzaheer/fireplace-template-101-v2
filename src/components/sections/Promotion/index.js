"use client";
/**
 * Promotion section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import Promotion1 from "./Promotion1";
import Promotion2 from "./Promotion2";
import Promotion3 from "./Promotion3";
import Promotion4 from "./Promotion4";
import Promotion6 from "./Promotion6";
import Promotion5 from "./Promotion5";
import Promotion7 from "./Promotion7";
import Promotion8 from "./Promotion8";
import Promotion9 from "./Promotion9";
import Promotion10 from "./Promotion10";
import Promotion14 from "./Promotion14";
import Promotion15 from "./Promotion15";
import Promotion11 from "./Promotion11";
import Promotion12 from "./Promotion12";
import Promotion13 from "./Promotion13";
import Promotion17 from "./Promotion17";
import Promotion20 from "./Promotion20";
import Promotion19 from "./Promotion19";
import Promotion21 from "./Promotion21";
import Promotion16 from "./Promotion16";
import Promotion24 from "./Promotion24";
const variants = {
  Promotion1,
  Promotion2,
  Promotion3,
  Promotion4,
  Promotion6,
  Promotion5,
  Promotion7,
  Promotion8,
  Promotion9,
  Promotion14,
  Promotion15,
  Promotion11,
  Promotion12,
  Promotion10,
  Promotion13,
  Promotion16,
  Promotion17,
  Promotion10,
  Promotion20,
  Promotion19,
  Promotion21,
  Promotion24,
};
export default function Promotion({ variant, content }) {
    const name = String(variant ?? "").trim() || "Promotion21";
  const Component = variants[name] ?? Promotion21;
  return <Component content={content} />;
}
export {
  Promotion1,
  Promotion2,
  Promotion3,
  Promotion4,
  Promotion5,
  Promotion6,
  Promotion7,
  Promotion8,
  Promotion9,
  Promotion10,
  Promotion11,
  Promotion12,
  Promotion13,
  Promotion14,
  Promotion15,
  Promotion16,
  Promotion17,
  Promotion19,
  Promotion20,
  Promotion21,
  Promotion24,
  variants,
};


