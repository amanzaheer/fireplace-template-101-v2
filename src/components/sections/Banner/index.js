/**
 * Banner section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import Banner6 from './Banner6';

const variants = {
  Banner1,
  Banner2,
  Banner3,
  Banner6,
};

export default function Banner({ variant, content }) {
  const name = variant ?? "Banner1";
  const Component = variants[name] ?? Banner1;
  return <Component content={content} />;
}
export { Banner1, Banner2, Banner3, Banner6, variants };
