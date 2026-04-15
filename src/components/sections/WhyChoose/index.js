/**
 * WhyChoose section: multiple designs, one export.
 */
import WhyChoose1 from "./WhyChoose1";
import WhyChoose2 from "./WhyChoose2";
import WhyChoose3 from "./WhyChoose3";
import WhyChoose4 from "./WhyChoose4";
import WhyChoose5 from "./WhyChoose5";
import WhyChoose6 from "./WhyChoose6";
import WhyChoose7 from "./WhyChoose7";
import WhyChoose8 from "./WhyChoose8";
import WhyChoose9 from "./WhyChoose9";
import WhyChoose14 from "./WhyChoose14";

const variants = {
  WhyChoose1,
  WhyChoose2,
  WhyChoose3,
  WhyChoose4,
  WhyChoose5,
  WhyChoose6,
  WhyChoose7,
  WhyChoose8,
  WhyChoose9,
  WhyChoose14,
};

export default function WhyChoose({ variant, content }) {
  const name = String(variant ?? "").trim() || "WhyChoose14";
  const Component = variants[name] ?? WhyChoose14;
  return <Component content={content} />;
}
export { WhyChoose1, WhyChoose2, WhyChoose3, WhyChoose4, WhyChoose6, WhyChoose8, WhyChoose5, WhyChoose7, WhyChoose9, WhyChoose14, variants };
