/**
 * FAQs section variants (FAQs1–3: interactive accordion; FAQs6: static UI rows).
 */
import FAQs1 from "./FAQs1";
import FAQs2 from "./FAQs2";
import FAQs3 from "./FAQs3";
import FAQs6 from "./FAQs6";
import FAQs4 from "./FAQs4";
import FAQs5 from "./FAQs5";
import FAQs7 from "./FAQs7";
import FAQs8 from "./FAQs8";
const variants = {
  FAQs1,
  FAQs2,
  FAQs3,
  FAQs6,
  FAQs4,
  FAQs5,
  FAQs7,
  FAQs8,
};

export default function FAQs({ variant, content }) {
  const name = variant ?? "FAQs1";
  const Component = variants[name] ?? FAQs1;
  return <Component content={content} />;
}
export { FAQs1, FAQs2, FAQs3, FAQs4,FAQs5,FAQs7,FAQs8,FAQs6, variants };
