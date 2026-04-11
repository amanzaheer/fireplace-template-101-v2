import React from 'react'

const Contact9 = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto bg-gradient-to-b px-8 py-16 md:px-16 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-black">
        
        {/* Left Side: Image and Floating Call Badge */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative">
            <img 
              src="/st-icons/Temp2/image11.png" 
              alt="Chimney Professional" 
              className="w-full max-w-md object-contain"
            />
            
          </div>
        </div>

        {/* Right Side: Form and Text Content */}
        <div className="space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl md:text-5xl text-white font-extrabold font-poppins leading-tight">
              10% Off Total Price For <br /> Online Booking
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold font-poppins text-white tracking-wide">
              Ask For A Quote Here
            </h3>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Fields */}
            <input 
              type="text" 
              placeholder="Your Full Name" 
              className="text-white placeholder:text-white border border-white p-4 rounded-md focus:border-[#F8C060] outline-none transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email ( abc@gmail.com )" 
              className="text-white placeholder:text-white border border-white p-4 rounded-md focus:border-[#F8C060] outline-none transition-colors"
            />
            <input 
              type="text" 
              placeholder="(123)-456-7890" 
              className="text-white placeholder:text-white border border-white p-4 rounded-md focus:border-[#F8C060] outline-none transition-colors"
            />
            <input 
              type="text" 
              placeholder="ZIP CODE" 
              className="text-white placeholder:text-white border border-white p-4 rounded-md focus:border-[#F8C060] outline-none transition-colors"
            />
            
            {/* Message Area spans both columns */}
            <textarea 
              placeholder="Message" 
              rows="4" 
              className="md:col-span-2 text-white placeholder:text-white border border-white p-4 rounded-md focus:border-[#F8C060] outline-none transition-colors"
            ></textarea>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="w-full md:w-auto text-[20px] bg-gray-200 text-black px-16 py-4 rounded-md font-bold text-lg hover:bg-white transition-all uppercase tracking-widest"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact9