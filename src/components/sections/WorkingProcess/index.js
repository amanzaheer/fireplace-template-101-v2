/**
 * WhyChoose section: multiple designs, one export.
 */

import WorkingProcess1 from "./WorkingProcess1";
import WorkingProcess20 from "./WorkingProcess20";
const variants = {
  WorkingProcess1,
  WorkingProcess20,
  
};

export default function WorkingProcess({ variant, content }) {
  const name = String(variant ?? "").trim() || "WorkingProcess20";
  const Component = variants[name] ?? WorkingProcess20;
  return <Component content={content} />;
}
export { WorkingProcess1, WorkingProcess20,   variants };
