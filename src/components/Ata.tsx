'use client'
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select"; // Import your custom select components
import { Button } from "./ui/button";

const Ata = () => {
  const wallet = useWallet(); // Access the wallet
  const [loading, setLoading] = useState(false);
  const [mintAddress, setMintAddress] = useState("");
  const [tokenProgram, setTokenProgram] = useState("");
  const [ataAddress, setAtaAddress] = useState("");

  // Function to handle getting the ATA address
  const handleGetAddress = () => {
    if (!mintAddress) {
      toast.error("Enter a mint address.");
      return;
    }

    if (tokenProgram === "") {
      toast.error("Choose a token program.");
      return;
    }

    if (!wallet.connected || !wallet.publicKey) {
      toast.error("Connect your wallet.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const mintPublicKey = new PublicKey(mintAddress);
      const seeds = [
        wallet.publicKey.toBuffer(),
        tokenProgram === "1" ? TOKEN_2022_PROGRAM_ID.toBuffer() : TOKEN_PROGRAM_ID.toBuffer(),
        mintPublicKey.toBuffer(),
      ];
      const ata = PublicKey.findProgramAddressSync(
        seeds,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      console.log("ATA: ", ata[0].toBase58(), "bump: ", ata[1]);
      setAtaAddress(ata[0].toBase58()); // Set the ATA address
      toast.success("ATA address fetched successfully!");
    } catch (error) {
      console.error("Error finding ATA:", error);
      toast.error("Error finding ATA.");
      setAtaAddress(""); // Clear ATA address in case of error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col mx-auto max-h-screen gap-10">

        <h1 className="text-center text-2xl md:text-4xl mt-10 font-bold">
          Get Your ATA Public Key
        </h1>

        <div className="flex flex-col gap-5 md:p-10 px-5 py-7 rounded-2xl shadow-sm w-[90vw] md:max-w-4xl backdrop-blur-md bg-opacity-30 bg-black z-50 ">
          <div className=" mx-auto flex flex-col gap-5">
            <Input
              className="border-white w-[70vw] md:w-[700px] focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none "
              type="text"
              placeholder="Enter Token Public Address"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
            />


            <Select  onValueChange={(value) => setTokenProgram(value)}>
              <SelectTrigger className="bg-transparent border-white focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none ">
                <SelectValue placeholder="Select Token Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">TOKEN_2022_PROGRAM_ID</SelectItem>
                <SelectItem value="2">TOKEN_PROGRAM_ID</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="py-3 px-5 w-full bg-white text-black font-bold "
              onClick={handleGetAddress}
              disabled={loading} // Disable Button during loading
            >
              {loading ? "Fetching..." : "Get Your Address"}
            </Button>

          </div>

          {ataAddress && (
            <div className="text-slate-300 mt-4">
              <h2 className="text-lg font-semibold text-purple-400">ATA:</h2>
              <p className="text-base leading-relaxed">{ataAddress}</p>
            </div>
          )}


          <div className="space-y-4 text-slate-300">
            <h2 className="text-xl font-semibold text-purple-400">What is an ATA?</h2>
            <p className="text-base leading-relaxed">
              An <strong>Associated Token Account (ATA)</strong> is a special kind of account in the Solana blockchain
              that holds tokens tied to a specific wallet. Each token has its own ATA address, making it easy to
              manage your tokens securely.
            </p>
            <p className="text-base leading-relaxed">
              Once you enter your token public address above, you can retrieve your ATA and use it for various
              token-related operations, such as transfers, staking, or swaps.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ata;
