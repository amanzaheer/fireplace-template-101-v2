"use client";
/*
 * Slogan section: multiple designs, one export.
 */
import Slogan1 from "./Slogan1";
import Slogan2 from "./Slogan2";
import Slogan3 from "./Slogan3";
import Slogan4 from "./Slogan4";
import Slogan5 from "./Slogan5";
import Slogan6 from "./Slogan6";
import Slogan7 from "./Slogan7";
import Slogan8 from "./Slogan8";
import Slogan9 from "./Slogan9";
import Slogan15 from "./Slogan15";
import Slogan11 from "./Slogan11";
import Slogan12 from "./Slogan12";
import Slogan13 from "./Slogan13";
import Slogan14 from "./Slogan14";
import Slogan10 from "./Slogan10";
import Slogan16 from "./Slogan16";
import Slogan17 from "./Slogan17";
import Slogan18 from "./Slogan18";
import Slogan19 from "./Slogan19";
import Slogan21 from "./Slogan21";
import Slogan33 from "./Slogan33";
const variants = {
  Slogan1,
  Slogan2,
  Slogan3,
  Slogan4,
  Slogan5,
  Slogan6,
  Slogan7,
  Slogan8,
  Slogan9,
  Slogan10,
  Slogan11,
  Slogan12,
  Slogan13,
  Slogan14,
  Slogan15,
  Slogan16,
  Slogan17,
  Slogan18,
  Slogan19,
  Slogan21,
  Slogan33,
};

export default function Slogan({ variant, content }) {
  const name = String(variant ?? "").trim() || "Slogan21";
  const Component = variants[name] ?? Slogan21;
  return <Component content={content} />;
}
export { Slogan1, Slogan2, Slogan3, Slogan4, Slogan6, Slogan5, Slogan8, Slogan7, Slogan9, Slogan15, Slogan11, Slogan12, Slogan14, Slogan10, Slogan13, Slogan17, Slogan18, Slogan19, Slogan21, Slogan33, variants };
