/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dgz4gnx2n/**", // ✅ Correct format
      },
    ],
  },
};

export default nextConfig;
