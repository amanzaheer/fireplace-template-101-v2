"use client";
/**
 * Gallery section: multiple designs, one export.
 */

import Gallery1 from "./Gallery1";
import Gallery2 from "./Gallery2";
import Gallery3 from "./Gallery3";
import Gallery4 from "./Gallery4";
import Gallery5 from "./Gallery5";
import Gallery6 from "./Gallery6";
import Gallery7 from "./Gallery7";
import Gallery8 from "./Gallery8";
import Gallery9 from "./Gallery9";
import Gallery10 from "./Gallery10";
import Gallery11 from "./Gallery11";
import Gallery12 from "./Gallery12";
import Gallery13 from "./Gallery13";
import Gallery14 from "./Gallery14";
import Gallery15 from "./Gallery15";
import Gallery16 from "./Gallery16";
import Gallery17 from "./Gallery17";
import Gallery18 from "./Gallery18";
import Gallery19 from "./Gallery19";
import Gallery20 from "./Gallery20";
import Gallery21 from "./Gallery21";
import Gallery26 from "./Gallery26";
import Gallery27 from "./Gallery27";

const variants = {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery7,
  Gallery8,
  Gallery9,
  Gallery10,
  Gallery11,
  Gallery12,
  Gallery13,
  Gallery14,
  Gallery15,
  Gallery16,
  Gallery17,
  Gallery20,
  Gallery19,
  Gallery21,
  Gallery26,
  Gallery18,
  Gallery27,
};

export default function Gallery({ variant, content }) {
  const name = variant ?? "Gallery26";
  const Component = variants[name] ?? Gallery26;
  return <Component content={content} />;
}

export {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery8,
  Gallery7,
  Gallery9,
  Gallery10,
  Gallery11,
  Gallery12,
  Gallery13,
  Gallery14,
  Gallery15,
  Gallery16,
  Gallery17,
  Gallery19,
  Gallery20,
  Gallery21,
  Gallery26,
  Gallery18,
  variants,
};
