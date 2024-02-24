"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const NavItem = ({ title, link }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <li>
      {title === "About us" ? (
        <a
          className="py-[31px] px-[30px] font-poppins rounded-br-[6px] rounded-bl-[6px] text-[14px] font-[500] hover:bg-[#ECE9E9] transition-all block relative cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex gap-[11.5px] items-center">
            <span>{title}</span>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
              >
                <path
                  d="M5.17252 9.07005C5.56926 9.65472 6.43074 9.65472 6.82747 9.07005L11.4404 2.27204C11.891 1.60807 11.4153 0.710541 10.6129 0.710541H1.38707C0.584653 0.710541 0.109034 1.60807 0.55959 2.27204L5.17252 9.07005Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
          {isDropdownOpen && (
            <ul className="absolute bg-[#EAEAEA] w-[215px] z-10 font-poppins text-[14px] font-500 border-b-2 border-solid border-gray-800 rounded-b-lg bottom-0 translate-y-[100%] left-0">
              <li className="p-5 hover:bg-white hover:text-[#FF5733]">
                <a href="#">Mission and Vision</a>
              </li>
              <li className="p-5 hover:bg-white hover:text-[#FF5733]">
                <a href="#">MMN History</a>
              </li>
              <li className="p-5 hover:bg-white hover:text-[#FF5733]">
                <a href="#">Committee Members</a>
              </li>
              <li className="p-5 hover:bg-white hover:text-[#FF5733] hover:rounded-b-lg">
                <a href="#">Become a MMN member</a>
              </li>
            </ul>
          )}
        </a>
      ) : (
        <a
          href={link}
          className={`py-[31px] px-[30px] font-poppins rounded-br-[6px] rounded-bl-[6px] text-[14px] font-[500] ${
            pathname === "/" + title.toLowerCase()
              ? "bg-[#FF5733] text-white border-b-[2px]"
              : "text-black hover:bg-[#ECE9E9] transition-all"
          }`}
        >
          {title}
        </a>
      )}
    </li>
  );
};

export default NavItem;
