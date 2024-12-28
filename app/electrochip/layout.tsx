import Navbar from "@/components/Electrochip/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Electrochip/Footer";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Electrochip",
  description: "Electrochip - Your one-stop destination for electronic components.",
};

type ElectrochipLayoutProps = {
  children: ReactNode;
};

function ElectrochipLayout({ children }: ElectrochipLayoutProps) {
  return (
    <div className="bg-[#eae6f5] text-black min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default ElectrochipLayout;