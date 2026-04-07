/**
 * Contact section: quote form and contact form.
 */
import Contact1 from "./Contact1";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Contact4 from "./Contact4";
import Contact6 from "./Contact6";
import Contact8 from "./Contact8";
import Contact5 from "./Contact5";
import Contact9 from "./Contact9";

import Contact7 from "./Contact7";
const variants = {
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact6,
  Contact8,
  Contact5,
  Contact7,
  Contact9,
};

export default function Contact({ variant, content }) {
  const name = String(variant ?? "").trim() || "Contact5";
  const Component = variants[name] ?? Contact5;
  return <Component content={content} />;
}

export { Contact1, Contact2, Contact3, Contact4,Contact5, Contact6,Contact7,Contact8,Contact9,variants };
