import React from 'react';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import imgTree from '@/app/img/img5.png'; // Ensure the path to the image is correct

const BannerImg = () => (
  <Tilt
    className="parallax-effect-img"
    tiltMaxAngleX={40}
    tiltMaxAngleY={40}
    perspective={800}
    transitionSpeed={1500}
    scale={1.05}
    gyroscope={true}
  >
    <Image 
      src={imgTree} 
      className="inner-element" 
      alt="Tilted Tree Image" 
      width={1000} // Adjust width as needed
      height={1000} // Adjust height as needed
    />
  </Tilt>
);

export default BannerImg;
