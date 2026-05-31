import FullContainer from "@/components/common/FullContainer";

import Container from "@/components/common/Container";

import { Poppins } from "next/font/google";



const poppins = Poppins({

    subsets: ["latin"],

    weight: ["400", "500", "600", "700", "800"],

});



export default function Cta23({ content }) {

    const section = content?.cta ?? {};

    const heading = section?.heading ?? section?.title ?? "";



    const description = section?.description ?? "";

    const phone = section?.cta_phone ?? section?.phone ?? "";

    const phoneLabel = section?.phone_label ?? phone ?? "";

    const phoneCaption =

        section?.phone_caption ?? section?.phone_label_top ?? "CALL US TODAY";

    const phoneHref = phone ? `tel:${phone}` : "#";



    return (

        <FullContainer

            id="call_to_action"

            className={`bg-white py-12  md:py-16 ${poppins.className}`}

        >

            <Container>

                <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 text-center text-black md:px-8">

                    {heading ? (

                        <h2 className="text-[26px] font-bold leading-[1.15] md:text-[40px] md:leading-[1.1]">

                            {heading}

                        </h2>

                    ) : null}



                    {description ? (

                        <p className="mt-6 max-w-[640px] text-[15px] font-normal leading-normal text-black md:mt-8 md:text-[18px] md:leading-[1.45]">

                            {description}

                        </p>

                    ) : null}



                    {phoneLabel ? (
                        <a
                            href={phoneHref}
                            className="mt-8 inline-flex w-[258px] h-[73.33px] flex-col items-center justify-center rounded-[40px] bg-[#CC3333] px-[1.36px] py-[2.72px] text-white transition-opacity hover:opacity-95 md:mt-10"
                        >

                            <span className={`allign-self:stretch text-align-center font-[21.726px] style-normal ${poppins.className}`}>
                                {phoneCaption}
                            </span>
                            <span className={`text-[fff] text-allign:center font-bold leadig-normal text-[27.252px] style-normal ${poppins.className}`}>
                                {phoneLabel}
                            </span>
                        </a>
                    ) : null}

                </div>

            </Container>

        </FullContainer>

    );

}


