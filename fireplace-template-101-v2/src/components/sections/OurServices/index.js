/**
 * OurServices section: multiple designs, one export.
 */
import OurServices1 from "./OurServices1";

const variants = {
  OurServices1,
};

export default function OurServices({ variant, content }) {
  const name = variant ?? "OurServices1";
  const Component = variants[name] ?? OurServices1;
  return <Component content={content} />;
}
export { OurServices1, variants };
