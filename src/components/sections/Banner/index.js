/**
 * Banner section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import Banner4 from './Banner4';
import Banner6 from './Banner6';
import Banner5 from './Banner5';
import Banner8 from './Banner8';
import Banner14 from './Banner14';
import Banner7 from './Banner7';
import Banner9 from './Banner9';
import Banner11 from './Banner11';
import Banner15 from './Banner15';

const variants = {
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner6,
  Banner5,
  Banner7,
  Banner8,
  Banner9,
  Banner14,
  Banner15,
  Banner11,
};

export default function Banner({ variant, content }) {
  const name = String(variant ?? '').trim() || 'Banner14';
  const Component = variants[name] ?? Banner14;
  return <Component content={content} />;
}
export { Banner1, Banner2, Banner3, Banner4, Banner5, Banner6, Banner7, Banner8, Banner9, Banner14, Banner15, Banner11, variants };



