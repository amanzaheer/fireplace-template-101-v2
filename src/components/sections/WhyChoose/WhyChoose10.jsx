import React from 'react'
import { Phone, Check } from 'lucide-react';
const WhyChoose9 = () => {
  return (
    <section className="bg-white  py-12 px-4 md:px-20 ">
      <div className="w-full mx-auto bg-[#0f1115] text-white px-8 py-16 md:px-16 overflow-hidden">
        <div className=' grid grid-cols-1 lg:grid-cols-3 gap-16 items-center'>
        {/* Left Column: Heading and Description */}
        <div className="space-y-6">
          <span className="text-[26px] font-medium font-poppins text-white">We Choose Us</span>
          <h2 className="text-[36px] lg:text-[48px] font-poppins font-semibold leading-[1.1]">
            Professional  Chimney for Home
          </h2>
          <p className="text-white font-normal font-poppins text-base leading-relaxed max-w-sm">
            Chimney sweep or cleaning is essential for maintaining a safe and efficient fireplace system. 
            Over time, soot, creosote, and debris accumulate in the chimney.
          </p>
          <button className="flex items-center gap-3 bg-[#D90209] hover:bg-red-700 transition-colors px-6 py-3 rounded-full font-bold">
            <Phone size={18} fill="white" />
            (888)-249-0566
          </button>
        </div>

        {/* Center: Image (Positioned for overlap) */}
        <div className="relative flex justify-center">
          <img 
            src="/st-icons/Temp2/image7.png" 
            alt="Chimney Professional" 
            className="z-10 w-full max-w-md h-auto"
          />
        </div>

        {/* Right Column: Benefits List */}
        <div className="space-y-2">
          {[
            { bold: "Over 10+ years", text: "of experience providing  trusted Chimney Service." },
            { bold: "Expert", text: "chimney installation, repair, and maintenance." },
            { bold: "Safe, reliable", text: "workmanship for lasting protection." },
            { bold: "Quality", text: "flashing, brickwork, and chimney cap services." }
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex items-center justify-center border-2 border-[#D90209] rounded-full p-1 mt-1 shrink-0">
                <Check color="#D90209" size={14} strokeWidth={4} />
              </div>
              <p className="text-lg leading-snug font-poppins text-xl font-normal">
                <span className="font-bold font-poppins">{item.bold} </span> {item.text}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose9
