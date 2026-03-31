/**
 * Banner section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import Banner4 from './Banner4';
import Banner6 from './Banner6';
import Banner8 from './Banner8';
import Banner5 from './Banner5';

const variants = {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner6,
  Banner8,
  Banner5,
};

export default function Banner({ variant, content }) {
  const name = String(variant ?? '').trim() || 'Banner5';
  const Component = variants[name] ?? Banner5;
  return <Component content={content} />;
}
export { Banner1, Banner2, Banner3, Banner4, Banner6, Banner8, Banner5, variants };
