/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Or specify your exact domains
      },
    ],
    unoptimized: true, // This will allow GIFs to work properly
  },
}

module.exports = nextConfig 