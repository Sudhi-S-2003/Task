"use client";
import { useEffect, useMemo, useState } from "react";
import Task from "../data/Task";
import Link from "next/link";
import Image from 'next/image';

// Helper function to encode the preview image text
const encodeText = (text) => encodeURIComponent(text.toUpperCase());

function Page() {
  const [showData, setShowData] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [randomColors, setRandomColors] = useState([]);

  const totalPages = Math.ceil(Task.length / itemsPerPage);

  // Set itemsPerPage based on window size
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth <= 630 ? 3 : 4);
    };

    handleResize(); // To immediately set the correct items per page on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Generate random colors on the client side only
  useEffect(() => {
    const generatedColors = [0, 1, 2, 3, 4].map(() => {
      const randomBgColor = getRandomColor();
      const randomTextColor = invertColor(randomBgColor);
      return { randomBgColor, randomTextColor };
    });
    setRandomColors(generatedColors);
  }, []);

  // Paginate tasks based on showData and itemsPerPage
  const paginatedTasks = useMemo(() => {
    return Task.slice(showData * itemsPerPage, Math.min(showData * itemsPerPage + itemsPerPage, Task.length));
  }, [showData, itemsPerPage]);

  // Move to the previous page
  const handlePrev = () => {
    setShowData((prev) => Math.max(prev - 1, 0));
  };

  // Move to the next page
  const handleNext = () => {
    setShowData((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // Helper function to generate a random hex color code
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Helper function to invert a color (for text contrast)
  const invertColor = (hex) => {
    const color = hex.substring(1); // Remove the '#' symbol
    const rgb = parseInt(color, 16); // Convert hex to RGB
    const r = 255 - ((rgb >> 16) & 0xff);
    const g = 255 - ((rgb >> 8) & 0xff);
    const b = 255 - (rgb & 0xff);
    return `rgb(${r}, ${g}, ${b})`; // Return inverted RGB color
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg text-slate-800">
        {paginatedTasks.map((obj, index) => {
          // Get the generated colors for this task
          const { randomBgColor, randomTextColor } = randomColors[index] || {};

          const TaskContent = (
            <div className="flex gap-3">
              <Image
                src={
                  obj.dummy
                    ? `https://placehold.co/600x400/${randomBgColor?.substring(1)}/${randomTextColor}?text=${encodeText(obj["preview-img"])}`
                    : obj["preview-img"] ||
                    `https://placehold.co/600x400/${randomBgColor?.substring(1)}/${randomTextColor}?text=${encodeText(obj.name)}`
                }
                alt={`Preview of ${obj.name}`}
                className="w-[60px] h-[60px] object-cover rounded-full"
                loading="lazy"
                width={500}
                height={500}
              />

              <div>
                <h3 className="font-bold text-xl">{obj.name}</h3>
                <p className="text-sm text-gray-600">{obj.description}</p>
              </div>
            </div>
          );

          const taskStyles = `border-2 ${obj.dummy ? "border-red-400" : "border-blue-400"} rounded-lg shadow-md block p-3 mb-3`;

          return obj.dummy ? (
            <div key={index} className={taskStyles}>
              {TaskContent}
            </div>
          ) : (
            <Link key={index} href={obj.link} className={`${taskStyles} hover:shadow-xl transition-all`} role="link" aria-labelledby={`task-${index}`}>
              {TaskContent}
            </Link>
          );
        })}

        <div className="flex justify-center gap-3 mt-3">
          {showData > 0 && (
            <button
              onClick={handlePrev}
              className="bg-blue-400 text-white py-2 px-3 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go to previous page"
            >
              Prev
            </button>
          )}
          {showData < totalPages - 1 && (
            <button
              onClick={handleNext}
              className="bg-blue-400 text-white py-2 px-3 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go to next page"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
