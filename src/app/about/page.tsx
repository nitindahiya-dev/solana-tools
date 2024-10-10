

import React from 'react';
import Link from 'next/link';

const About = () => {
  return (
    <div >
      <h1>About Us</h1>
      <p>This is the About page built using the app directory in Next.js!</p>
      <Link href="/">
        <>Go Back Home</>
      </Link>
    </div>
  );
};
export default About;
