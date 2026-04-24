  import Testimonials1 from "./Testimonials1";
  import Testimonials2 from "./Testimonials2";
  import Testimonials3 from "./Testimonials3";
  import Testimonials4 from "./Testimonials4";
  import Testimonials6 from "./Testimonials6";
  import Testimonials8 from "./Testimonials8";
  import Testimonials5 from "./Testimonials5";
  import Testimonials10 from "./Testimonials10";
  import Testimonials7 from "./Testimonials7";
  import Testimonials9 from "./Testimonials9";
  import Testimonials14 from "./Testimonials14";
  import Testimonials15 from "./Testimonials15";
  import Testimonials16 from "./Testimonials16";


  const variants = {
    Testimonials1,
    Testimonials2,
    Testimonials3,
    Testimonials4,
    Testimonials6,
    Testimonials8,
    Testimonials5,
    Testimonials7,
    Testimonials10,
    Testimonials9,
    Testimonials14,
    Testimonials15,
    Testimonials16,
  };export default function Testimonials({ variant, content }) {
      const name = String(variant ?? '').trim() || 'Testimonials16';
    const Component = variants[name] ?? Testimonials16;
    return <Component content={content} />;
  }

  export {
    Testimonials1,
    Testimonials2,
    Testimonials3,
    Testimonials4,
    Testimonials6,
    Testimonials8,
    Testimonials5,
    Testimonials7,
    Testimonials10,
    Testimonials9,
    Testimonials14,
    Testimonials15,
    Testimonials16,
    variants,
  };
