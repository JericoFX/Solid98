import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';
  
  return {
    base: './',
    plugins: [
      solid()
    ],
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Solid98CSS',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
      },
      rollupOptions: {
        external: ['solid-js', '98.css'],
        output: {
          globals: {
            'solid-js': 'SolidJS',
            '98.css': '98CSS'
          }
        }
      },
      copyPublicDir: false
    } : {
      outDir: 'playground-dist'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
});