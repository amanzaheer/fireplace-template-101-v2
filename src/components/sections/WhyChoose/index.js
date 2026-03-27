/**
 * WhyChoose section: multiple designs, one export.
 */
import WhyChoose1 from "./WhyChoose1";
import WhyChoose2 from "./WhyChoose2";
import WhyChoose3 from "./WhyChoose3";
import WhyChoose6 from "./WhyChoose6";
const variants = {
  WhyChoose1,
  WhyChoose2,
  WhyChoose3,
  WhyChoose6,
  };

export default function WhyChoose({ variant, content }) {
  const name = variant ?? "WhyChoose1";
  const Component = variants[name] ?? WhyChoose1;
  return <Component content={content} />;
}
export { WhyChoose1, WhyChoose2, WhyChoose3, WhyChoose6, variants };
