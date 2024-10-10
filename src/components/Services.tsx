"use client";
import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Link from "next/link";

const Services = () => {
    const content = [
        {
            heading: "Create Token",
            para: "Easily create your own Solana token without coding.",
            link_Name: "Click Here",
            link: "/create-token",
        },
        {
            heading: "Get your Associated Token Account(ATA) address",
            para: "Find your ATA address with only few steps.",
            link_Name: "Learn More",
            link: "/deploy-token",
        },
        {
            heading: "Airdrop Token",
            para: "Airdrop your Solana token to a wide audience.",
            link_Name: "Start Airdrop",
            link: "/airdrop-token",
        },
        {
            heading: "Transfer Token",
            para: "Easily transfer your Solana tokens to others.",
            link_Name: "Transfer Now",
            link: "/transfer-token",
        },
        {
            heading: "Update Metadata",
            para: "Update the metadata for your Solana token.",
            link_Name: "Update",
            link: "/update-metadata",
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
