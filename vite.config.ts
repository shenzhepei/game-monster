import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? "/game-monster/" : "/",
  test: {
    environment: "jsdom",
    coverage: { provider: "v8", reporter: ["text", "lcov"], include: ["src/game/progress.ts", "src/i18n/language.ts"] },
  },
});
