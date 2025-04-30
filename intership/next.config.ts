import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/home',  // Вхідний шлях
        destination: '/',  // Куди перенаправляти
        permanent: true,  // Якщо це постійне перенаправлення
      },
    ];
  },
};

export default nextConfig;
