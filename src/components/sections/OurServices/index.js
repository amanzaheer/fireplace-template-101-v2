/**
 * OurServices section: multiple designs, one export.
 */
import OurServices1 from "./OurServices1";
import OurServices2 from "./OurServices2";
import OurServices3 from "./OurServices3";
import OurServices4 from "./OurServices4";
import OurServices6 from "./OurServices6";
import OurServices8 from "./OurServices8";
import OurServices5 from "./OurServices5";
import OurServices7 from "./OurServices7";
import OurServices9 from "./OurServices9";
import OurServices14 from "./OurServices14";
const variants = {
  OurServices1,
  OurServices2,
  OurServices3,
  OurServices4,
  OurServices6,
  OurServices8,
  OurServices5,
  OurServices7,
  OurServices9,
  OurServices14,
};

export default function OurServices({ variant, content }) {
    const name = String(variant ?? "").trim() || "OurServices14";
  const Component = variants[name] ?? OurServices14;
  return <Component content={content} />;
}

export { OurServices1, OurServices2, OurServices3, OurServices4, OurServices6, OurServices8, OurServices5, OurServices7, OurServices9, OurServices14, variants };
