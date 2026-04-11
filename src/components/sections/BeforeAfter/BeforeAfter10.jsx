import React from 'react'

const BeforeAfter7 = () => {
  return (
   <section className="py-12 px-4 bg-white ">
      <div className="max-w-7xl mx-auto bg-gradient-to-b px-8 py-16 md:px-16 overflow-hidden from-[#b91c1c] via-[#7f1d1d] to-black text-white text-center">
        
        {/* Heading */}
        <h2 className="text-3xl leading-15 md:text-5xl font-poppins font-bold mb-12">
          Real Chimney Transformations <br/> Across Dallas–Fort Worth
        </h2>
        <p className='font-poppins text-[16px] text-white leading-5'>See the quality of our chimney repair and cleaning work — real before & after results from <br/> DFW homeowners just like you.</p>

        {/* The Grid: 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-8">
          
          {/* Card 1 */}
          <div className="border-2 border-white/20 rounded-[2.5rem] overflow-hidden">
            <div className="flex h-64">
              <img src="/st-icons/Temp2/image8.png" className="w-full object-cover border-r border-white/10" alt="Before" />
              
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-white/20 rounded-[2.5rem] overflow-hidden">
            <div className="flex h-64">
              <img src="/st-icons/Temp2/image9.png" className="w-full object-cover border-r border-white/10" alt="Before" />
              
            </div>
          </div>

          {/* Card 3 */}
          <div className="border-2 border-white/20 rounded-[2.5rem] overflow-hidden">
            <div className="flex h-64">
              <img src="/st-icons/Temp2/image10.png" className="w-full object-cover border-r border-white/10" alt="Before" />
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <button className="bg-[#D90209] px-10 py-3 rounded-full">
          <p className="text-[16px] uppercase text-white font-medium font-poppins">Call Now</p>
          <span className="text-[20px] font-bold font-poppins">(737) 315-3438</span>
        </button>

      </div>
    </section>
  )
}

export default BeforeAfter7