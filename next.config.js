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
      // Deprecated VA loan URLs
      { source: '/loans/va', destination: '/', permanent: true },
      { source: '/blog/va-loans-longview-tx', destination: '/loans/investor-line-of-credit', permanent: true },
      { source: '/blog/va-loans-windsor-co', destination: '/loans/investor-line-of-credit', permanent: true },
      { source: '/blog/va-loans-timnath-co', destination: '/loans/doctor-loan', permanent: true },
      { source: '/blog/va-loans-fort-collins-co', destination: '/loans/doctor-loan', permanent: true },
      { source: '/blog/va-loan-fort-collins-loveland-veterans', destination: '/loans/doctor-loan', permanent: true },
      { source: '/blog/va-loan-northern-colorado-veterans-guide', destination: '/who-i-help/investors', permanent: true },
      { source: '/blog/va-loan-windsor-severance-co', destination: '/loans/investor-line-of-credit', permanent: true },
      // Investor LOC canonical — investor-loc redirects to investor-line-of-credit
      { source: '/loans/investor-loc', destination: '/loans/investor-line-of-credit', permanent: true },
    ]
  },
}

module.exports = nextConfig
