'use client';
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
const FAQs9 = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How often should I have my chimney swept?",
      answer: "Nulla enim lectus porttitor pulvinar. Diam sed fusce aliquam lacus. Tincidunt ultrices cursus amet donec egestas. Enim risus quam in in urna scelerisque proin. Eget aliquam cras nec egestas massa."
    },
    { question: "What happens during a chimney inspection?", answer: "Detail your inspection process here." },
    { question: "How do I know if my chimney needs repair?", answer: "Signs to look for include cracks or crumbling brick." },
    { question: "Why are gas flue inspections important?", answer: "Safety and efficiency are key reasons." },
    { question: "What are the most common chimney problems?", answer: "Blockages and structural wear are frequent issues." },
    { question: "Do you offer same-day appointments?", answer: "Yes, we prioritize urgent safety concerns." }
  ];
  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-24 ">
      <div className="max-w-7xl mx-auto bg-gradient-to-b from-[#D90209] via-[#D90209] to-[#131314]/150  text-white py-16 px-10 md:px-16 lg:px-20 shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Image and Title */}
        <div className="lg:col-span-5  space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-poppins font-bold leading-tight">
              Common questions <br/> about house cleaning in <br /> Alabama
            </h2>
          </div>
          <div className="border-6 border-white p-2 inline-block shadow-2xl">
            <img 
              src="/st-icons/Temp2/image12.png" 
              alt="Technicians working" 
              className="w-[300px] h-auto grayscale-0"
            />
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:col-span-7 ">
          <h2 className="text-3xl md:text-4xl font-Montserrat font-extrabold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-white/30 border-t border-white/30">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg md:text-xl font-poppins font-semibold text-white tracking-tight">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus strokeWidth={4} className="w-7 h-7 shrink-0 border-2 border-white rounded-full p-1" />
                  ) : (
                    <Plus strokeWidth={4} className="w-7 h-7 shrink-0 border-2 border-white rounded-full p-1" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="mt-4 text-[16px] text-white font-medium font-poppins o leading-relaxed max-w-2xl">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default FAQs9