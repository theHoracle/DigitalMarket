/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "digitalmarket-production-84d0.up.railway.app",
        protocol: "https", // specify the protocol if applicable
      },
      {
        hostname: "localhost",
        port: 3000,
        protocol: "http", // specify the protocol if applicable
      },
    ],
  },
};

export default nextConfig;
