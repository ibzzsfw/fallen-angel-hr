/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
  },
}

module.exports = nextConfig

module.exports = {
  env: {
    'HOST': '',
    'DATABASE': '',
    'PORT': '',
    'USERNAME': '',
    'PASSWORD': '',
  }
}