import { VitePWAOptions } from "vite-plugin-pwa";

export const manifestConfig: Partial<VitePWAOptions> = {
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
