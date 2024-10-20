"use client";
import { useState } from 'react';
import Link from 'next/link';
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
      <div className="px-4 my-5 py-3 flex justify-between items-center w-full mx-auto flex-col md:flex-row">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl text-white font-bold">Solana Tools</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-white absolute right-5 top-5 md:relative md:hidden focus:outline-none"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Menu for Larger Screens */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? 'max-h-[400px] opacity-100'
              : 'max-h-0 opacity-0'
          } md:max-h-full md:opacity-100 md:flex md:items-center md:space-x-6 md:w-auto overflow-hidden w-full`}
        >
          <ul className="flex flex-col md:flex-row md:items-center text-white text-lg space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
            
            <li>
              <Link href="/about">
                <span className="hover:text-gray-300 transition-colors duration-300">About</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="hover:text-gray-300 transition-colors duration-300">Contact</span>
              </Link>
            </li>
          </ul>
        </div>

      </div>
  );
}

export default Navbar;
