/**
 * WhyChoose section: multiple designs, one export.
 */
import WhyChoose1 from "./WhyChoose1";
import WhyChoose2 from "./WhyChoose2";
import WhyChoose3 from "./WhyChoose3";
import WhyChoose4 from "./WhyChoose4";
import WhyChoose6 from "./WhyChoose6";
import WhyChoose8 from "./WhyChoose8";
const variants = {
  WhyChoose1,
  WhyChoose2,
  WhyChoose3,
  WhyChoose4,
  WhyChoose6,     
  WhyChoose8,
};

export default function WhyChoose({ variant, content }) {
  const name = variant ?? "WhyChoose8";
    const Component = variants[name] ?? WhyChoose8;
  return <Component content={content} />;
}
export { WhyChoose1, WhyChoose2, WhyChoose3, WhyChoose4, WhyChoose6, WhyChoose8, variants };
