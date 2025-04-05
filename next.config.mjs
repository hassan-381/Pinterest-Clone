// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // More flexible path
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Fixed hostname
        pathname: "/a/**",
      },
    ],
  },
};

export default nextConfig;
