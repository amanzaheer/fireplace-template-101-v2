import WorkPortfolio16 from "./WorkPortfolio16";

const variants = {
  WorkPortfolio16,
};

export default function WorkPortfolio({ variant, content }) {
  const name = variant ?? "WorkPortfolio16";
  const Component = variants[name] ?? WorkPortfolio16;
  return <Component content={content} />;
}

export { WorkPortfolio16, variants };
  //this is work portfolio section