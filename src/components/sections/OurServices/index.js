/**
 * OurServices section: multiple designs, one export.
 */
import OurServices1 from "./OurServices1";
import OurServices2 from "./OurServices2";
import OurServices3 from "./OurServices3";
import OurServices6 from "./OurServices6";
const variants = {
  OurServices1,
  OurServices2,
  OurServices3,
  OurServices6,
};

export default function OurServices({ variant, content }) {
  const name = variant ?? "OurServices1";
  const Component = variants[name] ?? OurServices1;
  return <Component content={content} />;
}
export { OurServices1, OurServices2, OurServices3, OurServices6, variants };
