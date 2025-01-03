import Navbar from "@/components/Animate/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Animate/Footer";
import { ReactNode } from "react";
import "./animate.css"
export const metadata: Metadata = {
  title: "Animate",
  description: "Animate  components.",
};

type ElectrochipLayoutProps = {
  children: ReactNode;
};

function ElectrochipLayout({ children }: ElectrochipLayoutProps) {
  return (
    <div className="bg-[#eae6f5] text-black min-h-screen">
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}

export default ElectrochipLayout;