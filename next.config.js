/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/supabase/image-loader.js",
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
