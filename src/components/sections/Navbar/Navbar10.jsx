"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar10 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full font-sans bg-black">
      {/* --- TOP CONTACT BAR (Black) --- */}
      <div className="mx-auto max-w-[1440px] px-4 lg:px-[170px] py-3 lg:py-[13px]">
        <div className="flex flex-row items-center justify-between">
          
          {/* 1. Logo Section (Stays Left) */}
          <div className="relative w-[120px] h-[45px] md:w-[149px] md:h-[55px]">
            <img
              src="/st-icons/Temp2/Logo.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* 2. Desktop Contact Info (Hidden on Mobile) */}
          <div className="hidden lg:flex font-poppins items-center gap-[15px]">
            <p className="text-white font-normal text-[14px] ">
              Speak To A Chimney Specialist Today
            </p>
            <div className="flex items-center gap-2">
               {/* Simplified SVG for cleaner code */}
               <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
  <path d="M34.9659 23.7259C34.5407 23.3007 34.328 22.7743 34.328 22.1468C34.328 21.5193 34.5407 20.9937 34.9659 20.57C35.3911 20.1462 35.9167 19.9336 36.5427 19.9321C37.1687 19.9307 37.6951 20.1433 38.1218 20.57C38.5485 20.9967 38.7604 21.5223 38.7574 22.1468C38.7545 22.7714 38.5418 23.2977 38.1196 23.7259C37.6973 24.1541 37.1717 24.3659 36.5427 24.3615C35.9138 24.3571 35.3881 24.1445 34.9659 23.7237M31.006 18.9355L28.6806 16.6101C29.751 15.5397 30.9603 14.7188 32.3083 14.1474C33.6563 13.576 35.0677 13.2896 36.5427 13.2881C38.0177 13.2866 39.4299 13.573 40.7794 14.1474C42.1289 14.7217 43.3374 15.5426 44.4048 16.6101L42.0794 18.9355C41.3412 18.1973 40.5018 17.6252 39.5613 17.2191C38.6208 16.8131 37.6146 16.6101 36.5427 16.6101C35.4708 16.6101 34.4654 16.8131 33.5263 17.2191C32.5873 17.6252 31.7472 18.1973 31.006 18.9355ZM44.1834 46.5083C39.5695 46.5083 35.0109 45.5028 30.5077 43.4919C26.0045 41.481 21.9074 38.6292 18.2162 34.9366C14.5251 31.244 11.6741 27.1468 9.66314 22.6451C7.65221 18.1434 6.64601 13.5849 6.64453 8.96946C6.64453 8.30505 6.866 7.75138 7.30894 7.30845C7.75187 6.86551 8.30554 6.64404 8.96995 6.64404H17.9394C18.4562 6.64404 18.9176 6.81974 19.3236 7.17114C19.7296 7.52253 19.9695 7.93742 20.0434 8.41579L21.4829 16.1672C21.5567 16.7578 21.5383 17.2561 21.4275 17.6621C21.3168 18.0681 21.1138 18.4188 20.8185 18.7141L15.4479 24.14C16.1861 25.5057 17.0624 26.825 18.0767 28.0977C19.091 29.3704 20.208 30.598 21.4275 31.7807C22.5718 32.9249 23.7714 33.9865 25.0264 34.9654C26.2814 35.9443 27.6102 36.839 29.0128 37.6496L34.2173 32.4451C34.5495 32.1129 34.9836 31.8641 35.5195 31.6987C36.0555 31.5334 36.5811 31.4869 37.0964 31.5592L44.737 33.1095C45.2538 33.2571 45.6783 33.5251 46.0105 33.9134C46.3427 34.3017 46.5088 34.7351 46.5088 35.2134V44.1829C46.5088 44.8473 46.2873 45.401 45.8444 45.8439C45.4015 46.2868 44.8478 46.5083 44.1834 46.5083Z" fill="#D90209"/>
</svg>
               <p className="text-white font-poppins font-bold text-[20px]">(123)-456-7890</p>
            </div>
          </div>

          {/* 3. Mobile Hamburger (Visible only on Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none p-2"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* --- MAIN MENU BAR (Dark Gray) - FULL WIDTH --- */}
      <div
        className={`w-full bg-[#1a1a1a] border-t border-gray-400 text-white transition-all duration-300 ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        <ul className="mx-auto max-w-[1440px] px-4 lg:px-[170px] flex flex-col lg:flex-row justify-center font-poppins items-center gap-4 lg:gap-10 py-4 lg:py-3 text-[16px] font-normal uppercase tracking-widest">
          {["Home", "Locations", "Services", "FAQs", "About", "Contact Us"].map((item) => (
            <li
              key={item}
              className="hover:text-red-600 cursor-pointer transition-colors w-full lg:w-auto text-center py-2 lg:py-0"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar10;