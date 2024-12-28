import Image from 'next/image';
import Card from "@/components/Electrochip/card"
import Link from 'next/link';
function Service() {

  return (
    <div className="bg-white min-h-screen py-9">
      <h1 className="text-4xl font-bold text-center flex items-center justify-center">
        Our Services
        <Image
          src={"/electrochip-images/images/plug.png"}
          alt="Plug icon"
          width={30}
          height={30}
          className="ml-2"
        />
      </h1>
      <div className='flex flex-col '>
        <div className='flex justify-evenly mt-7'>
          <Card head={"Equipment installation"} desc={"There are many variations of passages of Lorem Ipsum available,"} image_url={"/electrochip-images/images/s1.png"} />
          <Card head={"Windmill Energy"} image_url={"/electrochip-images/images/s2.png"} desc={"There are many variations of passages of Lorem Ipsum available,"} active={true} />
          <Card head={"Equipment Maintenance"} image_url={"/electrochip-images/images/s3.png"} desc="There are many variations of passages of Lorem Ipsum available," />

        </div>
        <div className='flex justify-center gap-7 mt-7'>
          <Card image_url={"/electrochip-images/images/s4.png"} head={"Offshore Engineering"} desc={"There are many variations of passages of Lorem Ipsum available,"} />
          <Card image_url={"/electrochip-images/images/s5.png"} head={'Electrical Wiring'} desc={"There are many variations of passages of Lorem Ipsum available,"} /></div>
      </div>
      <div className="flex justify-center mt-10">
        <Link className="text-center  bg-violet-700 text-white font-semibold text-lg  px-4 py-2 rounded-3xl" href="/electrochip/service">
          Read more
        </Link>
      </div>

    </div>
  );
}

export default Service;
