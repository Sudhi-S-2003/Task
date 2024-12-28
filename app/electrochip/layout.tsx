import Navbar from "@/components/Electrochip/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Electrochip/Footer"

export const metadata: Metadata = {
  title: "Electrochip",
};

function ElectrochipLayout({ children }) {
    return (
        <div className="bg-[#eae6f5] text-black min-h-screen ">
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}

export default ElectrochipLayout
