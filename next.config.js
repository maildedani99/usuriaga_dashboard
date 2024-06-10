/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*', // Aplicar a todas las rutas
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0', // Deshabilitar caché
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
