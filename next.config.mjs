/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['fkmrea3hlmnddby5.public.blob.vercel-storage.com'],
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
