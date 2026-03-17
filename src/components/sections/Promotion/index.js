/**
 * Promotion section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import Promotion1 from "./Promotion1";

const variants = {
  Promotion1,
};

export default function Promotion({ variant, content }) {
  const name = variant ?? "Promotion1";
  const Component = variants[name] ?? Promotion1;
  return <Component content={content} />;
}
export { Promotion1, variants };
