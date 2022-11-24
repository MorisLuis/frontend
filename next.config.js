/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['4orium.s3.amazonaws.com']
  }
}

module.exports = nextConfig
