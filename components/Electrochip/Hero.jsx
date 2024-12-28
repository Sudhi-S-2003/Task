"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function Hero() {
    const images = Array.from({ length: 10 }, (_, index) => `/electrochip-images/images/slider-img.jpg`);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState("right");

    const moveRight = () => {
        if (isAnimating) return;
        setDirection("right");
        setIsAnimating(true);
    };

    const moveLeft = () => {
        if (isAnimating) return;
        setDirection("left");
        setIsAnimating(true);
    };

    useEffect(() => {
        if (!isAnimating) return;

        const timeout = setTimeout(() => {
            setCurrentIndex((prevIndex) => {
                let nextIndex;
                if (direction === "right") {
                    nextIndex = prevIndex + 1;
                    if (nextIndex >= images.length) {
                        nextIndex = 0;
                    }
                } else {
                    nextIndex = prevIndex - 1;
                    if (nextIndex < 0) {
                        nextIndex = images.length - 1;
                    }
                }
                return nextIndex;
            });

            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [isAnimating, direction, images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            moveRight();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-evenly mt-16 items-center flex-wrap min-h-[85vh] pb-5">
            <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4">
                    Electrical <br />
                    Service<br />
                    Providers
                </h1>
                <p className="text-[17px] mb-4">
                    It is a long established fact that a reader will be distracted by the
                    <br />
                    readable content of a page when looking at its layout.
                </p>
                <Link href={"/electrochip/contact"} className="px-7 py-3 bg-violet-700 text-yellow-50  rounded-3xl mt-11 block w-[150px] text-center font-semibold m-auto md:m-[unset]">
                Contact Us
                </Link>
            </div>

            <div className="relative mt-8 md:mt-0">
                <div className="border-violet-700 border-[5px] rounded-full max-w-[400px]  md:h-[400px] overflow-hidden relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex % images.length) * 100}%)`,
                        }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="w-full h-full flex justify-center items-center flex-shrink-0"
                            >
                                <img
                                    src={image}
                                    alt={`About Image ${index}`}
                                    className="md:max-w-[400px] md:h-[410px] object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <span
                    className="absolute top-[75%] right-7 text-2xl text-white bg-violet-700 cursor-pointer hover:text-violet-500 w-[50px] p-2 rounded-full text-center"
                    aria-label="Next"
                    onClick={moveRight}
                >
                    &gt;
                </span>

                <span
                    className="absolute top-[85%] right-16 text-2xl text-violet-700 cursor-pointer hover:text-violet-500 bg-white w-[50px] p-2 rounded-full text-center"
                    aria-label="Previous"
                    onClick={moveLeft}
                >
                    &lt;
                </span>
            </div>
        </div>
    );
}

export default Hero;
