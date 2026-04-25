/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Serverless function configuration for Vercel
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
