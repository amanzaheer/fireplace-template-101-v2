import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer5 from "./Footer5";
import Footer6 from "./Footer6";
import Footer7 from "./Footer7";
import Footer8 from "./Footer8";
import Footer9 from "./Footer9";
import Footer14 from "./Footer14";

const variants = {
  Footer1,
  Footer2,
  Footer3,
  Footer4,
  Footer5,
  Footer6,
  Footer7,
  Footer8,
  Footer9,
  Footer14,
};



export default function Footer({ variant, content }) {
  const name = variant ?? "Footer14";
  const Component = variants[name] ?? Footer14;
  return <Component content={content} />;
}
export { Footer1, Footer2, Footer3, Footer4, Footer5, Footer6, Footer7, Footer8, Footer9, Footer14, variants };
