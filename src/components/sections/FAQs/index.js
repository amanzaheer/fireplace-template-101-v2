/**
 * FAQs section: accordion of questions and answers.
 */
import FAQs1 from "./FAQs1";
import FAQs2 from "./FAQs2";
import FAQs3 from "./FAQs3";
import FAQs4 from "./FAQs4";
import FAQs5 from "./FAQs5";
import FAQs6 from "./FAQs6";
import FAQs7 from "./FAQs7";
import FAQs8 from "./FAQs8";
import FAQs9 from "./FAQs9";
import FAQs14 from "./FAQs14";
import FAQs15 from "./FAQs15";
import FAQs12 from "./FAQs12";
const variants = {
  FAQs1,
  FAQs2,
  FAQs3,
  FAQs4,
  FAQs5,
  FAQs6,
  FAQs7,
  FAQs8,
  FAQs9,
  FAQs14,
  FAQs15,
  FAQs12,
    };

export default function FAQs({ variant, content }) {
  const name = variant ?? "FAQs14";
  const Component = variants[name] ?? FAQs14;
  return <Component content={content} />;
}
export { FAQs1, FAQs2, FAQs3, FAQs4, FAQs5, FAQs6, FAQs8, FAQs9, FAQs14, FAQs15, FAQs12, variants };
