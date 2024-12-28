"use client";
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the CustomMap with ssr: false
const CustomMap = dynamic(() => import("./CustomMap"), { ssr: false });
function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row justify-center items-center p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold flex items-center mb-6">
          Contact Us
          <Image
            src="/electrochip-images/images/plug.png"
            alt="Electric plug icon"
            width={30}
            height={30}
            className="ml-2"
          />
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="p-3 border rounded-lg shadow-lg shadow-[rgba(0,0,0,0.1)] outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            className="p-3 border rounded-lg shadow-lg shadow-[rgba(0,0,0,0.1)] outline-none"
            placeholder="Email"
          />
          <input
            type="phone"
            className="p-3 border rounded-lg shadow-lg shadow-[rgba(0,0,0,0.1)] outline-none"
            placeholder="Phone"
          />
          <textarea
            className="p-3 border rounded-lg shadow-lg shadow-[rgba(0,0,0,0.1)] outline-none"
            placeholder="Message"
            rows="4"
          ></textarea>
          <button className="bg-violet-700 text-white py-2 px-6 rounded-md hover:bg-violet-600 transition-colors w-[200px]">
            Send
          </button>
        </div>
      </div>

      <div className="md:w-1/3 m-8">
        <CustomMap />
      </div>
    </div>
  );
}

export default Contact;
