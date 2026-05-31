"use client";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer5 from "./Footer5";
import Footer6 from "./Footer6";
import Footer7 from "./Footer7";
import Footer8 from "./Footer8";
import Footer9 from "./Footer9";
import Footer14 from "./Footer14";
import Footer15 from "./Footer15";
import Footer11 from "./Footer11";
import Footer12 from "./Footer12";
import Footer13 from "./Footer13";
import Footer10 from "./Footer10";
import Footer16 from "./Footer16";  
import Footer17 from "./Footer17";
import Footer19 from "./Footer19";
import Footer21 from "./Footer21";
import Footer26 from "./Footer26";
import Footer27 from "./Footer27";
import Footer28 from "./Footer28";
import Footer29 from "./Footer29";
import Footer30 from "./Footer30";
import Footer31 from "./Footer31";
import Footer18 from "./Footer18";

const variants = {
  Footer1,
  Footer2,
  Footer3,
  Footer4,
  Footer5,
  Footer6,
  Footer7,
  Footer8,
  Footer9,
  Footer15,
  Footer16,
  Footer10,
  Footer17,
  Footer11,
  Footer12,
  Footer14,
  Footer13,
  Footer19,
  Footer21,
  Footer26,
  Footer27,
  Footer28,
  Footer29,
  Footer30,
  Footer31,
  Footer18,
};


export default function Footer({ variant, content }) {
  const name = variant ?? "Footer21";
  const Component = variants[name] ?? Footer21;
  return <Component content={content} />;
}
export { Footer1, Footer2, Footer3, Footer4, Footer5, Footer6, Footer7, Footer8, Footer9, Footer14, Footer15, Footer11, Footer12, Footer10, Footer13, Footer16, Footer17, Footer19, Footer21, Footer26,Footer27, Footer28, Footer29,Footer30,Footer31, variants };


