// Plain Vite config for this TanStack Start site, deployed to Cloudflare Workers.
// Plugins: Tailwind, tsconfig path aliases, TanStack Start, Nitro (build only,
// targeting Cloudflare), and React.
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";

export default defineConfig(({ command, mode }) => {
  // Make .env values available to server code during the build.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  // Bake VITE_* values into the browser bundle.
  const define: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), "VITE_"))) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "entities/lib/decode.js": path.resolve("node_modules/entities/lib/decode.js"),
        "entities/lib/encode.js": path.resolve("node_modules/entities/lib/encode.js"),
        entities: path.resolve("node_modules/entities"),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    server: { host: "::", port: 8080 },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        // Use src/server.ts (our SSR error wrapper) as the server entry.
        server: { entry: "server" },
      }),
      ...(command === "build" ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
      viteReact(),
    ],
  };
});
