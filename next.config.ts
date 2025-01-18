/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable server components for static export
  experimental: {
    appDir: true,
  },
  // Add custom headers if needed
  headers: async () => {
    return [];
  },
}

module.exports = nextConfig