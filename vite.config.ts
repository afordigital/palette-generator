/// <reference types="vitest" />
/// <reference types="vite/client" />

import { manifestConfig } from './manifest';
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: "./",
    plugins: [
      react(),
      VitePWA(manifestConfig)
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      environmentOptions: {
        pretendToBeVisual: true,
      },
      env: loadEnv(mode, process.cwd(), ''),
      coverage: {
        provider: "v8",
        reportsDirectory: './tests/unit/coverage',
        enabled: false,
        include: ['./src/**/*.{tsx,jsx,ts,js}'],
        exclude: [
          'coverage/**',
          'dist/**',
          '**/node_modules/**',
          '**/[.]**',
          'packages/*/test?(s)/**',
          '**/*.d.ts',
          '**/virtual:*',
          '**/__x00__*',
          '**/\x00*',
          'cypress/**',
          'test?(s)/**',
          'test?(-*).?(c|m)[jt]s?(x)',
          '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
          '**/vitest.{workspace,projects}.[jt]s?(on)',
          '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        ]
      },
      setupFiles: ['./setupTests.ts'],
      include: ['./src/**/*.{test,spec}.{tsx,jsx,ts,js}'],
      exclude: ['node_modules'],
      browser: {
        name: "chromium",
        provider: "preview",
        enabled: false
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src").toString(),
        "@components": path.resolve(__dirname, "./src/components/").toString(),
        "@assets": path.resolve(__dirname, "./src/assets/").toString(),
        "@layouts": path.resolve(__dirname, "./src/layout/").toString(),
        "@lib": path.resolve(__dirname, "./src/lib/").toString(),
        "@utils": path.resolve(__dirname, "./src/utils/").toString(),
      },
    },
  }
});
