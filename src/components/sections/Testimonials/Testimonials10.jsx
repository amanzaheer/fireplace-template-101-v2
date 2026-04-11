import React from 'react'
import { Star } from 'lucide-react';

const Testimonials9 = () => {
    const REVIEWS = [
  {
    text: "I hired Santa Chimney Sweep for my annual chimney cleaning/ inspection. Noam friendly, professional, and did a thorough job. He even took a picture of how my fireplace was styled so that he could put everything back exactly where it was originally! I loved the attention to detail and going that extra mile.",
    author: "Menahem"
  },
  {
    text: "Priced right, came quickly, and Ibrahim took the time to explain what needed repair and why. They also offered to remove their shoes, used a shop vac to clean out the hearth, and carried the logs which were heavy and boxed for later use into the garage. I appreciated their commitment to keeping my house from getting dirty with the work they needed to do! Recommend highly.",
    author: "Menahem"
  },
  {
    text: "This was our first time using a chimney service since moving to Texas. I have to say we are very pleased with this company! Everyone is professional, kind, and honest. Their pricing is very fair, they thoroughly explain what's going on with your chimney + do a great job cleaning it! Noam serviced ours and he was great! We'll be using them exclusively for all our future chimney needs.",
    author: "Menahem"
  },
  {
    text: "I had a great experience with Santa chimney sweep! I had smoke coming in through my fired place and they came to inspect. Found it very dirty, and our chimney exterior was cracked and leaking water in. They fixed everything in a professional and timely manner. Noam and Abe were great. Will use them for all my future chimney needs",
    author: "Menahem"
  }
];

const StarRating = ({ size = 18 }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} fill="#EFA536" stroke="#EFA536" />
    ))}
  </div>
);
  return (
    <section className="bg-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-6xl font-bold font-poppins text-[#EFA536]">5.0</span>
            <StarRating size={32} />
          </div>
          <p className="text-black font-poppins text-[22px] text-lg border-t border-b border-pink-100 py-2 px-8">
            Rated 5 out of 5 424 verified customers reviews
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-blue-100 rounded-sm">
          {REVIEWS.map((review, index) => (
            <div 
              key={index} 
              className={`p-8 flex flex-col justify-between ${
                index !== REVIEWS.length - 1 ? 'lg:border-r border-blue-100' : ''
              } border-b lg:border-b-0 border-blue-100`}
            >
              <div>
                <div className="mb-6">
                  <StarRating size={16} />
                </div>
                <p className="text-[16px] leading-relaxed font-poppins text-black font-barlow font-normal">
                  {review.text}
                </p>
              </div>
              <p className="mt-8 font-normal text-black text-[22px] font-poppis">
                - {review.author}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonials9