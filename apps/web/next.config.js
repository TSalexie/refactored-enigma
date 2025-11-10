/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@productivity-app/shared', '@productivity-app/api-client'],
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
