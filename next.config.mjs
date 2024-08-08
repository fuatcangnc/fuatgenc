/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['placehold.co'],
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
