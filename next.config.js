/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'], 
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
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
