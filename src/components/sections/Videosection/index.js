import Videosection13 from "./Videosection13";
import Videosection22 from "./Videosection22";

const variants = {
  Videosection13,
  Videosection22,
};

export default function Videosection({ variant, content }) {
  const name = String(variant ?? "").trim() || "Videosection13";
  const Component = variants[name] ?? Videosection13;
  return <Component content={content} />;
}
export { Videosection13, Videosection22, variants };