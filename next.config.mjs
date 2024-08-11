/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fkmrea3hlmnddby5.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
      async rewrites() {
        return [
          {
            source: '/:slug',
            destination: '/blog/:slug',
          },
        ]
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
};

export default nextConfig;
