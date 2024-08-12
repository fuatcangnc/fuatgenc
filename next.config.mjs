/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["highlight.js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fkmrea3hlmnddby5.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/blog/:slug",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
};

export default nextConfig;
