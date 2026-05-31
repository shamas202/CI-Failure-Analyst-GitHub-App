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
# Refinement 3: Improving consistency across the module
# Refinement 5: Adding internal developer notes
