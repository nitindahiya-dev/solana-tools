import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    // Footer
    <section className="">
      <div className="max-w-screen-xl my-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-5">

          <Link href="/about" className="text-base leading-6 text-white hover:text-gray-500">
            About
          </Link>

          <Link href="https://dev.to/nitindahiyadev/" className="text-base leading-6 text-white hover:text-gray-500">
            Blog
          </Link>

          <Link href="/contact" className="text-base leading-6 text-white hover:text-gray-500">
            Contact
          </Link>

          <Link href="/term-and-conditions" className="text-base leading-6 text-white hover:text-gray-500">
            Terms
          </Link>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <Link href="https://github.com/nitindahiya-dev" target='_black' className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Github</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.173c-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.931 0-1.31.467-2.382 1.235-3.222-.123-.302-.535-1.522.117-3.176 0 0 1.008-.322 3.3 1.23a11.512 11.512 0 013.003-.404 11.515 11.515 0 013.003.404c2.292-1.552 3.3-1.23 3.3-1.23.653 1.654.24 2.874.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.803 5.628-5.475 5.921.429.369.823 1.096.823 2.21v3.287c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
              />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link href="https://www.linkedin.com/in/nitin-dahiya/" target='_black' className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.23 0H1.77C.79 0 0 .77 0 1.75v20.5C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.75V1.75C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.6c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm14.77 12.85h-3.56v-5.53c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.92v5.63h-3.56V9h3.42v1.56h.05c.48-.9 1.67-1.84 3.43-1.84 3.67 0 4.35 2.42 4.35 5.57v6.16z"
              />
            </svg>
          </Link>
          <Link href="https://x.com/nitin_dahiya199" target='_blank' target='_black' className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.693 4.693 0 002.05-2.592 9.27 9.27 0 01-2.963 1.13 4.673 4.673 0 00-7.947 4.262A13.244 13.244 0 011.671 3.149a4.678 4.678 0 001.444 6.237 4.656 4.656 0 01-2.118-.583v.06a4.672 4.672 0 003.75 4.576 4.674 4.674 0 01-2.108.08 4.676 4.676 0 004.365 3.244A9.39 9.39 0 010 21.543 13.242 13.242 0 007.18 23.999c8.825 0 13.649-7.307 13.649-13.648 0-.208-.004-.416-.013-.623a9.755 9.755 0 002.389-2.49z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
