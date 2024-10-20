import React from 'react';

const About = () => {
  return (
    <div className="py-8 border-[3px] border-white border-dashed rounded-2xl px-6">
    <div className=' py-8 px-6 bg-gray-300  rounded-2xl'>
      <h1 className='text-5xl font-bold text-center text-gray-800 mb-6'>About Us</h1>
      <p className='text-lg text-gray-700 mb-4'>
        Welcome to <strong>Solana Tools</strong>, your ultimate destination for simplifying and enhancing your experience on the Solana blockchain. We are a dedicated team of developers and blockchain enthusiasts committed to providing a suite of powerful tools designed to streamline your interactions with {`Solana's`} innovative ecosystem.
      </p>

      <h3 className='text-3xl font-semibold text-gray-800 mt-6 mb-3'>Who We Are</h3>
      <p className='text-lg text-gray-700 mb-4'>
        At Solana Tools, we understand the unique challenges and opportunities that come with working on a cutting-edge blockchain platform. Our mission is to empower developers, creators, and businesses by offering user-friendly solutions that make it easy to interact with the Solana network.
      </p>

      <h3 className='text-3xl font-semibold text-gray-800 mt-6 mb-3'>What We Offer</h3>
      <p className='text-lg text-gray-700 mb-4'>Our toolkit includes a variety of essential features, such as:</p>

      <ul className='list-disc list-inside text-lg text-gray-700 mb-4'>
        <li><strong>Token Creation</strong>: Easily create and manage your own tokens on the Solana blockchain. Whether {`you're`} launching a new project or experimenting with tokenomics, our intuitive interface guides you through the process.</li>
        <li><strong>Metadata Updates</strong>: Keep your tokens up-to-date with the latest information by utilizing our seamless metadata updating feature. Ensure that your token information is accurate and reflective of your {`project's`} evolution.</li>
        <li><strong>Comprehensive Resources</strong>: In addition to our tools, we provide extensive documentation and resources to help you navigate the Solana ecosystem. From guides to best practices, we are here to support your journey.</li>
      </ul>

      <h3 className='text-3xl font-semibold text-gray-800 mt-6 mb-3'>Our Commitment</h3>
      <p className='text-lg text-gray-700 mb-4'>
        We are passionate about the potential of blockchain technology and are dedicated to fostering innovation in the Solana community. Our tools are designed to be accessible to both seasoned developers and newcomers, making it easier than ever to leverage the power of Solana.
      </p>
      <p className='text-lg text-gray-700 mb-4'>
        Join us on this exciting journey as we explore the possibilities of the metaverse and decentralized finance (DeFi). Together, {`let's`} unlock the full potential of the Solana blockchain.
      </p>

      <h3 className='text-3xl font-semibold text-gray-800 mt-6 mb-3'>Connect with Us</h3>
      <p className='text-lg text-gray-700 mb-4'>
        Have questions or feedback? {`We’d`} love to hear from you! Reach out to us through our website or connect with us on social media. Thank you for choosing Solana Tools as your trusted partner in the Solana ecosystem.
      </p>
    </div>
    </div>
  );
};

export default About;
