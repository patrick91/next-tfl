/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:4000",
      },
    ];
  },
};

module.exports = nextConfig;
