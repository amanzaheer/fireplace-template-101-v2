import Videosection13 from "./Videosection13";

const variants = {
  Videosection13,
};

export default function Videosection({ variant, content }) {
  const name = variant ?? "Videosection13";
  const Component = variants[name] ?? Videosection13;
  return <Component content={content} />;
}
export { Videosection13,variants };