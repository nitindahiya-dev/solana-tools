// components/WalletContextProvider.tsx
"use client"
import { FC, ReactNode, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css'; // Ensure you import the wallet UI styles

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Define network and endpoint
  const network = clusterApiUrl('devnet'); // or 'mainnet-beta', 'testnet'
  
  // Wallets you wish to support
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
