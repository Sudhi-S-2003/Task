import PreviewCard from "@/components/Animate/PreviewCard";
import Slider from "@/components/Animate/Slider";
import Carousel from "@/components/Animate/Carousel";

function Page() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* First Card */}
      <PreviewCard
        head="Slider Preview"
        desc="Check out this cool slider!"
        link="animate/preview/slider"
      />
      
      {/* Second Card */}
      <PreviewCard
        head="Carousel Preview"
        desc="Explore the rotating carousel!"
        link="animate/preview/carousel"
      />
    </div>
  );
}

export default Page;
