import WorkingProcess21 from "./WorkingProcess21";
import WorkingProcess23 from "./WorkingProcess23";
const variants = {
    WorkingProcess21,
    WorkingProcess23,
};

export default function WorkingProcess({ variant, content }) {
  const name = String(variant ?? "WorkingProcess23").trim();
  const Component = variants[name] ?? WorkingProcess23;
  return <Component content={content} />;
}
export { WorkingProcess21, WorkingProcess23, variants };
 