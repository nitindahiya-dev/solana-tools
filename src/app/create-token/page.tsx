'use client'
import CreateToken from '@/components/CreateToken'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { WalletContextProvider } from '@/components/WalletContextProvider' // Import the context provider
import { Connection } from '@solana/web3.js'
import React from 'react'

const page = () => {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  return (
    <WalletContextProvider> {/* Wrap everything in WalletContextProvider */}
      <div className="flex justify-center flex-col max-w-7xl mx-auto">
        <Navbar />
        <CreateToken connection={connection}/>
        <Footer />
      </div>
    </WalletContextProvider>
  )
}

export default page
