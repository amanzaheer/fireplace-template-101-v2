/**
 * Contact section: quote form and contact form.
 */
import Contact1 from "./Contact1";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Contact4 from "./Contact4";
import Contact5 from "./Contact5";
import Contact7 from "./Contact7";
import Contact9 from "./Contact9";
import Contact14 from "./Contact14";
import Contact15 from "./Contact15";
import Contact11 from "./Contact11";
import Contact6 from "./Contact6";
import Contact8 from "./Contact8";
import Contact12 from "./Contact12";
const variants = {
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact5,
  Contact6,
  Contact7,
  Contact8,
  Contact9,
  Contact14,
  Contact15,
  Contact11,
  Contact12,
};

export default function Contact({ variant, content }) {
  const name = variant ?? "Contact14";
  const Component = variants[name] ?? Contact14 ;
  return <Component content={content} />;
}
export { Contact1, Contact2, Contact3, Contact4, Contact5, Contact6, Contact7, Contact8, Contact9, Contact14, Contact15, Contact11, variants };

