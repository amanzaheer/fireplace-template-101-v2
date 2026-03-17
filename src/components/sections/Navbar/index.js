/**
 * Navbar section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
import Navbar1 from './Navbar1';

const variants = {
  Navbar1,
};

export default function Navbar({ variant, content }) {
  const name = variant ?? "Navbar1";
  const Component = variants[name] ?? Navbar1;
  return <Component content={content} />;
}
export { Navbar1, variants };
