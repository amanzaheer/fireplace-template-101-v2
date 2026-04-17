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
const variants = {
  Breadcrumbs1,
  Breadcrumbs2,
  Breadcrumbs3,
  Breadcrumbs4,
  Breadcrumbs6,
  Breadcrumbs7,
  Breadcrumbs15,
  Breadcrumbs11,
};

export default function BreadcrumbsSection({ variant, content }) {
  const name = variant ?? "Breadcrumbs1";
  const Component = variants[name] ?? Breadcrumbs1;
  return <Component content={content} />;
}
export { Breadcrumbs1, Breadcrumbs2, Breadcrumbs3, Breadcrumbs4, Breadcrumbs6, Breadcrumbs7, Breadcrumbs15, Breadcrumbs11, variants };
