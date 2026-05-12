import WorkingProcess21 from "./WorkingProcess21";
const variants = {
    WorkingProcess21,
};
export { WorkingProcess21, variants };
export default function WorkingProcess2({ variant, content }) {
  const name = String(variant ?? "WorkingProcess21").trim();
  const Component = variants[name] ?? WorkingProcess21;
  return <Component content={content} />;
}