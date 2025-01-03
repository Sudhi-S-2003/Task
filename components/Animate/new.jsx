import React, { useState } from "react";

function CircularSlider() {
  const imageStore = [
    "https://placehold.co/600x400/055000/FF66F?text=first",
    "https://placehold.co/600x400/055000/FF66F?text=second",
    "https://placehold.co/600x400/055000/FF66F?text=third",
    "https://placehold.co/600x400/055000/FF66F?text=fourth",
    "https://placehold.co/600x400/055000/FF66F?text=fifth",
  ];

  const [current, setCurrent] = useState(0); // Current image index
  const [direction, setDirection] = useState("left"); // Slide direction

  const handleNext = () => {
    setDirection("left");
    setCurrent((prev) => (prev + 1) % imageStore.length);
  };

  const handlePrev = () => {
    setDirection("right");
    setCurrent((prev) => (prev - 1 + imageStore.length) % imageStore.length);
  };

  // Determine previous and next indices
  const prevIndex = (current - 1 + imageStore.length) % imageStore.length;
  const nextIndex = (current + 1) % imageStore.length;

  return (
    <div className="relative w-[300px] h-[200px] m-auto overflow-hidden">
      {/* Wrapper */}
      <div className="relative w-full h-full">
        {/* Previous Image */}
        <img
          src={imageStore[prevIndex]}
          alt="Previous Slide"
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            direction === "right" ? "translate-x-0" : "-translate-x-full"
          }`}
        />

        {/* Current Image */}
        <img
          src={imageStore[current]}
          alt="Current Slide"
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            direction === "left"
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        />

        {/* Next Image */}
        <img
          src={imageStore[nextIndex]}
          alt="Next Slide"
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            direction === "left" ? "translate-x-0" : "-translate-x-full"
          }`}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CircularSlider;
