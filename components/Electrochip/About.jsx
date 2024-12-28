import Image from 'next/image';
import Link from 'next/link';

function About() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-8 gap-10">
            <div className=" flex flex-col gap-6">
                <h1 className="text-4xl font-bold flex   ">
                    About Us
                    <Image
                        src="/electrochip-images/images/plug.png"
                        alt="Electric plug icon"
                        width={25}
                        height={25}
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

            <div className="sm:w-[450px] h-[600px] sm:h-[550px]">
                <div className='relative h-[600px]  sm:h-[550px] sm:w-[450px]'>
                    <div className="border-4 border-purple-700 rounded-full sm:w-80 sm:h-80 overflow-hidden">
                        <Image
                            src="/electrochip-images/images/about-img1.jpg"
                            alt="Main image for About Us"
                            width={350}
                            height={350}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="absolute  mt-3 left-[50%]  translate-x-[-50%] sm:bottom-0 sm:right-0 border-4 border-purple-700 rounded-full w-56 h-56 overflow-hidden">
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
        </div>
    );
}

export default About;
