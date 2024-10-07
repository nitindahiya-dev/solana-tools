"use client"
import React from 'react'
import { FlipWords } from "@/components/ui/flip-words";
import BannerImg from './BannerImg';

const Banner = () => {

  const words = [" Help with Token", " help With Meta...", " Send Transaction"];

  return (
    <div className='bg-gray-950 flex gap-10  items-center max-w-7xl '>
      
      <div className="h-[40vh] md:h-[40rem] md:min-w-[40rem] flex flex-col justify-center px-4">
        <p className='bg-purple-900/50 text-purple-400 font-bold inline-block w-fit px-4 py-2 rounded-lg'>Create SOLANA Token 1.0.0</p>
        <div className="text-3xl md:text-5xl font-extrabold leading-relaxed text-white dark:text-neutral-400">
          Here we
          <FlipWords words={words} /> <br />
          <span className='text-purple-400'>without code.</span>
        </div>
        <p className='text-lg text-gray-400'>Launch your Solana Token, All-in-one Solana token development and deployment.</p>
      </div>
      <div className="md:flex flex-col hidden justify-center min-w-[40rem] h-[50rem]">
      <BannerImg />
      </div>
    </div>
  )
}

export default Banner
