/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config
    
  ) => {
    config.externals.push({ canvas: 'commonjs canvas' })
    return config
  },
  reactStrictMode: false,
  output: 'standalone',
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true, 
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
      {
        source: '/login',
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
  },
  images: {
    domains: ['mmngallery.blob.core.windows.net'],
  }
};

export default nextConfig;
