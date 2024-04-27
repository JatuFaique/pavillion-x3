/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/listing',
            permanent: true,
          }
        ]
      },
};

export default nextConfig;
