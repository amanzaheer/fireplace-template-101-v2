import Cta22 from "./Cta22";

const variants = {
  Cta22,
};

export default function Cta2({ variant, content }) {
  const name = variant ?? "Cta22";
  const Component = variants[name] ?? Cta22;
  return <Component content={content} />;
}

export { Cta22, variants };
