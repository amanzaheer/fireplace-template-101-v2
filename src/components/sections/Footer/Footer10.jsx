import React from 'react'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer9 = () => {
  return (
    <footer className="bg-[#0F1115] text-white py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Column 1: Branding & Trust */}
          <div className="space-y-6">
            
              
                <img src="/st-icons/Temp2/Logo.png" alt="Logo" className="w-60 h-20 object-contain" />
            <p className="text-white text-sm leading-relaxed max-w-xs">
              Our goal is to give you services that are fast, effective, and affordable, and that go above and beyond what you expect.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Trust Badges - Assuming images are available */}
              <img src="/st-icons/Temp2/image23.png" alt="Google Review" className="h-10" />
              <img src="/st-icons/Temp2/image24.png" alt="Yelp Review" className="h-10" />
              <img src="/st-icons/Temp2/image25.png" alt="Bonded & Insured" className="h-10" />
              <img src="/st-icons/Temp2/image26.png" alt="Bonded & Insured" className="h-10" />
              <img src="/st-icons/Temp2/image27.png" alt="Bonded & Insured" className="h-10" />
            </div>
            <button className="flex items-center  gap-3 bg-[#D90209] hover:bg-red-700 transition-colors px-6 py-0 rounded-full font-semibold">
              <Phone size={35} fill="white" />
              Call Now <br/>
              (737) 315-3438
            </button>
          </div>

          {/* Column 2: Navigation & Contact */}
          <div className="space-y-8 min-w-max ">
            <nav className="flex flex-wrap  gap-x-8 gap-y-4  text-base font-medium">
              <a href="#" className="hover:text-[#D90209] whitespace-nowrap">Home</a>
              <a href="#" className="hover:text-[#D90209] whitespace-nowrap">Our Services</a>
              <a href="#" className="hover:text-[#D90209] whitespace-nowrap">Locations</a>
              <a href="#" className="hover:text-[#D90209] whitespace-nowrap">FAQs</a>
              <a href="#" className="hover:text-[#D90209] whitespace-nowrap">About</a>
              <a href="#" className="hover:text-[#D90209] whitespace-nowrap">Contact Us</a>
            </nav>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Stay Tuned With Us</h3>
              <div className="space-y-3 text-white">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#D90209] mt-1 shrink-0" />
                  <span>Lumbung Hidup St. 425 East Java <br /> Madiun City 1234</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#D90209] shrink-0" />
                  <span>chimney@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-[#D90209] shrink-0" />
                  <span>(+62) 123 456 789</span>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <Facebook size={20} className="text-[#D90209] cursor-pointer" />
                <Twitter size={20} className="text-[#D90209] cursor-pointer" />
                <Instagram size={20} className="text-[#D90209] cursor-pointer" />
                <Linkedin size={20} className="text-[#D90209] cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Column 3: Map Section */}
          <div className="space-y-4 ">
            <div className="rounded-2xl overflow-hidden md:ml-30 h-48 w-full border border-white/10 shadow-xl">
              <img 
                src="/st-icons/Temp2/image28.png" 
                alt="Service Location Map" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-white md:ml-30">
              <MapPin size={16} className="text-[#D90209]" />
              <span>1057 Chestnut St, Abilene, TX 79602</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer9