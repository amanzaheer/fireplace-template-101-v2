/**
 * BeforeAfter section: multiple designs, one export.
 */
import BeforeAfter1 from "./BeforeAfter1";
import BeforeAfter2 from "./BeforeAfter2";
import BeforeAfter3 from "./BeforeAfter3";
import BeforeAfter4 from "./BeforeAfter4";
import BeforeAfter6 from "./BeforeAfter6";
const variants = {
  BeforeAfter1,
  BeforeAfter2,
  BeforeAfter3,
  BeforeAfter4,
  BeforeAfter6,
};

export default function BeforeAfter({ variant, content }) {
  const name = variant ?? "BeforeAfter1";
  const Component = variants[name] ?? BeforeAfter1;
  return <Component content={content} />;
}
export { BeforeAfter1, BeforeAfter2, BeforeAfter3, BeforeAfter4, BeforeAfter6, variants };
