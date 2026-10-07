import type { Config } from "tailwindcss";
import { sharedPreset } from "@portfolio/tailwind-config";

export default {
  presets: [sharedPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
