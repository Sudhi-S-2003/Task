import Image from 'next/image';
import logo from "@/public/electrochip-images/images/logo.png"
function Navbar() {
  return (
    <div>
      <Image
        src={logo} 
        width={50}
        height={50}
        alt="Logo"
      />
    </div>
  );
}

export default Navbar;
