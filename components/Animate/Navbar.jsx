import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="bg-[#320734] text-white py-2 px-4">
      <div className="flex items-center justify-evenly">
        {/* Logo with Link */}
        <Link href="/animate">
          <Image
            src="https://placehold.co/600x400/blue/white?text=A.C"
            alt="A.C Logo"
            className="w-[45px] h-[45px] object-cover rounded-full"
            loading="lazy"
            width={45}
            height={45}
          />
        </Link>

        {/* Search Bar for Large Screens */}
        <div className="hidden sm:flex items-center max-w-[400px] h-[40px] w-[90%] bg-white rounded-full overflow-hidden">
          <input
            type="text"
            className="h-full flex-1 px-4 text-black outline-none"
            placeholder="Search..."
            aria-label="Search"
          />
          <button
            className="h-full w-12 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
            aria-label="Search"
          >
            🔍
          </button>
        </div>

        {/* Link for Upcoming Section */}
        <Link href="/animate/upcoming" className="text-sm font-semibold">
          Upcoming
        </Link>
      </div>

      {/* Search Bar for Small Screens */}
      <div className="flex sm:hidden items-center max-w-[400px] h-[40px] w-[90%] bg-white rounded-full overflow-hidden m-auto mt-4">
        <input
          type="text"
          className="h-full flex-1 px-4 text-black outline-none"
          placeholder="Search..."
          aria-label="Search"
        />
        <button
          className="h-full w-12 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </div>
  );
}

export default Navbar;
