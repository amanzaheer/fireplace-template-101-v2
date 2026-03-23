/**
 * Navbar section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';

const variants = {
  Navbar1,
  Navbar2,
};

export default function Navbar({ variant, content }) {
  const name = variant ?? "Navbar1";
  const Component = variants[name] ?? Navbar1;
  return <Component content={content} />;
}
export { Navbar1, Navbar2, variants };
