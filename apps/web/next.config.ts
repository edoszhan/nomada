import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 This disables ESLint during Vercel builds
  },
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
  },
  // your other config options...
};

export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
