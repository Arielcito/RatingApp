/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
      
    ],
  },
}

module.exports = nextConfig