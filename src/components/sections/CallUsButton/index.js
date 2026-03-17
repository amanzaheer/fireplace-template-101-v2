/**
 * About section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import CallButton1 from "./CallButton1";

const variants = {
    CallButton1,
};

export default function About({ variant, content }) {
  const name = variant ?? "CallButton1";
  const Component = variants[name] ?? CallButton1;
  return <Component content={content} />;
}
export { CallButton1, variants };
