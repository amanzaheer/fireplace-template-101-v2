import React from 'react'


const OurServices9 = () => {
  return (
    <div>
       <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* --- 1. Centered Header --- */}
        <div className="text-center mb-12">
          <p className="text-black font-poppins font-medium text-[26px]">Our Best Service</p>
          <h2 className="text-[36px] lg:text-[48px] font-poppins  text-black font-bold leading-tight">
            Our Professional <span className="text-black">Chimney Services</span>
          </h2>
        </div>

        {/* --- 2. Service Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          

          <div className="group relative overflow-hidden rounded-t-lg shadow-lg cursor-pointer bg-white">
            <div className="w-full aspect-[4/3] ">
              <img 
                src="/st-icons/Temp2/about image.png" 
                alt="Chimney Repair" 
                className="w-full h-full object-cover "
              />
            </div>
            {/* Red Title Bar at Bottom */}
            <div className="bg-[#D90209] absolute bottom-0 w-full font-poppins  text-white text-xl text-center py-6 font-medium tracking-wide rounded-t-3xl">
              Chimney Repair
            </div>
          </div>

           
           <div className="group relative overflow-hidden rounded-t-lg shadow-lg cursor-pointer bg-white">
            <div className="w-full aspect-[4/3] ">
              <img 
                src="/st-icons/Temp2/image2.png" 
                alt="Chimney Repair" 
                className="w-full h-full object-cover "
              />
            </div>
            {/* Red Title Bar at Bottom */}
            <div className="bg-[#D90209] absolute bottom-0 w-full font-poppins  text-white text-xl text-center py-6 font-medium  tracking-wide rounded-t-3xl">
              Chimney Inspection
            </div>
          </div>
           <div className="group relative overflow-hidden rounded-t-lg shadow-lg cursor-pointer bg-white">
            <div className="w-full aspect-[4/3] ">
              <img 
                src="/st-icons/Temp2/image3.png" 
                alt="Chimney Repair" 
                className="w-full h-full object-cover "
              />
            </div>
            {/* Red Title Bar at Bottom */}
            <div className="bg-[#D90209] absolute bottom-0 w-full font-poppins text-white text-xl text-center py-6 font-medium  tracking-wide rounded-t-3xl">
              Chimney Sweep/Clean
            </div>
          </div>
           <div className="group relative overflow-hidden rounded-t-lg shadow-lg cursor-pointer bg-white">
            <div className="w-full aspect-[4/3] ">
              <img 
                src="/st-icons/Temp2/image4.png" 
                alt="Chimney Repair" 
                className="w-full h-full object-cover "
              />
            </div>
            {/* Red Title Bar at Bottom */}
            <div className="bg-[#D90209] absolute bottom-0 w-full font-poppins  text-white text-xl text-center py-6 font-medium  tracking-wide rounded-t-3xl">
              Chimney Crown
            </div>
          </div>
           <div className="group relative overflow-hidden rounded-t-lg shadow-lg cursor-pointer bg-white">
            <div className="w-full aspect-[4/3] ">
              <img 
                src="/st-icons/Temp2/image5.png" 
                alt="Chimney Repair" 
                className="w-full h-full object-cover "
              />
            </div>
            {/* Red Title Bar at Bottom */}
            <div className="bg-[#D90209] absolute bottom-0 w-full font-poppins  text-white text-xl text-center py-6 font-medium  tracking-wide rounded-t-3xl">
              Chimney cap
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-t-lg shadow-lg cursor-pointer bg-white">
            <div className="w-full aspect-[4/3] ">
              <img 
                src="/st-icons/Temp2/image6.png" 
                alt="Chimney Repair" 
                className="w-full h-full object-cover "
              />
            </div>
            {/* Red Title Bar at Bottom */}
            <div className="bg-[#D90209] absolute bottom-0 w-full font-poppins text-white text-xl text-center py-6 font-medium  tracking-wide rounded-t-3xl">
             Chimney Inspection
            </div>
          </div>
        </div>   
      </div>
    </section>
    </div>
  )
}

export default OurServices9
