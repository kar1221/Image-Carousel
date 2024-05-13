import { defineConfig } from "vite";
import {resolve} from "path";
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/ImageCarousel/ImageCarousel.ts"),
      name: "ImageCarousel",
      fileName: "image-carousel",
      formats: ["es"],
    }
  },
  plugins: [dts({
    rollupTypes: true,
  })],
});