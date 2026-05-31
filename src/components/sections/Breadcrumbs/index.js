"use client";
/**
 * Breadcrumbs section: multiple designs, one export.
 */
import Breadcrumbs1 from "./Breadcrumbs1";
import Breadcrumbs2 from "./Breadcrumbs2";
import Breadcrumbs3 from "./Breadcrumbs3";
import Breadcrumbs4 from "./Breadcrumbs4";
import Breadcrumbs6 from "./Breadcrumbs6";
import Breadcrumbs7 from "./Breadcrumbs7";
import Breadcrumbs15 from "./Breadcrumbs15";
import Breadcrumbs11 from "./Breadcrumbs11";
import Breadcrumbs12 from "./Breadcrumbs12";
import Breadcrumbs10 from "./Breadcrumbs10";
import Breadcrumbs13 from "./Breadcrumbs13";
import Breadcrumbs16 from "./Breadcrumbs16";
import Breadcrumbs20 from "./Breadcrumbs20";
import Breadcrumbs19 from "./Breadcrumbs19";
import Breadcrumbs18 from "./Breadcrumbs18";

const variants = {
  Breadcrumbs1,
  Breadcrumbs2,
  Breadcrumbs3,
  Breadcrumbs4,
  Breadcrumbs6,
  Breadcrumbs7,
  Breadcrumbs15,
  Breadcrumbs11,
  Breadcrumbs12,
  Breadcrumbs10,
  Breadcrumbs13,
  Breadcrumbs16,
  Breadcrumbs20,
  Breadcrumbs19,
  Breadcrumbs18,
};

export default function BreadcrumbsSection({ variant, content }) {
  const name = variant ?? "Breadcrumbs20 ";
  const Component = variants[name] ?? Breadcrumbs20;
  return <Component content={content} />;
}
export { Breadcrumbs1, Breadcrumbs2, Breadcrumbs3, Breadcrumbs4, Breadcrumbs6, Breadcrumbs7,Breadcrumbs12,Breadcrumbs15,Breadcrumbs11,Breadcrumbs10,Breadcrumbs13, Breadcrumbs19,Breadcrumbs20,Breadcrumbs18,variants };
