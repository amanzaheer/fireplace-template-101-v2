/**
 * MilestoneBanner section: milestone banner with image and text.
 */
import MilestoneBanner13 from "./MilestoneBanner13";


const variants = {
  MilestoneBanner13,
 
};

export default function MilestoneBanner({ variant, content }) {
  const name = variant ?? "MilestoneBanner13";
  const Component = variants[name] ?? MilestoneBanner13;
  return <Component content={content} />;
}
export { MilestoneBanner13, variants };
