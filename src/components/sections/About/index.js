/**
 * About section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import About1 from "./About1";
import About2 from "./About2";
import About3 from "./About3";
import About6 from "./About6";

const variants = {
  About1,
  About2,
  About3,
  About6,
};

export default function About({ variant, content }) {
  const name = variant ?? "About1";
  const Component = variants[name] ?? About1;
  return <Component content={content} />;
}
export { About1, About2, About3, About6, variants };
