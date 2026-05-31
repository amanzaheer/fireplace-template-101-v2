"use client";



import React, { useMemo } from "react";

import Link from "next/link";

import { Poppins } from "next/font/google";



import FullContainer from "@/components/common/FullContainer";

import Container from "@/components/common/Container";



import md from "@/lib/markdown";

import { cn } from "@/lib/utils";



const poppins = Poppins({

  subsets: ["latin"],

  weight: ["400", "500", "600", "700", "800"],

});



/* =========================================================

SECTION CLASSES

========================================================= */



const sectionClasses = {

  wrapper: "bg-[#000000] py-16",



  container: "px-4 sm:px-6 lg:px-8",



  mainGrid:

    "mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-12 lg:gap-20 items-center",



  /* LEFT SIDE */

  leftSide: "max-w-[520px] mx-auto",



  title:

    "text-white text-[44px] font-bold leading-[1.1]",



  description:

    "mt-6 text-white/95 text-[16px] leading-[1.9] space-y-5",



  fifthCardWrapper:

    "mt-8 ",



  ctaButton:

    "mt-8 inline-flex flex-col items-center border justify-center bg-[#D32F2F] rounded-full px-7 py-3 text-white",



  ctaLabel:

    "text-[11px] uppercase tracking-[0.15em] font-semibold",



  ctaPhone:

    "text-[24px] font-bold leading-none mt-1",



  /* RIGHT SIDE */

  rightSide: "w-full",



  cardsGrid:

    "grid grid-cols-2 gap-5 items-center",

};



/* =========================================================

RIGHT SIDE CARD DESIGN

========================================================= */



const rightCardStyles = {

  wrapper:

    "bg-white rounded-[28px] text-center flex flex-col justify-center items-center",



  title:

    "text-[24px] leading-[1.2] font-bold text-black",



  description:

    "mt-4 text-[13px] leading-[1.6] text-black",

};



/* =========================================================

LEFT SIDE FIFTH CARD

========================================================= */



const leftCardStyles = {

  wrapper: "px-2 py-2 ",



  title:

    "text-[28px] font-bold leading-tight text-white",



  description:

    "mt-4 text-[15px] leading-[1.8] text-white/90 [&_a]:text-yellow-300 [&_p]:text-white/90",

};





function resolveServiceTag(str, title) {

  if (!str || !title) return str ?? "";



  return str.replace(/\[service\]/gi, title);

}



function markdownPreview(str) {

  if (!str) return "";



  return md.render(str);

}



function readText(value) {

  return typeof value === "string"

    ? value.trim()

    : "";

}



function telHref(phone) {

  if (!phone) return "#";



  const digits = phone.replace(/[^\d+]/g, "");



  return digits ? `tel:${digits}` : "#";

}



const MAX_DISPLAY = 5;





export default function OurServices23({

  content,

}) {

  const phone =

    readText(content?.contact_info?.phone) ||

    readText(content?.navbar?.phone) ||

    "";



  const ourServices =

    content?.our_services ?? {};



  const servicesFromNav =

    content?.services ?? [];



  const services = useMemo(() => {

    if (

      Array.isArray(ourServices?.items) &&

      ourServices.items.length > 0

    ) {

      return ourServices.items.map(

        (item, i) => {

          const title = item.title ?? "";



          return {

            id:

              item.id ??

              item.path ??

              String(i),



            title,



            path: item.path ?? "#",



            description:

              resolveServiceTag(

                item.description ?? "",

                title

              ),

          };

        }

      );

    }



    return (servicesFromNav || []).map(

      (item, i) => {

        const title = item.title ?? "";



        return {

          id:

            item.path ?? String(i),



          title,



          path: item.path ?? "#",



          description:

            resolveServiceTag(

              item.description ?? "",

              title

            ),

        };

      }

    );

  }, [ourServices, servicesFromNav]);



  const displayServices = useMemo(

    () =>

      Array.isArray(services)

        ? services.slice(0, MAX_DISPLAY)

        : [],

    [services]

  );



  if (!displayServices.length)

    return null;



  const gridCards =

    displayServices.slice(0, 4);



  const fifthCard =

    displayServices[4] ?? null;



  return (

    <FullContainer

      id="our_services"

      className={cn(

        sectionClasses.wrapper,

        poppins.className

      )}

    >

      <Container

        className={sectionClasses.container}

      >

        <div className={sectionClasses.mainGrid}>

          <div

            className={sectionClasses.rightSide}

          >

            <div

              className={

                sectionClasses.cardsGrid

              }

            >

              {gridCards.map(

                (service, index) => (

                  <ServiceCard

                    key={service.id}

                    service={service}

                    styles={{

                      ...rightCardStyles,



                      /* Figma Blueprint Structural Constraints:

                        Index 0 & 2 (Left Column): Taller stretched layout

                        Index 1 & 3 (Right Column): Shorter standard dimension

                      */

                      wrapper: cn(

                        rightCardStyles.wrapper,

                        (index === 0 || index === 2) ? "px-6 py-12 min-h-[300px]" : "px-6 py-7 min-h-[240px]"

                      ),

                    }}

                  />

                )

              )}

            </div>

          </div>



          <div

            className={sectionClasses.leftSide}

          >

            {ourServices?.title ? (

              <h2

                className={

                  sectionClasses.title

                }

              >

                {ourServices.title}

              </h2>

            ) : null}



            {/* DESCRIPTION */}

            {ourServices?.description ? (

              <div

                className={

                  sectionClasses.description

                }

                dangerouslySetInnerHTML={{

                  __html: markdownPreview(

                    ourServices.description

                  ),

                }}

              />

            ) : null}



            {fifthCard ? (

              <div

                className={

                  sectionClasses.fifthCardWrapper

                }

              >

                <ServiceCard

                  service={fifthCard}

                  styles={leftCardStyles}

                />

              </div>

            ) : null}

            

            {phone ? (

              <a

                href={telHref(phone)}

                className={

                  sectionClasses.ctaButton

                }

              >

                <span

                  className={

                    sectionClasses.ctaLabel

                  }

                >

                  CALL US TODAY

                </span>



                <span

                  className={

                    sectionClasses.ctaPhone

                  }

                >

                  {phone}

                </span>

              </a>

            ) : null}

          </div>

        </div>

      </Container>

    </FullContainer>

  );

}



/* =========================================================

CARD COMPONENT

========================================================= */



function ServiceCard({

  service,

  styles,

}) {

  const title =

    service.path &&

    service.path !== "#" ? (

      <Link

        href={service.path}

        className="hover:underline"

      >

        {service.title}

      </Link>

    ) : (

      service.title

    );



  return (

    <article

      className={cn(styles.wrapper)}

    >

      {/* TITLE */}

      {service.title ? (

        <h3 className={styles.title}>

          {title}

        </h3>

      ) : null}



      {/* DESCRIPTION */}

      {service.description ? (

        <div

          className={styles.description}

          dangerouslySetInnerHTML={{

            __html: markdownPreview(

              service.description

            ),

          }}

        />

      ) : null}

    </article>

  );

}