/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['127.0.0.1'],
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
            pathname: '/u/**',
        },
        {
            protocol: "http",
            hostname: "localhost",
            port: "1337",
            pathname: "/**",
          },
    ],
},
}

module.exports = nextConfig