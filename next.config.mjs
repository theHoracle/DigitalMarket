/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "digitalmarket-production-84d0.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
