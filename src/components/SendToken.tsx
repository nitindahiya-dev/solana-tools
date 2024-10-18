import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import { Label } from "./ui/label";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import "react-toastify/dist/ReactToastify.css";


export function SendToken() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [solBalance, setSolBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");

  // Fetch balance on mount and whenever the wallet changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
      }
    };
    fetchBalance();
  }, [wallet, connection]);

  // Handle token sending
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet!");
      return;
    }

    // Validate amount
    const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;
    if (isNaN(amountInLamports) || amountInLamports <= 0) {
      toast.error("Invalid amount. Please enter a valid number.");
      return;
    }

    // Check if sufficient balance
    if (amountInLamports > solBalance * LAMPORTS_PER_SOL) {
      toast.error("Insufficient balance.");
      return;
    }

    setLoading(true);
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amountInLamports,
        })
      );

      toast.info("Sending transaction..."); // Inform user that the transaction is being sent

      // Send the transaction
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

      toast.success(`Successfully sent ${amount} SOL to ${to}`); // Success message
      setAmount("");
      setTo("");

      // Fetch the updated balance
      const balance = await connection.getBalance(wallet.publicKey);
      setSolBalance(balance / LAMPORTS_PER_SOL);
    } catch (error: unknown) {
      console.error("Transaction failed", error);

      // Type guard to check if error is an instance of Error
      if (error instanceof Error) {
        // Handle specific errors
        if (error.message.includes("Insufficient funds")) {
          toast.error("Insufficient funds to complete the transaction.");
        } else if (error.message.includes("Invalid public key")) {
          toast.error("Invalid recipient address.");
        } else {
          toast.error("Transaction failed. Please try again.");
        }
      } else {
        // Fallback error message
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-[65vh] flex gap-8 flex-col justify-center items-center">
        <h1 className="md:text-5xl text-2xl font-semibold">Send Transaction</h1>
        <div className="md:p-6 p-4 rounded-2xl shadow-sm w-[95vw] md:max-w-3xl backdrop-blur-md bg-opacity-30 bg-black z-50">
          <form className="flex flex-col gap-6 border-[3px] border-white border-dashed md:p-10 p-5 rounded-xl" onSubmit={handleSend}>
            <div className="flex text-white flex-col gap-2">
              <Label className="text-md font-semibold">To</Label>
              <Input
                className="placeholder:text-white border-white"
                placeholder="Public Key"
                value={to}
                onChange={(e) => setTo(e.target.value)} // Update the 'to' state
              />
            </div>

            <div className="flex text-white flex-col gap-2">
              <Label className="text-md font-semibold">Amount</Label>
              <Input
                className="placeholder:text-white border-white"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} // Update the 'amount' state
              />
            </div>

            <Button className="w-full outline-white outline-1" disabled={loading}>
              {loading ? "Sending..." : "Send Token"}
            </Button>
          </form>
        </div>

        {wallet.connected && (
          <div className="mt-5">
            <p className="text-left text-white">
              Your Current Balance: {solBalance !== null ? `${solBalance.toFixed(3)} SOL` : "Loading..."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
