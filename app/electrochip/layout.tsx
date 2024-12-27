import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Electrochip",
};

function ElectrochipLayout({ children }) {
    return (
        <div className="bg-white text-black h-screen ">
            {children}
        </div>
    )
}

export default ElectrochipLayout
