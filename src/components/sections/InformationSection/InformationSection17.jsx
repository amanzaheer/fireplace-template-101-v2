import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Navbar17CallButton from "@/components/sections/Navbar/Navbar17CallButton";

function renderTitle(title, highlightedText) {
  if (!title) return null;
  if (!highlightedText || !title.includes(highlightedText)) {
    return <span className="text-black">{title}</span>;
  }

  const [before, ...rest] = title.split(highlightedText);
  const after = rest.join(highlightedText);
  return (
    <>
      <span className="text-black">{before}</span>
      <span className="text-[#ff0504]">{highlightedText}</span>
      <span className="text-black">{after}</span>
    </>
  );
}

export default function InformationSection17({ content }) {
  const info = content?.information_section ?? {};
  const title = info.title ?? "Trusted Mobile and Safe Service";
  const highlightedText = info.highlighted_text ?? "Mobile and Safe";
  const subTitle = info.sub_title ?? "Chimney Sweep In Leander. Why Do You Need It?";
  const description = info.description ?? "";
  const phone = content?.contact_info?.phone ?? content?.navbar?.phone ?? "";

  return (
    <FullContainer id="information-section" className="bg-[#e9e9e9] py-12 md:py-16">
      <Container className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold leading-tight md:text-[36px] font-poppins">
            {renderTitle(title, highlightedText)}
          </h2>

          <h3 className="mt-8 w-full text-left text-2xl font-bold leading-tight text-black md:text-[26px] font-poppins">
            {subTitle}
          </h3>

          {description ? (
            <p className="mt-6 w-full text-left text-lg leading-[1.9] text-[#222] text-[12px] md:text-[16px] font-poppins">
              {description}
            </p>
          ) : null}

          <div className="mt-10">
            <Navbar17CallButton phone={phone} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}