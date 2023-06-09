/** @type {import('next').NextConfig} */

/*{ //proxy any requests on http://localhost:3000/api/* to http://localhost:5000/api/*
  source: '/api/:slug*',
  destination: 'http://localhost:5000/api/:slug*'
}*/

const nextConfig = {
  reactStrictMode: true,
  //swcMinify: false, // Required to fix: https://nextjs.org/docs/messages/failed-loading-swc
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      
    ];
  },
  images:{
    domains: [
      'cdn.discordapp.com',
      'res.cloudinary.com',
      'arweave.net',
      'www.arweave.net',
      'amazonaws.com',
      'googleapis.com" '
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Fixes npm packages that depend on `fs` module
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }
    return config
  },
};

module.exports = nextConfig;