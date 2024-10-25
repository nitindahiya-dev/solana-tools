'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { WalletContextProvider } from '@/components/WalletContextProvider' // Import the context provider
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection } from '@solana/web3.js'
import dynamic from 'next/dynamic'
import React from 'react'


const CreateToken = dynamic(() => import('@/components/CreateToken'), {
  loading: () => <p>Loading...</p>, // Optional loading state
});

const page = () => {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  return (
    
    <BackgroundGradientAnimation>
    <WalletContextProvider>
      <WalletMultiButton />
      <div className="flex justify-center flex-col max-w-7xl mx-auto ">
        <Navbar />
        <CreateToken connection={connection}/>
        <Footer />
      </div>
    </WalletContextProvider>
    </BackgroundGradientAnimation>
  )
}

export default page
