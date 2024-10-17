"use client"
import React, { useState } from "react";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { ENV, TokenListProvider } from "@solana/spl-token-registry";
import { ClipLoader } from "react-spinners";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ToastContainer } from 'react-toastify';
import { Card, CardContent } from './ui/card';
import Image from "next/image";


interface Metadata {
    name: string | null;
    symbol: string | null;
    logo: string | null;
}

interface Token {
    address: string;
    name: string;
    symbol: string;
    logoURI: string;
}

const TokenMetadata = () => {
    const [tokenPublicKey, setTokenPublicKey] = useState("");
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [loading, setLoading] = useState(false);

    const getTokenMetadata = async (tokenAddress: string): Promise<Metadata> => {
        const connection = new Connection("https://api.devnet.solana.com");
        const metaplex = Metaplex.make(connection);
        const mintAddress = new PublicKey(tokenAddress);

        const tokenMetadata: Metadata = {
            name: null,
            symbol: null,
            logo: null,
        };

        try {
            const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintAddress });
            const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

            if (metadataAccountInfo) {
                const token = await metaplex.nfts().findByMint({ mintAddress });
                tokenMetadata.name = token.name;
                tokenMetadata.symbol = token.symbol;
                tokenMetadata.logo = token.json?.image;
            } else {
                const provider = await new TokenListProvider().resolve();
                const tokenList: Token[] = provider.filterByChainId(ENV.Devnet).getList();
                const tokenMap = tokenList.reduce<Map<string, Token>>(
                    (map, item) => {
                        map.set(item.address, item);
                        return map;
                    },
                    new Map()
                );

                const token = tokenMap.get(mintAddress.toBase58());
                if (token) {
                    tokenMetadata.name = token.name;
                    tokenMetadata.symbol = token.symbol;
                    tokenMetadata.logo = token.logoURI;
                } else {
                    throw new Error("Token not found in the token list.");
                }
            }

            return tokenMetadata;

        } catch (error) {
            console.error("Error fetching token metadata:", error);
            // Type guard for error to ensure it's an instance of Error
            if (error instanceof Error) {
                alert(`Failed to fetch metadata: ${error.message}`);
            } else {
                alert("An unknown error occurred");
            }
            throw error;
        }
    };

    const fetchMetadata = async () => {
        if (!tokenPublicKey) {
            alert("Please enter a valid public key.");
            return;
        }

        setLoading(true);
        try {
            const metadata = await getTokenMetadata(tokenPublicKey.trim());
            if (metadata) {
                setMetadata(metadata);
            } else {
                setMetadata(null);
            }
        } catch (error) {
            console.error("Failed to fetch metadata", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Card className="flex flex-col mx-auto justify-center gap-10 mt-[10vh] shadow-sm w-full md:max-w-5xl z-50 backdrop-blur-md bg-opacity-30 bg-black">
                <CardContent className="">
                    <form className='flex flex-col justify-center gap-5 border-dashed border-[3px] border-white p-10 rounded-xl'>
                        <div className="flex flex-col gap-5">
                            <Label className="text-white font-bold text-sm">Token Public Key:</Label>
                            <Input
                                placeholder="Public Key"
                                value={tokenPublicKey}
                                    className="border-white focus:border-none focus:outline-none focus-visible:border-none focus-visible:outline-none"
                                onChange={(e) => setTokenPublicKey(e.target.value)}
                            />
                        </div>

                        <Button type="button" onClick={fetchMetadata}>
                            {loading ? <ClipLoader color="white" loading size={25} /> : "Fetch Metadata"}
                        </Button>
                    </form>

                    {/* Display metadata if available */}
                    {metadata && (
                        <div className="bg-gray-800 p-4 rounded mt-4">
                            <h3 className="text-xl font-bold">Token Metadata</h3>
                            <p>
                                <strong>Name:</strong> {metadata.name || "N/A"}
                            </p>
                            <p>
                                <strong>Symbol:</strong> {metadata.symbol || "N/A"}
                            </p>
                            {metadata.logo && (
                                <Image src={metadata.logo} alt={`${metadata.name} logo`} className="w-10 h-10 mt-2" />
                            )}
                        </div>
                    )}
                <p className='font-bold mt-5'>Currently this feature is not working</p>
                </CardContent>
            </Card>
        </>
    );
};

export default TokenMetadata;
