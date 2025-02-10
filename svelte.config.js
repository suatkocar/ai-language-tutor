import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    env: {
      dir: '.',
      publicPrefix: 'PUBLIC_'
    }
  },
  preprocess: vitePreprocess()
};

export default config;
