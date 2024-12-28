import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <div>
      <div className='bg-[#190734] text-yellow-100 p-32'>
        <div className='flex justify-evenly'>
          <div className='flex items-center gap-4'><Image src={"/electrochip-images/images/location-white.png"} width={20} height={20} alt='loc img' /> Passages of Lorem Ipsum available</div>
          <div className='flex items-center gap-4'><Image src={"/electrochip-images/images/telephone-white.png"} width={20} height={20} alt='tel img' /> Call : +012334567890</div>
          <div className='flex items-center gap-4'><Image src={"/electrochip-images/images/envelope-white.png"} width={20} height={20} alt='mail img'/>  demo@gmail.com</div>
        </div>
        <div className='flex mt-20 gap-5 items-center justify-center'>
          <div className='w-[70%] flex h-[40px]'>  <input className=" flex-1  h-[40px] text-black placeholder:text-slate-500 px-3" placeholder='Enter Your Email' /> <button className='uppercase w-[200px]  h-[40px]
           bg-violet-700'>Subscribe</button></div>
          <div className='flex gap-3'>
            <Link href={"/electrochip/blog"} ><Image src={"/electrochip-images/images/fb.png"} width={30} height={30} alt='fb img' /> </Link>
            <Link href={"/electrochip/blog"} ><Image src={"/electrochip-images/images/twitter.png"} width={30} height={30} alt='twitter img'/> </Link>
            <Link href={"/electrochip/blog"} ><Image src={"/electrochip-images/images/linkedin.png"} width={30} height={30} alt='linkedin img'/> </Link>
            <Link href={"/electrochip/blog"} ><Image src={"/electrochip-images/images/instagram.png"} width={30} height={30} alt='insta img' /> </Link>
          </div>
        </div>
      </div>
      <div className='bg-slate-50 text-black text-center h-[50px] p-5 text-lg font-semibold'>
      © {new Date().getFullYear()} All Rights Reserved By Free Html Templates
      </div>
    </div>
  )
}

export default Footer