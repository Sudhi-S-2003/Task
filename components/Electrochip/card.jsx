import Image from 'next/image';

function Card({ head, desc, image_url, active = false }) {
  return (
    <div className='w-[300px] shadow-2xl border-4 border-white rounded-2xl p-3 relative group'>
      <div className={`bg-violet-700 w-full ${active ? 'h-[20px]' : 'h-[0px]'} absolute left-0 top-0 border-4 border-white rounded-t-2xl group-hover:h-[20px] transition-all duration-300`}></div>
      
      <Image 
        src={image_url} 
        width={75} 
        height={75} 
        className='block m-auto mt-14 mb-4'
        alt={head || "Image"} 
      />
      
      <h1 className='text-xl text-violet-700 font-bold text-center'>{head}</h1>
      
      <p className='text-[15px] font-sans text-center mb-5'>{desc}</p>
    </div>
  );
}

export default Card;
