import React from 'react'
import { MapPin } from 'lucide-react';
const ServiceCities9 = () => {
    const locations = Array(48).fill("Alabama");

    const images = [
    "/st-icons/Temp2/image13.png", "/st-icons/Temp2/image14.png", "/st-icons/Temp2/image15.png", "/st-icons/Temp2/image16.png", "/st-icons/Temp2/image17.png",
    "/st-icons/Temp2/image18.png", "/st-icons/Temp2/image19.png", "/st-icons/Temp2/image20.png", "/st-icons/Temp2/image21.png", "/st-icons/Temp2/image22.png",
  ];
  return (
    <section className="bg-white py-20 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-Rubik font-bold text-[#2D2D2D] text-center mb-16">
          Areas We Serve
        </h2>

        {/* Locations Grid - 6 columns on large screens */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-2 mb-20">
          {locations.map((location, index) => (
            <div key={index} className="flex items-center gap-2">
              <MapPin size={18} className="text-[#D90209] cursor-pointer shrink-0" fill="#D90209" fillOpacity={0.2} />
              <span className="text-black text-sm md:text-base font-medium">
                {location}
              </span>
            </div>
          ))}
        </div>

        {/* Image Gallery - 5 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-2xl aspect-[4/3] shadow-md border border-gray-100">
              <img 
                src={src} 
                alt={`Service Area ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServiceCities9