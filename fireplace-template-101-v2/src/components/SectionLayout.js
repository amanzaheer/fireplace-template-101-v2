import dynamic from "next/dynamic";

// Above-fold components loaded eagerly
import Navbar from "@/components/sections/Navbar";
import Banner from "@/components/sections/Banner";
import Header from "@/components/sections/Header";

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
const WhyChoose = dynamic(() => import("@/components/sections/WhyChoose"));
const ServiceDescription = dynamic(() => import("@/components/sections/ServiceDescription"));
const ServiceDescription1Section = dynamic(() => import("@/components/sections/ServiceDescription1"));
const ServiceDescription2Section = dynamic(() => import("@/components/sections/ServiceDescription2"));
const CallUsButton = dynamic(() => import("@/components/sections/CallUsButton"));
const sectionComponents = {
  Navbar,
  Banner,
  Breadcrumbs,
  About,
  Promotion,
  OurServices,
  WhyChoose,
  Slogan,
  ServiceBenefits,
  Contact,
  FAQs,
  ServiceCities,
  BeforeAfter,
  Testimonials,
  Footer,
  Header,
  ServiceDescription,
  Gallery,
  ServiceDescription1: ServiceDescription1Section,
  ServiceDescription2: ServiceDescription2Section,
  CallUsButton,
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
      {order.map((key) => {
        if (key === "Content") {
          return <div key="Content">{children}</div>;
        }
        const section = sections[key];
        if (!section || !section.visible) return null;
        const Component = sectionComponents[key];
        if (!Component) return null;
        const variant = section.design;
        return (
          <Component key={key} variant={variant} content={content} />
        );
      })}
    </>
  );
}
