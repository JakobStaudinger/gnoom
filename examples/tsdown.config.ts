import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['esm'],
  dts: { build: false },
  platform: 'node',
  target: 'node22',
  sourcemap: false,
  clean: true
});
