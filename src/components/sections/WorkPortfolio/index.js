import WorkPortfolio16 from "./WorkPortfolio16";
import WorkPortfolio23 from "./WorkPortfolio23";  
const variants = {
  WorkPortfolio16,
  WorkPortfolio23,
};

export default function WorkPortfolio({ variant, content }) {
  const name = variant ?? "WorkPortfolio23";
  const Component = variants[name] ?? WorkPortfolio23;
  return <Component content={content} />;
}

export { WorkPortfolio16, WorkPortfolio23, variants };
  //this is work portfolio section