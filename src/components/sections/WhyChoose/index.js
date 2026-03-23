/**
 * WhyChoose section: multiple designs, one export.
 */
import WhyChoose1 from "./WhyChoose1";
import WhyChoose2 from "./WhyChoose2";
const variants = {
  WhyChoose1,
  WhyChoose2,
};

export default function WhyChoose({ variant, content }) {
  const name = variant ?? "WhyChoose1";
  const Component = variants[name] ?? WhyChoose1;
  return <Component content={content} />;
}
export { WhyChoose1, WhyChoose2, variants };
