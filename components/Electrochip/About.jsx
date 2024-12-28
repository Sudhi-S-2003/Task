import Image from 'next/image';
import Link from 'next/link';

function About() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-8">
            <div className=" flex flex-col gap-6">
                <h1 className="text-4xl font-bold flex   ">
                    About Us
                    <Image
                        src="/electrochip-images/images/plug.png"
                        alt="Electric plug icon"
                        width={30}
                        height={30}
                        className="ml-2"
                    />
                </h1>
                <p className="mt-4 text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br /> Sed do eiusmod tempor
                    incididunt ut labore et dolore <br /> magna aliqua. Ut enim ad minim veniam, quis nostrud <br />
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo <br /> consequat. Duis aute
                    irure dolor in reprehenderit in <br /> voluptate velit.
                </p>
                <Link href={"/electrochip/about"} className="text-center w-[200px]  bg-violet-700 text-white font-semibold text-lg  px-4 py-2 rounded-lg" >Read More</Link>
            </div>

            <div className="relative flex items-center justify-center w-1/2 h-[570px]">
                <div className="border-4 border-purple-700 rounded-full w-80 h-80 overflow-hidden">
                    <Image
                        src="/electrochip-images/images/about-img1.jpg"
                        alt="Main image for About Us"
                        width={350}
                        height={350}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="absolute bottom-0 right-0 border-4 border-purple-700 rounded-full w-60 h-60 overflow-hidden">
                    <Image
                        src="/electrochip-images/images/about-img2.jpg"
                        alt="Secondary image for About Us"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
