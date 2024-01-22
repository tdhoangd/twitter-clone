/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/supabase/image-loader.js",

    // remotePatterns: [
    //   {

    //     hostname: "avatars.githubusercontent.com",
    //   },
    // ],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "zfdkdoeapvyllzhjgdqu.supabase.co",
    //     port: "",
    //     pathname: "/v1/object/public/images/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
// export default nextConfig;
