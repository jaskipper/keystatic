/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    // This package is a library with an internal src/app directory that
    // should not be treated as a Next.js App Router. Disable app dir discovery
    // so `src/app/**/page.tsx` files are ignored during `next build`.
    appDir: false,
  },
};

export default config;

