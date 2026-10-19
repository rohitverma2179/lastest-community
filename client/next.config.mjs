import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-router-dom': path.resolve(__dirname, 'src/compat/react-router-dom.jsx'),
      '@/pages': path.resolve(__dirname, 'src/views'),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/compat/react-router-dom.jsx',
      '@/pages': './src/views',
    },
  },
};

export default nextConfig;
