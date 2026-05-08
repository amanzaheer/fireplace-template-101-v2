import dynamic from "next/dynamic";

// Above-fold components loaded eagerly
import Navbar from "@/components/sections/Navbar";
import Banner from "@/components/sections/Banner";
import Header from "@/components/sections/Header";
import CompanyProfile from "@/components/sections/CompanyProfile";

// Below-fold components loaded lazily to reduce initial JS bundle
const About = dynamic(() => import("@/components/sections/About"));
const Breadcrumbs = dynamic(() => import("@/components/sections/Breadcrumbs"));
const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const FAQs = dynamic(() => import("@/components/sections/FAQs"));
const Footer = dynamic(() => import("@/components/sections/Footer"));
const Gallery = dynamic(() => import("@/components/sections/Gallery"));
const OurServices = dynamic(() => import("@/components/sections/OurServices"));
const Promotion = dynamic(() => import("@/components/sections/Promotion"));
const ServiceBenefits = dynamic(() => import("@/components/sections/ServiceBenefits"));
const ServiceCities = dynamic(() => import("@/components/sections/ServiceCities"));
const Slogan = dynamic(() => import("@/components/sections/Slogan"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const ReviewandRating = dynamic(() =>
  import("@/components/sections/ReviewandRating"),
);
const WhyChoose = dynamic(() => import("@/components/sections/WhyChoose"));
const WorkingProcess = dynamic(() => import("@/components/sections/WorkingProcess"));
const OurProcess = WorkingProcess;
const ServiceDescription = dynamic(() => import("@/components/sections/ServiceDescription"));
const ServiceDescription1Section = dynamic(() => import("@/components/sections/ServiceDescription1"));
const ServiceDescription2Section = dynamic(() => import("@/components/sections/ServiceDescription2"));
const InformationSection = dynamic(() => import("@/components/sections/InformationSection"));

const CallUsButton = dynamic(() => import("@/components/sections/CallUsButton"));
const Cta = dynamic(() => import("@/components/sections/Cta"));
const MilestoneBanner = dynamic(() =>
  import("@/components/sections/MilestoneBanner"),
);
const Videosection = dynamic(() => import("@/components/sections/Videosection"));
const TVSizes = dynamic(() => import("@/components/sections/TVSizes"));
const WorkPortfolio = dynamic(() => import("@/components/sections/WorkPortfolio"));
const PrivacyPolicy = dynamic(() => import("@/components/sections/PrivacyPolicy"));
const TermsAndConditions = dynamic(
  () => import("@/components/sections/TermsAndConditions"),
);
const sectionComponents = {
  Navbar,
  Banner,
  Breadcrumbs,
  About,
  Promotion,
  OurServices,
  OurProcess,
  WhyChoose,
  WorkingProcess,
  Slogan,
  ServiceBenefits,
  Contact,
  FAQs,
  ServiceCities,
  BeforeAfter,
  Testimonials,
  Cta,
  ReviewandRating,
  Footer,
  Header,
  ServiceDescription,
  Gallery,
  ServiceDescription1: ServiceDescription1Section,
  ServiceDescription2: ServiceDescription2Section,
  InformationSection,
  CallUsButton,
  MilestoneBanner,
  Videosection,
  workingprocess: WorkingProcess,
  PrivacyPolicy,
  TermsAndConditions,
  CompanyProfile,
  TVSizes,
  WorkPortfolio,
};

const DEFAULT_THEME_COLOR = "#1A2956";

/**
 * Renders sections in order from domain config. Pass domainConfig and content from getPageData.
 * theme_color from domainData is set on body in root layout (Tailwind primary); passed here for Navbar inline styles.
 */
export default function SectionLayout({ children, domainConfig, content }) {
  const { sections = {}, order = [] } = domainConfig ?? {};

  return (
    <>
      {order.map((key, index) => {
        if (key === "Content") {
          return <div key="Content">{children}</div>;
        }
        const section = sections[key];
        if (!section || !section.visible) return null;
        const previousVisibleKey = [...order]
          .slice(0, index)
          .reverse()
          .find((k) => sections[k]?.visible);
        const previousVisibleSection = previousVisibleKey
          ? sections[previousVisibleKey]
          : null;
        const needsBanner19OverlapCompensation =
          previousVisibleKey === "Banner" &&
          previousVisibleSection?.design === "Banner19";
        const Component = sectionComponents[key];
        if (!Component) return null;
        const variant = section.design;
        return (
          <div
            key={`${key}-${index}`}
            className={needsBanner19OverlapCompensation ? "pt-0 lg:pt-20" : ""}
          >
            <Component variant={variant} content={content} />
          </div>
        );
      })}
    </>
  );
}
