/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  }
}

module.exports = nextConfig

module.exports = {
  env: {
    'HOST': 'us-cdbr-east-05.cleardb.net',
    'DATABASE': 'heroku_174ba6c18c17d0c',
    'PORT': '3306',
    'USERNAME': 'b3c6b9362228e6',
    'PASSWORD': '53446057',
  }
}