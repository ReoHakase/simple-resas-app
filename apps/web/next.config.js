/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
