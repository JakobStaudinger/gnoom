import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: { build: true },
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  clean: true
});
