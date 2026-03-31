import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer8 from "./Footer8";
import Footer5 from "./Footer5";
const variants = { Footer1, Footer2, Footer3, Footer4, Footer8, Footer5 };

export default function Footer({ variant, content }) {
      const name = variant ?? "Footer5";
  const Component = variants[name] ?? Footer5;
  return <Component content={content} />;
}
  export { Footer1, Footer2, Footer3, Footer4, Footer8, Footer5, variants };
