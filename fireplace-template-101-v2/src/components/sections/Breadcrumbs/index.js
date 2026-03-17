/**
 * Breadcrumbs section: multiple designs, one export.
 */
import Breadcrumbs1 from "./Breadcrumbs1";

const variants = {
  Breadcrumbs1,
};

export default function BreadcrumbsSection({ variant, content }) {
  const name = variant ?? "Breadcrumbs1";
  const Component = variants[name] ?? Breadcrumbs1;
  return <Component content={content} />;
}
export { Breadcrumbs1, variants };
