import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  const socialLinks = [
    { href: "/animate/blog", src: "/electrochip-images/images/fb.png", alt: "Facebook" },
    { href: "/animate/blog", src: "/electrochip-images/images/twitter.png", alt: "Twitter" },
    { href: "/animate/blog", src: "/electrochip-images/images/linkedin.png", alt: "LinkedIn" },
    { href: "/animate/blog", src: "/electrochip-images/images/instagram.png", alt: "Instagram" },
  ];

  return (
    <div>
      <div className='bg-[#320734] text-yellow-100 py-16 lg:p-16'>
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
        <div className='flex gap-3  justify-center mt-10'>
          {socialLinks.map((link) => (
            <Link href={link.href} key={link.alt}>
              <Image src={link.src} width={30} height={30} alt={link.alt} />
            </Link>
          ))}
        </div>
      </div>
      <div className='bg-black text-white text-center min-h-[50px] pt-3 pb-5 text-lg font-semibold'>
        © {new Date().getFullYear()} All Rights Reserved by Animate
      </div>
    </div>
  );
}

export default Footer;
