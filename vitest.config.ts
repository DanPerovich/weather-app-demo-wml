import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 15000, // allow time for real API calls during Stage 3 recording
    globals: true,
  },
});
