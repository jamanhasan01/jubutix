import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**', // This allows any path on the hostname
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
