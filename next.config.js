/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... otras configuraciones existentes
  images: {
    domains: ['cdn.sanity.io',"drive.google.com"],
  },
}

module.exports = nextConfig