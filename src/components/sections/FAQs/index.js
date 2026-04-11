/**
 * FAQs section variants (FAQs1–3: interactive accordion; FAQs6: static UI rows).
 */
import FAQs1 from "./FAQs1";
import FAQs2 from "./FAQs2";
import FAQs3 from "./FAQs3";
import FAQs6 from "./FAQs6";
import FAQs4 from "./FAQs4";
import FAQs5 from "./FAQs5";
import FAQs7 from "./FaQs7";
import FAQs8 from "./FAQs8";
import FAQs10 from "./FAQs10"
import FAQs9 from "./FAQs9";

const variants = {
  FAQs1,
  FAQs2,
  FAQs3,
  FAQs6,
  FAQs4,
  FAQs5,
  FAQs6,
  FAQs7,
  FAQs8,
  FAQs10,
  FAQs9,
};

function resolveFAQsVariant(variant) {
  const raw = String(variant ?? "").trim();
  if (!raw) return FAQs9;
  if (variants[raw]) return variants[raw];
  const compact = raw.replace(/\s+/g, "").toLowerCase();
  const key = Object.keys(variants).find(
    (k) => k.replace(/\s+/g, "").toLowerCase() === compact,
  );
  return key ? variants[key] : FAQs9;
}
export { FAQs1, FAQs2, FAQs3, FAQs4, FAQs5,FAQs6,FAQs7,FAQs8,FAQs9,FAQs10, variants };
