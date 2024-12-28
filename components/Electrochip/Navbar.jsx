"use client"; 

import Image from 'next/image';
import logo from "@/public/electrochip-images/images/logo.png";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Navlinks from "@/data/electrochip/links.json";

function Navbar() {
  const pathname = usePathname()

  return (
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

      <div className='flex gap-10 items-center'>
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
    </div>
  );
}

export default Navbar;
