/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "litvhkgyqwfpzpljsddt.supabase.co",
      },
    ],
  },
};

export default nextConfig;
