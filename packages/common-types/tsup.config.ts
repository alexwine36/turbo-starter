import { type Options, defineConfig } from 'tsup';

// const react18PluginOptions: React18PluginOptions = {};
export default defineConfig((options: Options) => ({
  entry: ['./index.ts'],
  // entry: ["./src/index.ts"],
  format: ['cjs', 'esm'],
  //   external: ['react', 'react-dom'],
  dts: true,
  // clean: true,
  //   banner: {
  //     js: "'use client'",
  //   },
  // treeshake: true,
  // splitting: true,
  // esbuildPlugins: [react18Plugin],
  ...options,
}));
