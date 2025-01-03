"use client"
import { useParams } from 'next/navigation';  // Use useParams to access dynamic route parameters
import Slider from '@/components/Animate/Slider';
import Carousel from '@/components/Animate/Carousel';

const PreviewPage = () => {
  const { name } = useParams();  // Access dynamic route parameter

  return (
    <div>
      <h1>Preview for {name}</h1>
      {name === 'slider' && <Slider />}
      {name === 'carousel' && <Carousel />}
    </div>
  );
};

export default PreviewPage;
