/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost','raindropsbackedn.onrender.com'], 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5555',
        pathname: '/**',
      },
      {
        protocol: 'https', 
        hostname: 'raindropsbackedn.onrender.com',
        pathname: '/**',
      },
    ],
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
};
