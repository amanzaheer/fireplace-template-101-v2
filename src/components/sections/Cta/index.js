import Cta14 from "./Cta14";

const variants = {
  Cta14,
};

export default function Cta({ variant, content }) {
  const name = variant ?? "Cta14";
  const Component = variants[name] ?? Cta14;
  return <Component content={content} />;
}

export { Cta14, variants };
