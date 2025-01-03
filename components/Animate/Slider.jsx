function Slider() {
  const slides = 6; // Number of slides

  return (
    <div className="w-full h-[300px] overflow-hidden bg-gray-100 relative perspective-1000">
      {/* Rotating container */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] transform-style-3d animate-rotate">
        {/* Loop through slides */}
        {[...Array(slides)].map((_, index) => (
          <div
            key={index}
            className="absolute w-[300px] h-[300px] flex items-center justify-center bg-white border"
            style={{
              transform: `rotateY(${(index * 360) / slides}deg) translateZ(150px)`,
            }}
          >
            {/* Slide content */}
            <img
              src={`https://placehold.co/150x150?text=Slide+${index + 1}`}
              alt={`Slide ${index + 1}`}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
