"use client";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import Image from "next/image";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
    createInitializeMintInstruction,
    getAssociatedTokenAddress,
    createMintToInstruction,
    TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateToken = ({ connection }: { connection: Connection }) => {
    const wallet = useWallet();
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [decimals, setDecimals] = useState<number | "">("");
    const [amount, setAmount] = useState<number | "">("");
    const [description, setDescription] = useState<string>("");
    const [img, setImg] = useState<string | null>(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadingImage(true);
            const imgUrl = await uploadImagePinata(file);
            if (imgUrl) {
                setImg(imgUrl);
                setImgPreview(URL.createObjectURL(file));
            }
            setUploadingImage(false);
        }
    };

    const uploadImagePinata = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
                    "Content-Type": "multipart/form-data",
                },
            });

            return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        } catch (error) {
            console.error("Error uploading image to Pinata:", error);
            toast.error("Error uploading image to Pinata.");
            return null;
        }
    };

    const uploadMetadata = async () => {
        try {
            const metadata = { name, symbol, description, image: img };
            const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
                headers: {
                    pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
                    "Content-Type": "application/json",
                },
            });

            return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        } catch (error) {
            console.error("Error uploading metadata to Pinata:", error);
            toast.error("Error uploading metadata to Pinata.");
            return null;
        }
    };

    const createToken = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!wallet.publicKey) {
            toast.error("Please connect your wallet.");
            return;
        }
    
        if (!wallet.publicKey || !name || !symbol || !decimals || !amount || !description || !img) {
            toast.error("Please fill in all fields and upload an image.");
            return;
        }
    
        try {
            setLoading(true);
    
            const mintKeypair = Keypair.generate();
            const metadataUri = await uploadMetadata();
            if (!metadataUri) {
                toast.error("Failed to upload metadata.");
                return;
            }
    
            const associatedToken = await getAssociatedTokenAddress(
                mintKeypair.publicKey,
                wallet.publicKey,
                false,
                TOKEN_2022_PROGRAM_ID
            );
    
            const space = 82; // Adjust space based on mint size and metadata size
            const lamports = await connection.getMinimumBalanceForRentExemption(space);
    
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    Number(decimals),
                    wallet.publicKey,
                    null,
                    TOKEN_2022_PROGRAM_ID
                ),
                createMintToInstruction(
                    mintKeypair.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    Number(amount) * Math.pow(10, Number(decimals)),
                    [],
                    TOKEN_2022_PROGRAM_ID
                )
            );
    
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeypair);
    
            // Improved error handling and logging
            try {
                const signature = await wallet.sendTransaction(transaction, connection);
                await connection.confirmTransaction(signature);
                toast.success(`Token created! Mint address: ${mintKeypair.publicKey.toBase58()}`);
            } catch (txError) {
                console.error("Transaction error:", txError);
                toast.error("Transaction failed: " + (txError as Error).message);
            }
    
        } catch (error: unknown) {
            console.error("Error creating token:", error);
            toast.error("An error occurred while creating the token: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <ToastContainer />
            <Card className="bg-transparent mx-auto">
                <CardContent>
                    <form onSubmit={createToken}>
                        <div className="w-full h-48 flex items-center justify-center border-2 border-dashed border-white/50 rounded-lg cursor-pointer">
                            <label htmlFor="upload-image" className="flex flex-col items-center space-y-2">
                                {imgPreview ? (
                                    <Image
                                        src={imgPreview}
                                        alt="Selected"
                                        className="h-40 w-auto object-contain"
                                        width={150}
                                        height={150}
                                    />
                                ) : (
                                    <>
                                        <svg
                                            className="w-12 h-12 text-white/50"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16.5v-5.25m0 0V4.5M12 11.25L9.75 9m2.25 2.25l2.25-2.25M12 16.5v-5.25M15.75 9l-3.75 3.75M6 19.5V17.25m12 0V19.5M12 19.5v-2.25M6 17.25A1.5 1.5 0 016 15V13.5a1.5 1.5 0 013 0V15m6 0v-1.5a1.5 1.5 0 113 0V15m-9 0a1.5 1.5 0 01-3 0v-1.5M6 13.5a1.5 1.5 0 113 0V15m0 0L9.75 12.75M12 9v2.25m0-2.25L15.75 6"
                                            />
                                        </svg>
                                        <p className="text-white/50">{uploadingImage ? "Uploading image..." : "Upload Image"}</p>
                                    </>
                                )}
                            </label>
                            <input
                                id="upload-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-5 my-5">
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-white font-bold text-sm">
                                    <span className="text-red-600 mr-1">*</span>Name:
                                </Label>
                                <Input
                                    placeholder="Token Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-white font-bold text-sm">
                                    <span className="text-red-600 mr-1">*</span>Symbol:
                                </Label>
                                <Input
                                    placeholder="Token Symbol"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-white font-bold text-sm">
                                    <span className="text-red-600 mr-1">*</span>Decimals:
                                </Label>
                                <Input
                                    placeholder="Token Decimals"
                                    type="number"
                                    value={decimals}
                                    onChange={(e) => setDecimals(e.target.value ? parseInt(e.target.value) : "")}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-white font-bold text-sm">
                                    <span className="text-red-600 mr-1">*</span>Amount:
                                </Label>
                                <Input
                                    placeholder="Total Supply"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : "")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5 mb-5">
                            <Label className="text-white font-bold text-sm">Description:</Label>
                            <Input
                                placeholder="Token Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Creating Token..." : "Create Token"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default CreateToken;
