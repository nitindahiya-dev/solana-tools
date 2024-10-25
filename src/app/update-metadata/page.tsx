'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { WalletContextProvider } from '@/components/WalletContextProvider'; // Import the context provider
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the TokenMetadata component
const TokenMetadata = dynamic(() => import('@/components/TokenMetadata'), {
  loading: () => <p>Loading...</p>, // Optional loading state
});

const Page = () => {
  return (
    <BackgroundGradientAnimation>
      <WalletContextProvider>
        <WalletMultiButton />
        <div className="flex justify-center flex-col max-w-7xl mx-auto">
          <Navbar />
          <TokenMetadata /> {/* This will be loaded dynamically */}
          <Footer />
        </div>
      </WalletContextProvider>
    </BackgroundGradientAnimation>
  );
};

export default Page;
