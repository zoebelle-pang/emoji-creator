/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery', // Allow Replicate's image domain
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbxt.replicate.delivery', // Also allow this domain
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig 