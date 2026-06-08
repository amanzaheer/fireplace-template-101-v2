import CompanyProfile16 from "./CompanyProfile16";
import CompanyProfile27 from "./CompanyProfile27";

const variants = {
  CompanyProfile16,
  CompanyProfile27,
};

export default function CompanyProfile({ variant, content }) {
  const name = variant ?? "CompanyProfile16";
    const Component = variants[name] ?? CompanyProfile16;
  return <Component content={content} />;
}

    export { CompanyProfile16, CompanyProfile27, variants };
