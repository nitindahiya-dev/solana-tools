"use client";
import React from 'react';
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

const Airdrop = dynamic(() => import('@/components/Airdrop'), {
    loading: () => <p>Loading...</p>, // Optional loading state
  });


  const Page = () => {
    return (
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/YMEA2JwMZDAKAmATUjlwvrpP0Rnmc2YF"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <BackgroundGradientAnimation>

                        <WalletMultiButton />
                        <div className="flex justify-center flex-col max-w-7xl mx-auto ">
                            <Navbar />
                            <Airdrop />
                            <Footer />
                        </div>
                    </BackgroundGradientAnimation>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default Page;
