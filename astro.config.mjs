import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://gemara.site',
  integrations: [
    react(),
    tailwind(),
    icon(),
    sitemap({
      filter: (page) => page !== 'https://gemara.site/404/',
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
  }),
});
