/**
 * Promotion section: multiple designs, one export.
 * variant comes from domain config (SectionLayout).
 */
import Promotion1 from "./Promotion1";
import Promotion2 from "./Promotion2";
import Promotion3 from "./Promotion3";
import Promotion4 from "./Promotion4";
import Promotion6 from "./Promotion6";
import Promotion5 from "./Promotion5";
import Promotion7 from "./Promotion7";
import Promotion8 from "./Promotion8";

const variants = {
  Promotion1,
  Promotion2,
  Promotion3,
  Promotion4,
  Promotion6,
  Promotion5,
  Promotion7,

  Promotion8,
};

/** Match layouts.json design strings even if casing/spacing differs (e.g. promotion8, Promotion 8). */
function resolvePromotionComponent(variant) {
  const raw = String(variant ?? "").trim();
  if (!raw) return Promotion8;
  if (variants[raw]) return variants[raw];
  const compact = raw.replace(/\s+/g, "").toLowerCase();
  const key = Object.keys(variants).find(
    (k) => k.replace(/\s+/g, "").toLowerCase() === compact,
  );
  return key ? variants[key] : Promotion8;
}

export default function Promotion({ variant, content }) {
  const Component = resolvePromotionComponent(variant);
  return <Component content={content} />;
}

export { Promotion1, Promotion2, Promotion3, Promotion4, Promotion6, Promotion5, Promotion8, variants };
