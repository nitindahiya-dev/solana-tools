'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { WalletContextProvider } from '@/components/WalletContextProvider' // Import the context provider
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import dynamic from 'next/dynamic'
import React from 'react'

const Ata = dynamic(() => import('@/components/Ata'), {
  loading: () => <p>Loading...</p>, // Optional loading state
});
const page = () => {

  return (
    <BackgroundGradientAnimation>

    <WalletContextProvider>
      <WalletMultiButton />
      <div className="flex justify-center flex-col max-w-7xl mx-auto ">
        <Navbar />
        <Ata />
        <Footer />
      </div>
    </WalletContextProvider>
    </BackgroundGradientAnimation>
  )
}

export default page
