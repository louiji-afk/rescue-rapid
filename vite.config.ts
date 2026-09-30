// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        strategies: "generateSW",
        registerType: "autoUpdate",
        injectRegister: null,
        filename: "sw.js",
        devOptions: { enabled: false },
        outDir: "dist/client",
        manifest: {
          name: "Rescue Rapid",
          short_name: "Rescue Rapid",
          description: "Free emergency SOS and telemedicine for Myanmar.",
          theme_color: "#FFFFFF",
          background_color: "#FFFFFF",
          display: "standalone",
          start_url: "/",
          icons: [{ src: "/favicon.ico", sizes: "64x64", type: "image/x-icon" }],
        },
        workbox: {
          navigateFallback: null,
          globDirectory: "dist/client",
          globPatterns: ["**/*.{js,css,woff2,ico}"],
          runtimeCaching: [
            {
              urlPattern: ({ request, url }) => request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
              handler: "NetworkFirst",
              options: { cacheName: "rr-pages", networkTimeoutSeconds: 4, expiration: { maxEntries: 20 } },
            },
            {
              urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith("/assets/"),
              handler: "CacheFirst",
              options: { cacheName: "rr-assets", expiration: { maxEntries: 200 } },
            },
          ],
        },
      }),
    ],
  },
});
