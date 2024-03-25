/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  async redirects() {
    return [{ source: '/', destination: '/auth', permanent: true }]
  },
}

export default nextConfig
