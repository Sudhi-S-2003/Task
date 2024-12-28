import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  const socialLinks = [
    { href: "/electrochip/blog", src: "/electrochip-images/images/fb.png", alt: "Facebook" },
    { href: "/electrochip/blog", src: "/electrochip-images/images/twitter.png", alt: "Twitter" },
    { href: "/electrochip/blog", src: "/electrochip-images/images/linkedin.png", alt: "LinkedIn" },
    { href: "/electrochip/blog", src: "/electrochip-images/images/instagram.png", alt: "Instagram" },
  ];

  return (
    <div>
      <div className='bg-[#190734] text-yellow-100 py-32 lg:p-32'>
        <div className='flex flex-col md:flex-row items-center gap-7 justify-evenly'>
          <div className='flex items-center gap-4'>
            <Image src="/electrochip-images/images/location-white.png" width={20} height={20} alt='Location Icon' />
            Passages of Lorem Ipsum available
          </div>
          <div className='flex items-center gap-4'>
            <Image src="/electrochip-images/images/telephone-white.png" width={20} height={20} alt='Telephone Icon' />
            Call: +012334567890
          </div>
          <div className='flex items-center gap-4'>
            <Image src="/electrochip-images/images/envelope-white.png" width={20} height={20} alt='Email Icon' />
            demo@gmail.com
          </div>
        </div>
        <div className='flex flex-col lg:flex-row mt-20 gap-5 items-center justify-center'>
          <div className='w-[90%] md:w-[70%] flex h-[40px]'>
            <input
              className="flex-1 h-[40px] text-black placeholder:text-slate-500 pl-3 lg:px-3"
              placeholder='Enter Your Email'
              type="email"
              required
            />
            <button className='uppercase w-[200px] h-[40px] bg-violet-700 hover:bg-violet-600 transition'>
              Subscribe
            </button>
          </div>
          <div className='flex gap-3'>
            {socialLinks.map((link) => (
              <Link href={link.href} key={link.alt}>
                <Image src={link.src} width={30} height={30} alt={link.alt} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-slate-50 text-black text-center min-h-[50px] pt-3 pb-5 text-lg font-semibold'>
        © {new Date().getFullYear()} All Rights Reserved by Electrochip
      </div>
    </div>
  );
}

export default Footer;
