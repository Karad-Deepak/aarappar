// next.config.mjs
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // Additional Next.js configuration options can go here.
};

export default pwaConfig(nextConfig);
