"use client";
import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Link from "next/link";

const Services = () => {
    const content = [
        {
            heading: "Create Your Token",
            para: "Effortlessly launch your own Solana token without any coding experience.",
            link_Name: "Create Now",
            link: "/create-token",
        },
        {
            heading: "Get Your ATA Address",
            para: "Find your Associated Token Account (ATA) address in just a few clicks.",
            link_Name: "Find Address",
            link: "/ata-address",
        },
        {
            heading: "Airdrop Your Token",
            para: "Easily distribute your Solana tokens to a large audience.",
            link_Name: "Airdrop Now",
            link: "/airdrop-token",
        },
        {
            heading: "Transfer Tokens",
            para: "Seamlessly transfer your Solana tokens to others in seconds.",
            link_Name: "Start Transfer",
            link: "/transfer-token",
        },
        {
            heading: "Update Token Metadata",
            para: "Keep your Solana token's metadata fresh and up-to-date.",
            link_Name: "Update Now",
            link: "/update-metadata",
        },
        {
            heading: "Swap Tokens",
            para: "Swap your Solana tokens instantly with ease.",
            link_Name: "Swap Now",
            link: "/swap-token",
        },
        {
            heading: "Create NFTs",
            para: "Mint your own NFTs on the Solana blockchain with zero hassle.",
            link_Name: "Create NFT",
            link: "/create-nft",
        },
    ];
    
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl font-bold mb-6">Solana Powerful Tools</h3>
            <p className=" text-gray-400 max-w-2xl text-center mx-auto mb-8">
                Start working with Solana Token Creator. It allows you to create Solana
                tokens by creating, deploying, airdropping, transferring, and updating
                metadata.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-10">
                {content.map((item, index) => (
                    <CardSpotlight
                        key={index}
                        className="p-4 rounded-xl w-[23rem] transition duration-300 ease-in-out hover:-translate-y-1"
                        color="#1f2937" // You can customize the hover color here
                        radius={400}    // Adjust the size of the spotlight
                    >
                        <h4 className="text-xl font-bold relative z-20 text-white line-clamp-1">
                            {item.heading}
                        </h4>
                        <p className="text-neutral-200 my-5 relative z-20 line-clamp-1">
                            {item.para}
                        </p>
                        <p className="mb-2">
                            <Link href={item.link} className="bg-purple-400 font-bold py-2 px-4 text-black rounded-full cursor-pointer mt-5 relative z-20">
                                {item.link_Name}
                            </Link>
                        </p>
                    </CardSpotlight>
                ))}
            </div>
        </div>
    );
};

export default Services;
