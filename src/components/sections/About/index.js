/*
 * About section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import About1 from "./About1";
import About2 from "./About2";
import About3 from "./About3";
import About4 from "./About4";
import About5 from "./About5";
import About6 from "./About6";
import About7 from "./About7";
import About8 from "./About8";
import About9 from "./About9";
import About14 from "./About14";

const variants = {
  About1,
  About2,
  About3,
  About4,
  About5,
  About6,
  About7,
  About8,
  About9,
  About14,
};

export default function About({ variant, content }) {
  const name = String(variant ?? "").trim() || "About14";
  const Component = variants[name] ?? About14;
  return <Component content={content} />;
}
export { About1, About2, About3, About4, About5, About6, About7, About8, About9, About14, variants };
