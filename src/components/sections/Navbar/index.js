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
import Navbar5 from './Navbar5';
import Navbar7 from './Navbar7';
import Navbar10 from './Navbar10';
import Navbar9 from './Navbar9';
const variants = {
  Navbar1,
  Navbar2,
  Navbar3,
  Navbar4,
  Navbar5,
  Navbar6,
  Navbar7,
   Navbar10,
  Navbar8,
  Navbar9,
};
 
  

export default function Navbar({ variant, content }) {
    const name = String(variant ?? "").trim() || "Navbar9";
  const Component = variants[name] ?? Navbar9;
  return <Component content={content} />;
}
export { Navbar1, Navbar2, Navbar3, Navbar4, Navbar5, Navbar6, Navbar7, Navbar8, Navbar9, Navbar10, variants };
