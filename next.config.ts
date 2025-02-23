import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  env: {
    TZ: 'Europe/Budapest'
  },

  output: 'standalone',
  basePath: '', // Ha a fődomainen fut
 
  images: {
    unoptimized: true, // Képek optimalizálásának kikapcsolása
    domains: [
      'oazis.komornikantal.hu',
      'localhost',
      '10.50.138.180'
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  },
 

}

export default nextConfig;

