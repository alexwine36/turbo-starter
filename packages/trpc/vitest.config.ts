import { defineConfig } from 'vitest/config';

import defaultConfig from '@repo/testing';

export default defineConfig({
  ...defaultConfig,

  test: {
    ...defaultConfig.test,

    env: {
      ...defaultConfig.test.environment,
      ...process.env,
    },
    server: {
      deps: {
        inline: ['next-auth'],
      },
    },
  },
});
