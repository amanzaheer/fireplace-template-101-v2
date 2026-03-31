/**
 * FAQs section: accordion of questions and answers.
 */
import FAQs1 from "./FAQs1";
import FAQs2 from "./FAQs2";
import FAQs3 from "./FAQs3";
import FAQs4 from "./FAQs4";
import FAQs8 from "./FAQs8";
const variants = {
  FAQs1,
  FAQs2,
  FAQs3,
  FAQs4,
  FAQs8,
};

export default function FAQs({ variant, content }) {
        const name = variant ?? "FAQs8";
  const Component = variants[name] ?? FAQs8;
  return <Component content={content} />;
}
export { FAQs1, FAQs2, FAQs3, FAQs4, FAQs8, variants };
