import Footer1 from "./Footer1";
import Footer2 from "./Footer2";

const variants = { Footer1, Footer2 };

export default function Footer({ variant, content }) {
  const name = variant ?? "Footer1";
  const Component = variants[name] ?? Footer1;
  return <Component content={content} />;
}
export { Footer1, Footer2, variants };
