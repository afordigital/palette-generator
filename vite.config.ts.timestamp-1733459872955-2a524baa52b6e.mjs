// manifest.ts
var manifestConfig = {
  registerType: "autoUpdate",
  includeAssets: [
    "favicon.ico",
    "windows/SmallTile.scale-100.png",
    "windows/SmallTile.scale-200.png",
    "windows/SmallTile.scale-400.png",
    "windows/Square150x150Logo.scale-100.png",
    "windows/Square150x150Logo.scale-200.png",
    "windows/Square150x150Logo.scale-400.png",
    "windows/Wide310x150Logo.scale-100.png",
    "windows/Wide310x150Logo.scale-200.png",
    "windows/Square44x44Logo.scale-200.png",
    "android/android-launchericon-48-48.png",
    "android/android-launchericon-72-72.png",
    "android/android-launchericon-96-96.png",
    "android/android-launchericon-144-144.png",
    "android/android-launchericon-192-192.png",
    "android/android-launchericon-512-512.png",
    "ios/16.png",
    "ios/32.png",
    "ios/72.png",
    "ios/120.png",
    "ios/180.png",
    "ios/512.png",
    "ios/1024.png"
  ],
  manifest: {
    name: "Palette Generator",
    short_name: "Palette Generator",
    description: "An intuitive application designed to create stunning color palettes, tailored for UX/UI designers to enhance their projects with ease and precision.",
    icons: [
      {
        src: "windows/SmallTile.scale-100.png",
        sizes: "44x44",
        type: "image/png"
      },
      {
        src: "windows/SmallTile.scale-200.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "windows/SmallTile.scale-400.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "windows/Square150x150Logo.scale-200.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "windows/Square150x150Logo.scale-400.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "windows/Wide310x150Logo.scale-100.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "windows/Wide310x150Logo.scale-200.png",
        sizes: "310x150",
        type: "image/png"
      },
      {
        src: "android/android-launchericon-48-48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "android/android-launchericon-72-72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "android/android-launchericon-96-96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "android/android-launchericon-144-144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "android/android-launchericon-192-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "android/android-launchericon-512-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "ios/16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "ios/32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "ios/72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "ios/120.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        src: "ios/180.png",
        sizes: "180x180",
        type: "image/png"
      },
      {
        src: "ios/512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "ios/1024.png",
        sizes: "1024x1024",
        type: "image/png"
      }
    ],
    theme_color: "#171717",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};

// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/ferna/Desktop/palette-generator/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.1_terser@5.36.0/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/ferna/Desktop/palette-generator/node_modules/.pnpm/vite-plugin-pwa@0.21.1_vite@5.4.11_@types+node@22.10.1_terser@5.36.0__workbox-build@7.3.0_workbox-window@7.3.0/node_modules/vite-plugin-pwa/dist/index.js";
import react from "file:///C:/Users/ferna/Desktop/palette-generator/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_vite@5.4.11_@types+node@22.10.1_terser@5.36.0_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\ferna\\Desktop\\palette-generator";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    base: "./",
    plugins: [
      react(),
      VitePWA(manifestConfig)
    ],
    test: {
      globals: true,
      environment: "jsdom",
      environmentOptions: {
        pretendToBeVisual: true
      },
      env: loadEnv(mode, process.cwd(), ""),
      coverage: {
        provider: "v8",
        reportsDirectory: "./tests/unit/coverage"
      },
      setupFiles: ["./setupTests.ts"],
      include: ["./src/**/*.{test,spec}.{tsx,jsx,ts,js}"],
      exclude: ["node_modules"]
      // browser: {
      //   name: "chromium",
      //   provider: "playwright",
      //   enabled: true
      // }
      // reporters: ['html'],
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src").toString(),
        "@components": path.resolve(__vite_injected_original_dirname, "./src/components/").toString(),
        "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets/").toString(),
        "@layouts": path.resolve(__vite_injected_original_dirname, "./src/layout/").toString(),
        "@lib": path.resolve(__vite_injected_original_dirname, "./src/lib/").toString(),
        "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils/").toString()
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFuaWZlc3QudHMiLCAidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmZXJuYVxcXFxEZXNrdG9wXFxcXHBhbGV0dGUtZ2VuZXJhdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxmZXJuYVxcXFxEZXNrdG9wXFxcXHBhbGV0dGUtZ2VuZXJhdG9yXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9mZXJuYS9EZXNrdG9wL3BhbGV0dGUtZ2VuZXJhdG9yL21hbmlmZXN0LnRzXCI7aW1wb3J0IHsgVml0ZVBXQU9wdGlvbnMgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbWFuaWZlc3RDb25maWc6IFBhcnRpYWw8Vml0ZVBXQU9wdGlvbnM+ID0ge1xyXG4gICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcclxuICAgIGluY2x1ZGVBc3NldHM6IFtcclxuICAgICAgICBcImZhdmljb24uaWNvXCIsXHJcblxyXG4gICAgICAgIFwid2luZG93cy9TbWFsbFRpbGUuc2NhbGUtMTAwLnBuZ1wiLFxyXG4gICAgICAgIFwid2luZG93cy9TbWFsbFRpbGUuc2NhbGUtMjAwLnBuZ1wiLFxyXG4gICAgICAgIFwid2luZG93cy9TbWFsbFRpbGUuc2NhbGUtNDAwLnBuZ1wiLFxyXG4gICAgICAgIFwid2luZG93cy9TcXVhcmUxNTB4MTUwTG9nby5zY2FsZS0xMDAucG5nXCIsXHJcbiAgICAgICAgXCJ3aW5kb3dzL1NxdWFyZTE1MHgxNTBMb2dvLnNjYWxlLTIwMC5wbmdcIixcclxuICAgICAgICBcIndpbmRvd3MvU3F1YXJlMTUweDE1MExvZ28uc2NhbGUtNDAwLnBuZ1wiLFxyXG4gICAgICAgIFwid2luZG93cy9XaWRlMzEweDE1MExvZ28uc2NhbGUtMTAwLnBuZ1wiLFxyXG4gICAgICAgIFwid2luZG93cy9XaWRlMzEweDE1MExvZ28uc2NhbGUtMjAwLnBuZ1wiLFxyXG4gICAgICAgIFwid2luZG93cy9TcXVhcmU0NHg0NExvZ28uc2NhbGUtMjAwLnBuZ1wiLFxyXG5cclxuICAgICAgICBcImFuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tNDgtNDgucG5nXCIsXHJcbiAgICAgICAgXCJhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTcyLTcyLnBuZ1wiLFxyXG4gICAgICAgIFwiYW5kcm9pZC9hbmRyb2lkLWxhdW5jaGVyaWNvbi05Ni05Ni5wbmdcIixcclxuICAgICAgICBcImFuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tMTQ0LTE0NC5wbmdcIixcclxuICAgICAgICBcImFuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tMTkyLTE5Mi5wbmdcIixcclxuICAgICAgICBcImFuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tNTEyLTUxMi5wbmdcIixcclxuXHJcbiAgICAgICAgXCJpb3MvMTYucG5nXCIsXHJcbiAgICAgICAgXCJpb3MvMzIucG5nXCIsXHJcbiAgICAgICAgXCJpb3MvNzIucG5nXCIsXHJcbiAgICAgICAgXCJpb3MvMTIwLnBuZ1wiLFxyXG4gICAgICAgIFwiaW9zLzE4MC5wbmdcIixcclxuICAgICAgICBcImlvcy81MTIucG5nXCIsXHJcbiAgICAgICAgXCJpb3MvMTAyNC5wbmdcIlxyXG4gICAgXSxcclxuICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogXCJQYWxldHRlIEdlbmVyYXRvclwiLFxyXG4gICAgICAgIHNob3J0X25hbWU6IFwiUGFsZXR0ZSBHZW5lcmF0b3JcIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJBbiBpbnR1aXRpdmUgYXBwbGljYXRpb24gZGVzaWduZWQgdG8gY3JlYXRlIHN0dW5uaW5nIGNvbG9yIHBhbGV0dGVzLCB0YWlsb3JlZCBmb3IgVVgvVUkgZGVzaWduZXJzIHRvIGVuaGFuY2UgdGhlaXIgcHJvamVjdHMgd2l0aCBlYXNlIGFuZCBwcmVjaXNpb24uXCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcIndpbmRvd3MvU21hbGxUaWxlLnNjYWxlLTEwMC5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjQ0eDQ0XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJ3aW5kb3dzL1NtYWxsVGlsZS5zY2FsZS0yMDAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCI3Mng3MlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwid2luZG93cy9TbWFsbFRpbGUuc2NhbGUtNDAwLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiOTZ4OTZcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcIndpbmRvd3MvU3F1YXJlMTUweDE1MExvZ28uc2NhbGUtMjAwLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiMTQ0eDE0NFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwid2luZG93cy9TcXVhcmUxNTB4MTUwTG9nby5zY2FsZS00MDAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJ3aW5kb3dzL1dpZGUzMTB4MTUwTG9nby5zY2FsZS0xMDAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJ3aW5kb3dzL1dpZGUzMTB4MTUwTG9nby5zY2FsZS0yMDAucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCIzMTB4MTUwXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTQ4LTQ4LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiNDh4NDhcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcImFuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tNzItNzIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCI3Mng3MlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiYW5kcm9pZC9hbmRyb2lkLWxhdW5jaGVyaWNvbi05Ni05Ni5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjk2eDk2XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTE0NC0xNDQucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCIxNDR4MTQ0XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTE5Mi0xOTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTUxMi01MTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJpb3MvMTYucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCIxNngxNlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiaW9zLzMyLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiMzJ4MzJcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcImlvcy83Mi5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjcyeDcyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJpb3MvMTIwLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZXM6IFwiMTIweDEyMFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiaW9zLzE4MC5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjE4MHgxODBcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3JjOiBcImlvcy81MTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogXCJpb3MvMTAyNC5wbmdcIixcclxuICAgICAgICAgICAgICAgIHNpemVzOiBcIjEwMjR4MTAyNFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjMTcxNzE3XCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgc2NvcGU6IFwiL1wiLFxyXG4gICAgICAgIHN0YXJ0X3VybDogXCIvXCIsXHJcbiAgICAgICAgb3JpZW50YXRpb246IFwicG9ydHJhaXRcIlxyXG4gICAgfVxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZlcm5hXFxcXERlc2t0b3BcXFxccGFsZXR0ZS1nZW5lcmF0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGZlcm5hXFxcXERlc2t0b3BcXFxccGFsZXR0ZS1nZW5lcmF0b3JcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2Zlcm5hL0Rlc2t0b3AvcGFsZXR0ZS1nZW5lcmF0b3Ivdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZS9jbGllbnRcIiAvPlxyXG5cclxuaW1wb3J0IHsgbWFuaWZlc3RDb25maWcgfSBmcm9tICcuL21hbmlmZXN0JztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcclxuXHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBcIi4vXCIsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIFZpdGVQV0EobWFuaWZlc3RDb25maWcpXHJcbiAgICBdLFxyXG4gICAgdGVzdDoge1xyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgICAgZW52aXJvbm1lbnRPcHRpb25zOiB7XHJcbiAgICAgICAgcHJldGVuZFRvQmVWaXN1YWw6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVudjogbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyksXHJcbiAgICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgICAgcHJvdmlkZXI6IFwidjhcIixcclxuICAgICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi90ZXN0cy91bml0L2NvdmVyYWdlJ1xyXG4gICAgICB9LFxyXG4gICAgICBzZXR1cEZpbGVzOiBbJy4vc2V0dXBUZXN0cy50cyddLFxyXG4gICAgICBpbmNsdWRlOiBbJy4vc3JjLyoqLyoue3Rlc3Qsc3BlY30ue3RzeCxqc3gsdHMsanN9J10sXHJcbiAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJ10sXHJcbiAgICAgIC8vIGJyb3dzZXI6IHtcclxuICAgICAgLy8gICBuYW1lOiBcImNocm9taXVtXCIsXHJcbiAgICAgIC8vICAgcHJvdmlkZXI6IFwicGxheXdyaWdodFwiLFxyXG4gICAgICAvLyAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgLy8gfVxyXG4gICAgICAvLyByZXBvcnRlcnM6IFsnaHRtbCddLFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKS50b1N0cmluZygpLFxyXG4gICAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzL1wiKS50b1N0cmluZygpLFxyXG4gICAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2Fzc2V0cy9cIikudG9TdHJpbmcoKSxcclxuICAgICAgICBcIkBsYXlvdXRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvbGF5b3V0L1wiKS50b1N0cmluZygpLFxyXG4gICAgICAgIFwiQGxpYlwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2xpYi9cIikudG9TdHJpbmcoKSxcclxuICAgICAgICBcIkB1dGlsc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3V0aWxzL1wiKS50b1N0cmluZygpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRU8sSUFBTSxpQkFBMEM7QUFBQSxFQUNuRCxjQUFjO0FBQUEsRUFDZCxlQUFlO0FBQUEsSUFDWDtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQUEsRUFDQSxVQUFVO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsTUFDSDtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLE1BQ0E7QUFBQSxRQUNJLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNWO0FBQUEsTUFDQTtBQUFBLFFBQ0ksS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsUUFDSSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDVjtBQUFBLElBQ0o7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxFQUNqQjtBQUNKOzs7QUM1SUEsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyxlQUFlO0FBRXhCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFSakIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sUUFBUSxjQUFjO0FBQUEsSUFDeEI7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLG9CQUFvQjtBQUFBLFFBQ2xCLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsTUFDQSxLQUFLLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQUEsTUFDcEMsVUFBVTtBQUFBLFFBQ1IsVUFBVTtBQUFBLFFBQ1Ysa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFlBQVksQ0FBQyxpQkFBaUI7QUFBQSxNQUM5QixTQUFTLENBQUMsd0NBQXdDO0FBQUEsTUFDbEQsU0FBUyxDQUFDLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU8xQjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTyxFQUFFLFNBQVM7QUFBQSxRQUMvQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxtQkFBbUIsRUFBRSxTQUFTO0FBQUEsUUFDckUsV0FBVyxLQUFLLFFBQVEsa0NBQVcsZUFBZSxFQUFFLFNBQVM7QUFBQSxRQUM3RCxZQUFZLEtBQUssUUFBUSxrQ0FBVyxlQUFlLEVBQUUsU0FBUztBQUFBLFFBQzlELFFBQVEsS0FBSyxRQUFRLGtDQUFXLFlBQVksRUFBRSxTQUFTO0FBQUEsUUFDdkQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsY0FBYyxFQUFFLFNBQVM7QUFBQSxNQUM3RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
