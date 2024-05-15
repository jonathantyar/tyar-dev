/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'unpjlymmrtyvhfarxtng.supabase.co',
        pathname: '**',
      },
    ],
  }
}

module.exports = nextConfig
