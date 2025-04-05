// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dgz4gnx2n/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "1h3.googleusercontent.com",
      //   pathname: "/a/**",
      // },
    ],
  },
};

export default nextConfig;
