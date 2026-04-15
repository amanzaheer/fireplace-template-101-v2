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
import Promotion14 from "./Promotion14";

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
};

export default function Promotion({ variant, content }) {
  const name = String(variant ?? "").trim() || "Promotion14";
  const Component = variants[name] ?? Promotion14;
  return <Component content={content} />;
}
export { Promotion1, Promotion2, Promotion3, Promotion4, Promotion5, Promotion6, Promotion7, Promotion8, Promotion9, Promotion14, variants };
