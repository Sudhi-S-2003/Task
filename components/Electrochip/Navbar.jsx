"use client";

import Image from 'next/image';
import logo from "@/public/electrochip-images/images/logo.png";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Navlinks from "@/data/electrochip/links.json";
import { useState } from 'react';

function Navbar() {
  const pathname = usePathname()
  const [isShow, setIsShow] = useState(false)

  return (
    <div>
      <div className='flex justify-evenly p-3 items-center'>
        <Link className='flex gap-2 items-center' href={"/electrochip"}>
          <Image
            src={logo}
            width={40}
            height={40}
            alt="Logo"
          />
          <span className='text-2xl text-violet-700 font-bold'>
            Electrochip
          </span>
        </Link>

        <div className='hidden md:flex gap-10 items-center'>
          {
            Navlinks.map((linkobj) => {
              const isActive = pathname === linkobj.link;

              return (
                <Link
                  className={`${isActive ? 'bg-violet-700 text-white py-2 px-3 rounded-3xl font-bold cursor-pointer' : 'cursor-pointerpy-2 px-3 rounded-3xl font-bold'}`}
                  href={linkobj.link}
                  key={linkobj.name}
                >
                  {linkobj.name}
                </Link>
              );
            })
          }
        </div>
        {/* <div className='block md:hidden'>
          <Image alt='bar' src={isShow ? "/electrochip-images/images/close.png" : "/electrochip-images/images/menu.png"} width={50} height={50} onClick={() => setIsShow(!isShow)} />
        </div> */}
       <div className="block md:hidden">
          <div
            className={`w-8 h-8 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
              isShow ? "gap-0" : "gap-1.5"
            }`}
            onClick={() => setIsShow(!isShow)}
          >
            <span
              className={`block h-1 w-full bg-black rounded transform transition-transform duration-300 ${
                isShow ? "rotate-45 translate-y-[-1px] " : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-black rounded transition-opacity duration-300 ${
                isShow ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-black rounded transform transition-transform duration-300 ${
                isShow ? "-rotate-45 -translate-y-[10px]" : ""
              }`}
            ></span>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isShow ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        {
          Navlinks.map((linkobj) => {
            const isActive = pathname === linkobj.link;

            return (
              <Link
                className={`block h-[40px] my-3 text-center py-2 rounded-3xl font-bold cursor-pointer ${isActive ? 'bg-violet-700 text-white ' : ''}`}
                href={linkobj.link}
                key={linkobj.name}
              >
                {linkobj.name}
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}

export default Navbar;
