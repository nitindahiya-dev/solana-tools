'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TokenMetadata from '@/components/TokenMetadata'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { WalletContextProvider } from '@/components/WalletContextProvider' // Import the context provider
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const page = () => {
    return (
        <BackgroundGradientAnimation>

            <WalletContextProvider>
                <WalletMultiButton />
                <div className="flex justify-center flex-col max-w-7xl mx-auto">
                    <Navbar />
                    <TokenMetadata />
                    <Footer />
                </div>
            </WalletContextProvider>
        </BackgroundGradientAnimation>
        );
    }

    export default page;
