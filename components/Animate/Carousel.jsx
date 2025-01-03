"use client";
import React, { useState } from "react";
import New from "./new"
function Carousel() {
  const slides = 6; // Number of slides
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide state

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides); // Loop forward
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides) % slides); // Loop backward
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 relative perspective-1000">
      <div
        className={`relative w-[300px] h-[300px] transform-style-3d transition-transform duration-1000 ease-in-out`}
        style={{
          transform: `rotateY(-${currentSlide * (360 / slides)}deg)`, // Rotate for current slide
        }}
      >
        {[...Array(slides)].map((_, index) => (
          <div
            key={index}
            className="absolute w-[300px] h-[300px] flex items-center justify-center bg-white shadow-md"
            style={{
              transform: `rotateY(${index * (360 / slides)}deg) translateZ(150px)`,
            }}
          >
            <img
              src={`https://placehold.co/150x150?text=Slide+${index + 1}`}
              alt={`Slide ${index + 1}`}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={handlePrev}
          className="p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Next
        </button>
      </div>
      <New/>
    </div>
  );
}

export default Carousel;
