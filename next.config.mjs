/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'aceternity.com',
          port: '',
          pathname: '/images/products/thumbnails/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  