/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiBodyParser: {
      // Support parsing of application/json request bodies
      bodyParser: {
        enableTypes: ['json']
      }
    },
    api: {
      externalResolver: true,
    },
  }
};

export default nextConfig;
