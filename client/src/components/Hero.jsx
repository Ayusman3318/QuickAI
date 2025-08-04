import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {

  const navigate = useNavigate()
  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full 
      justify-center bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen "
    >
      <div className='text-center mb-6'>
        <h1 className='text-5xl sm:text-5x1 md:text6xl 2xl:text-7xl
        font-semibold mx-auto leading-[1.2] '>Create Amazing content with 
        <span className='text-primary'> AI tools </span></h1>
        <p className="text-xl text-gray-600 mt-2 max-w-2xl mx-auto">
          Think quick. Build quicker.
        </p>
      </div>
      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button onClick={()=> navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-lg
        hover:scale-110 active:scale-95 transition cursor-pointer'>Start creating now!</button>
        <button className='bg-white px-10 py-3 rounded-lg border border-gray-300
        hover:scale-110 active:scale-95 transition cursor-pointer'> Watch Demo</button>

      </div>
      <div className='flex items-center gap-4 mx-auto text-gray-600 py-2'>
        <img src={assets.user_group} alt="" className='h-8'/>Trusted by 10k+ Dreamers!
      </div>
    </div>
  );
};

export default Hero;