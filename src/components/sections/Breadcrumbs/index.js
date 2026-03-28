/**
 * Breadcrumbs section: multiple designs, one export.
 */
import Breadcrumbs1 from "./Breadcrumbs1";
import Breadcrumbs2 from "./Breadcrumbs2";
import Breadcrumbs3 from "./Breadcrumbs3";
import Breadcrumbs4 from "./Breadcrumbs4";
const variants = {
  Breadcrumbs1,
  Breadcrumbs2,
  Breadcrumbs3,
  Breadcrumbs4,
};

export default function BreadcrumbsSection({ variant, content }) {
  const name = variant ?? "Breadcrumbs1";
  const Component = variants[name] ?? Breadcrumbs1;
  return <Component content={content} />;
}
export { Breadcrumbs1, Breadcrumbs2, Breadcrumbs3,Breadcrumbs4, variants };
