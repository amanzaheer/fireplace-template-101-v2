import CompanyProfile16 from "./CompanyProfile16";

const variants = {
  CompanyProfile16,
};

export default function CompanyProfile({ variant, content }) {
  const name = variant ?? "CompanyProfile16";
    const Component = variants[name] ?? CompanyProfile16;
  return <Component content={content} />;
}

    export { CompanyProfile16, variants };
