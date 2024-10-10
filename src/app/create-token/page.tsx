import CreateToken from '@/components/CreateToken'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { WalletContextProvider } from '@/components/WalletContextProvider' // Import the context provider
import React from 'react'

const page = () => {
  return (
    <WalletContextProvider> {/* Wrap everything in WalletContextProvider */}
      <div className="flex justify-center flex-col max-w-7xl mx-auto">
        <Navbar />
        <CreateToken />
        <Footer />
      </div>
    </WalletContextProvider>
  )
}

export default page
