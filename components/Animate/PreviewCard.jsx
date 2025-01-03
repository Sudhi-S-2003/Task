import React, { forwardRef } from 'react';
import Link from 'next/link';

const PreviewCard = forwardRef(({ head = 'Default Title', desc = 'No description available.', link = '#' }, ref) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg w-full">
      {/* Embed iframe with the passed link */}
      <iframe
        ref={ref}
        title="Preview"
        className="w-full h-[300px] max-h-[500px] border-none rounded-lg mb-4 border-emerald-400 b"
        src={link}
      ></iframe>

      {/* Card Title */}
      <h2 className="text-2xl font-bold text-slate-700 mb-2">{head}</h2>

      {/* Description */}
      <p className="text-slate-600 text-center mb-4">{desc}</p>

      {/* Call-to-Action Link */}
      <Link
        href={link}
        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300"
      >
        Learn More
      </Link>
    </div>
  );
});

export default PreviewCard;
