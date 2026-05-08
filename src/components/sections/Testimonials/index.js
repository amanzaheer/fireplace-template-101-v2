  import Testimonials1 from "./Testimonials1";
  import Testimonials2 from "./Testimonials2";
  import Testimonials3 from "./Testimonials3";
  import Testimonials4 from "./Testimonials4";
  import Testimonials6 from "./Testimonials6";
  import Testimonials8 from "./Testimonials8";
  import Testimonials5 from "./Testimonials5";
  import Testimonials10 from "./Testimonials10";
  import Testimonials11 from "./Testimonials11";
  import Testimonials12 from "./Testimonials12";
  import Testimonials13 from "./Testimonials13";
  import Testimonials7 from "./Testimonials7";
  import Testimonials9 from "./Testimonials9";
  import Testimonials14 from "./Testimonials14";
  import Testimonials15 from "./Testimonials15";
  import Testimonials16 from "./Testimonials16";
  import Testimonials17 from "./Testimonials17"
  import Testimonials18 from "./Testimonials18";


const variants = {
  Testimonials1,
  Testimonials2,
  Testimonials3,
  Testimonials4,
  Testimonials6,
  Testimonials7,
  Testimonials8,
  Testimonials9,
  Testimonials5,
  Testimonials10,
  Testimonials11,
  Testimonials12,
  Testimonials13,
  Testimonials14,
  Testimonials15,
  Testimonials16,
  Testimonials17,
  Testimonials18,
};
  

function pickVariant(name) {
  const key = String(name ?? "").trim();
  const C = variants[key] ?? Testimonials5;
  return typeof C === "function" ? C : Testimonials5;
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
    Testimonials11,
    Testimonials12,
    Testimonials13,
    Testimonials9,
    Testimonials14,
    Testimonials15,
    Testimonials16,
    Testimonials17,
    Testimonials18,
    variants,
  };
