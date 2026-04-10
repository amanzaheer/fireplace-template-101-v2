import React from 'react'
import { Check } from 'lucide-react';
const Promotion7 = () => {
  return (
    <div>
      <section className="bg-gray-50 py-16 px-4">
      <h2 className="text-center text-4xl font-bold font-poppins text-slate-800 mb-12">
        Monthly Promotions
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: System Sanitization */}
        <div className="bg-white rounded-t-3xl shadow-lg overflow-hidden flex flex-col border border-gray-500">
          <div className="bg-black text-white p-8 text-center">
            <p className="text-sm font-barlow  tracking-wide font-Montserrat mb-2">Full Chimney Cleaning</p>
            <h3 className="text-3xl font-Montserrat font-semibold">System Sanitization</h3>
            <p className="text-[16px] font-barlow mt-4 font-Montserrat leading-relaxed">
              Posuere nulla ut feugiat odio neque duis vulputate eget scelerisque. Eleifend.
            </p>
          </div>
          <div className="p-8 flex-grow font-Montserrat ">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-black  font-barlow">
                <span className="text-[#D90209] flex items-center justify-center font-black border-2 border-[#D90209] rounded-full w-7 h-7 text-[20px]">    <Check  size={15}           
               strokeWidth={4}/> </span>
                60 Minutes Consultation
              </li>
              <li className="flex items-center gap-3 text-black font-barlow">
                <span className="text-[#D90209] flex items-center font-black justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                2 Bedroom Cleaning
              </li>
              <li className="flex items-center gap-3  text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                3 Bathroom Cleaning
              </li>
              <li className="flex items-center gap-3  text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                1 Living Room Cleaning
              </li>
              <li className="flex items-center gap-3  text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                7 Days Guarantee
              </li>
            </ul>
          </div>
          <button className="w-full bg-[#D90209] text-[30px] hover:bg-red-700 text-white py-2 font-Montserrat font-semibold uppercase tracking-widest transition-all">
            Call Us Today
          </button>
        </div>

        {/* Card 2: Full Inspection */}
        <div className=" rounded-t-3xl shadow-lg overflow-hidden flex flex-col border border-gray-500">
          <div className="bg-black text-white p-8 text-center">
            <p className="text-sm font-Montserrat   tracking-wide mb-2">Full Chimney Cleaning</p>
            <h3 className="text-3xl font-Montserrat font-semibold">Full Inspection</h3>
            <p className="text-[16px] font-barlow mt-4 font-Montserrat leading-relaxed">
              Posuere nulla ut feugiat odio neque duis vulputate eget scelerisque. Eleifend.
            </p>
          </div>
          <div className="p-8 flex-grow font-Montserrat">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                60 Minutes Consultation
              </li>
              <li className="flex items-center gap-3 text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                2 Bedroom Cleaning
              </li>
              <li className="flex items-center gap-3 text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                3 Bathroom Cleaning
              </li>
              <li className="flex items-center gap-3 text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                1 Living Room Cleaning
              </li>
              <li className="flex items-center gap-3 text-black font-barlow">
                <span className="text-[#D90209] flex items-center justify-center border-2 border-[#D90209] rounded-full w-7 h-7 text-[15px]"><Check  size={15}           
               strokeWidth={4}/></span>
                7 Days Guarantee
              </li>
            </ul>
          </div>
          <button className="w-full bg-[#D90209] hover:bg-red-700 text-[30px] text-white py-2 font-Montserrat font-semibold uppercase tracking-widest transition-all">
            Call Us Today
          </button>
        </div>

      </div>
    </section>
    </div>
  )
}

export default Promotion7
