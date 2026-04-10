'use client'
import React from 'react'
import { ShieldCheck, PhoneCall } from 'lucide-react';

const Banner10 = () => {
  return (
    <div>
      <section className="relative w-full min-h-[700px] lg:h-[750px] bg-cover bg-[center_left_-200px] md:bg-center bg-no-repeat " style={{ backgroundImage: "url('/st-icons/Temp2/1.jpg')" }}>
        <div className="absolute inset-0 bg-black/10"></div>

        {/* --- ADD 'lg:flex-row' AND 'justify-between' TO THIS DIV --- */}
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 lg:px-[170px] pt-20 pb-10 flex flex-col lg:flex-row items-center justify-between gap-10 h-full">
          
          {/* LEFT SIDE WRAPPER (Everything you already wrote goes here) */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-2 border-2 border-black rounded-full px-4 py-1 bg-transparent bg-[#FFFFFF5E] w-fit ">
              <span className="text-[#FFC117] text-[30px]">•</span>
              <span className="text-[14px] font-medium font-poppins">Let's Call Connect</span>
            </div>

            <h1 className="text-[35px] lg:text-[55px] font-poppins font-black leading-tight max-w-[600px]">
              TRUSTED EXPERTS <br /> 
              <span className="text-[#D90209]">IN CHIMNEY SERVICES</span>
            </h1>

            <div className="grid grid-cols-2 gap-y-2 mt-6 max-w-[500px]">
              <div className="flex items-center gap-2"> <ShieldCheck /> Chimney Sweep & Repair</div>
              <div className="flex items-center gap-2"> <ShieldCheck /> Chimney Sweep & Repair</div>
              <div className="flex items-center gap-2"> <ShieldCheck /> Chimney Sweep & Repair</div>
              <div className="flex items-center gap-2"> <ShieldCheck /> Chimney Sweep & Repair</div>
              <div className="flex items-center gap-2"> <ShieldCheck /> Chimney Sweep & Repair</div>
            </div>

            <div className="flex flex-col font-poppins md:flex-row sm:items-center mt-7 gap-5 p-4">
              <button className=" px-4 py-2   text-[17px] md:text-[25px] rounded-full border-2 border-black h-fit">
                connect call
              </button>
              <div className="flex items-center gap-4">
                <button className="w-14 h-14 bg-[#EFA536] rounded-full flex items-center justify-center">
                  <PhoneCall />
                </button>
                <div>
                  <p className="text-sm">Need Help?</p>
                  <h3 className="font-bold text-lg">(+480) 123 678 900</h3>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: INSERT YOUR FORM CODE HERE --- */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-white rounded-[20px] shadow-2xl overflow-hidden w-full border-[6px] border-gray-100/50">
  
  {/* RED HEADER */}
  <div className="bg-[#D90209] font-poppins text-white text-center py-3 px-2 w-full">
    <h3 className="text-[25px] md:text-[41px]  font-bold uppercase tracking-wide">Call Us Now</h3>
    <p className="text-[25px] md:text-[52px] font-black leading-none mt-1">(123)-456-7890</p>
  </div>

  {/* FORM FIELDS */}
  <div className="p-6 bg-[#DEDEDE] space-y-4 font-poppins">
    <input 
      type="text" 
      placeholder="Name" 
      className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-red-500" 
    />
    <input 
      type="text" 
      placeholder="Phone" 
      className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-red-500" 
    />
    <input 
      type="email" 
      placeholder="Email" 
      className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-red-500" 
    />
    <textarea 
      placeholder="Message" 
      rows="3" 
      className="w-full p-4 rounded-lg bg-white border border-gray-200 focus:outline-red-500"
    ></textarea>

    {/* SUBMIT BUTTON */}
    <button className="w-full bg-black text-white  text-[30px] md:text-[52px] font-normal uppercase hover:bg-gray-900 transition-all mt-2">
      Submit
    </button>
     </div>
     </div>
    </div>

        </div>
      </section>
    </div>
  )
}

export default Banner10