/**
 * About section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import About1 from "./About1";

const variants = {
  About1,
};

export default function About({ variant, content }) {
  const name = variant ?? "About1";
  const Component = variants[name] ?? About1;
  return <Component content={content} />;
}
export { About1, variants };
