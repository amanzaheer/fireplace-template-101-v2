"use client";
/**
 * OurServices section: multiple designs, one export.
 */
import OurServices1 from "./OurServices1";
import OurServices2 from "./OurServices2";
import OurServices3 from "./OurServices3";
import OurServices4 from "./OurServices4";
import OurServices5 from "./OurServices5";
import OurServices6 from "./OurServices6";
import OurServices7 from "./OurServices7";
import OurServices8 from "./OurServices8";
import OurServices9 from "./OurServices9";
import OurServices10 from "./OurServices10";
import OurServices11 from "./OurServices11";
import OurServices12 from "./OurServices12";
import OurServices13 from "./OurServices13";
import OurServices14 from "./OurServices14";
import OurServices15 from "./OurServices15";
import OurServices16 from "./OurServices16";
import OurServices17 from "./OurServices17";
import OurServices20 from "./OurServices20";
import OurServices19 from "./OurServices19";

const variants = {
  OurServices1,
  OurServices2,
  OurServices3,
  OurServices4,
  OurServices5,
  OurServices6,
  OurServices7,
  OurServices8,
  OurServices9,
  OurServices10,
  OurServices11,
  OurServices12,
  OurServices13,
  OurServices14,
  OurServices15,
  OurServices16,
  OurServices17,
  OurServices20,
  OurServices19,
};

export default function OurServices({ variant, content }) {
  const name = String(variant ?? "").trim() || "OurServices20";
  const Component = variants[name] ?? OurServices20;
  return <Component content={content} />;
}

export { OurServices1, OurServices2, OurServices3, OurServices4, OurServices6, OurServices8, OurServices5, OurServices7, OurServices9, OurServices10, OurServices11, OurServices12, OurServices13, OurServices14, OurServices15, OurServices16, OurServices17,OurServices19, OurServices20, variants };

