/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // using deprecated modal cos new one wont work, TODO: Find out why
    domains: ["localhost", "digitalmarket-production-84d0.up.railway.app"],
  },
};

export default nextConfig;
