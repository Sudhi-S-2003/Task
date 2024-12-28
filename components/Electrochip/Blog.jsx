import Image from 'next/image';
import BlogCard from "@/components/Electrochip/Blog.card"
function Blog() {
    return (
        <div className="min-h-screen bg-white">
            <div className=''>  <h1 className="text-4xl font-bold flex justify-center pt-11 mb-12 ">
                Blog                <Image
                    src="/electrochip-images/images/plug.png"
                    alt="Electric plug icon"
                    width={30}
                    height={30}
                    className="ml-2"
                />
            </h1></div>
            <div className='flex flex-col  md:flex-row justify-center items-center gap-5 mb-4' >
                <div className='w-[90%] md:w-[40%]'>
                <BlogCard image_url={"/electrochip-images/images/blog1.jpg"} />
                </div>
                <div className='w-[90%] md:w-[40%]'>
                <BlogCard image_url={"/electrochip-images/images/blog2.jpg"} />
                </div>
            </div>

        </div>
    )
}

export default Blog