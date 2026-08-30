/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      { source: '/loans/va', destination: '/', permanent: true },
      { source: '/blog/va-loans-longview-tx', destination: '/', permanent: true },
      { source: '/blog/va-loans-windsor-co', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
