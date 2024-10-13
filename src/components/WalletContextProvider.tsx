import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css'; // Import wallet UI styles

export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Define state to manage the selected endpoint
  const [endpoint, setEndpoint] = useState("https://solana-devnet.g.alchemy.com/v2/djt3Hz2vuRd_sihRFtfXzdXWZjbciIJg");

  // Load endpoint from local storage on component mount
  useEffect(() => {
    const storedEndpoint = localStorage.getItem("endpoint");
    if (storedEndpoint) setEndpoint(storedEndpoint);
  }, []);

  // Memoize supported wallets (Phantom in this case)
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // Function to update endpoint and save to local storage
  const handleChangeEndpoint = (newEndpoint: string) => { // Explicitly declare the type
    setEndpoint(newEndpoint);
    localStorage.setItem("endpoint", newEndpoint);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Dropdown for changing the network endpoint */}
          <select
            className="bg-purple-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={endpoint}
            onChange={(e) => handleChangeEndpoint(e.target.value)}
          >
            <option value="https://solana-mainnet.g.alchemy.com/v2/djt3Hz2vuRd_sihRFtfXzdXWZjbciIJg">
              Mainnet
            </option>
            <option value="https://solana-devnet.g.alchemy.com/v2/djt3Hz2vuRd_sihRFtfXzdXWZjbciIJg">Devnet</option>
            <option value="https://api.testnet.solana.com">TestNet</option>
          </select>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
