"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutsideClick from "@/hooks/use-outside-click";

type CardType = {
  title: string;
  content: () => React.ReactNode;
};

const Faq = () => {
  const [active, setActive] = useState<CardType | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="flex flex-col items-center mt-[10vh] md:mt-[10rem] justify-center">
      <h4 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h4>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-[90vw] md:max-w-[70vw] rounded-xl md:h-fit md:max-h-[90%] flex flex-col bg-purple-400  sm:rounded-3xl overflow-hidden"
            >

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-black"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-black text-xs md:text-sm lg:text-base md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto  [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-sm md:max-w-3xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="group p-4 flex flex-col md:flex-row justify-between items-center hover:bg-purple-400 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-gray-800 mb-5"
          >
            <div className="flex gap-4 flex-col md:flex-row ">

              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-white text-center md:text-left group-hover:text-black"
                >
                  {card.title}
                </motion.h3>

              </div>
            </div>
          </motion.div>
        ))}

      </ul>
    </div>
  );
};

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards: CardType[] = [
  {
    title: "What is the Solana Token Creator?",
    content: () => (
      <p>
        The Orion Tools Solana Token Creator is an advanced Smart Contract empowering users to effortlessly generate customized SPL Tokens (Solana tokens), specifically tailored to their preferences in terms of supply, name, symbol, description, and image on the Solana Chain. Making tokens is super quick and cheap with our easy process.
      </p>
    ),
  },
  {
    title: "Is it Safe to Create Solana Tokens here?",
    content: () => (
      <p>
        Yes, our tools is completely safe. It is a dApp that creates your token, giving you and only you the mint and freeze Authority (the control of a SPL Token). Our dApp is audited and used by hundred of users every month.
      </p>
    ),
  },
  {
    title: " How much time will the Solana Token Creator Take?",
    content: () => (
      <p>
        The time of your Token Creation depends on the TPS Status of Solana. It usually takes just a few seconds so do not worry. If you have any issue please contact us
      </p>
    ),
  },
  {
    title: "How much does it cost?",
    content: () => (
      <p>
        The token creation currently cost 0.5 Sol, it includes all fees necessaries for the Token Creation in Solana mainnet.
      </p>
    ),
  },
  {
    title: "Which Wallet can i use?",
    content: () => (
      <p>
        You can use any Solana Wallet as Phantom, Solflare, Backpack, etc.
      </p>
    ),
  },
  {
    title: "How many Tokens can I create for each decimal amount?",
    content: () => (
      <p>
        Here is the max amount of tokens you can create for each decimal range.

        <br />
        0 to 4 - 1,844,674,407,370,955
        <br />
        5 to 7 - 1,844,674,407,370
        <br />
        8 - 184,467,440,737
        <br />
        9 - 18,446,744,073
      </p>
    ),
  },
];

export default Faq;
