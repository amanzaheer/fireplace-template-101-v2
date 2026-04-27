/**
 * CallButton section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import CallButton1 from "./CallButton1";
import CallButton3 from "./CallButton3";
import CallButton8 from "./CallButton8";
import CallButton6 from "./CallButton6";

const variants = {
    CallButton1,
    CallButton3,
    CallButton8,
    CallButton6,
  };

export default function CallButton({ variant, content }) {
  const name = variant ?? "CallButton8";
  const Component = variants[name] ?? CallButton1;
  return <Component content={content} />;
}
export { CallButton1, CallButton3, CallButton8, CallButton6,variants };
