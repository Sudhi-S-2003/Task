import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['placehold.co'], // Add the external domain for images here
    dangerouslyAllowSVG: true,  // Allow SVG images
  },
};

export default nextConfig;
