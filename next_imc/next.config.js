/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  async rewrites() {
    return [
      {
        destination: "http://localhost:8080/:path*",
        source: "/:path*",
      }
    ];
    },
}
module.exports = nextConfig

