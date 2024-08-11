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
};

export default nextConfig;
