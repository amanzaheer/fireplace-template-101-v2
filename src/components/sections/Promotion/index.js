/**
 * Promotion section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import Promotion1 from "./Promotion1";
import Promotion2 from "./Promotion2";
import Promotion3 from "./Promotion3";
import Promotion4 from "./Promotion4";

const variants = {
  Promotion1,
  Promotion2,
  Promotion3,
  Promotion4,
};

export default function Promotion({ variant, content }) {
  const name = variant ?? "Promotion1";
  const Component = variants[name] ?? Promotion1;
  return <Component content={content} />;
}
export { Promotion1, Promotion2, Promotion3, Promotion4, variants };
