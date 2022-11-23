

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        destination: "http://localhost:8080/sns/:path*",
        source: "/sns/:path*",
      }
    ];
  },

}
module.exports = nextConfig

