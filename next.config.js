/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['solo-leveling-arise.vercel.app'], // Add your production domain later
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig
