/**
 * Navbar section: multiple designs, one export.
 * variant comes from domain config (SectionLayout); fallback for standalone use.
 */
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Navbar3 from './Navbar3';
import Navbar4 from './Navbar4';
import Navbar6 from './Navbar6';
import Navbar8 from './Navbar8';
const variants = {
  Navbar1,
  Navbar2,
  Navbar3,
  Navbar4,
  Navbar6,  
  Navbar8,
  };

export default function Navbar({ variant, content }) {
  const name = variant ?? "Navbar8";
  const Component = variants[name] ?? Navbar8;
  return <Component content={content} />;
}
export { Navbar1, Navbar2, Navbar3, Navbar4, Navbar6, Navbar8, variants };
