/**
 * BeforeAfter section: multiple designs, one export.
 */
import BeforeAfter1 from "./BeforeAfter1";

const variants = {
  BeforeAfter1,
};

export default function BeforeAfter({ variant, content }) {
  const name = variant ?? "BeforeAfter1";
  const Component = variants[name] ?? BeforeAfter1;
  return <Component content={content} />;
}
export { BeforeAfter1, variants };
