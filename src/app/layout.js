import { headers } from "next/headers";
import { Barlow, Montserrat } from "next/font/google";
import Script from "next/script";
import { getPageData } from "@/lib/page-data";
import Toaster from "@/components/common/Toaster";
import "@/lib/env";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-barlow",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    template: "%s",
    default: "Professional Services",
  },
  description: "Professional, reliable services from experienced local technicians.",
};

function isRealGtmId(value) {
  return (
    value &&
    typeof value === "string" &&
    /^GTM-[A-Z0-9]+$/.test(value)
  );
}

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const { domainData } =
    (await getPageData(host, undefined, { domainDataOnly: true })) || {};
  const GTM_ID = isRealGtmId(domainData?.gtm_id) ? domainData.gtm_id : "";
  const themeColor = domainData?.theme_color ?? "#1A2956";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${barlow.variable} ${montserrat.variable} ${barlow.className} antialiased`}
        style={{ ["--theme-color"]: themeColor }}
        suppressHydrationWarning
      >
        {GTM_ID && (
          <>
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="GTM"
              />
            </noscript>
          </>
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
