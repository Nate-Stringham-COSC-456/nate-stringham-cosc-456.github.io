import { defineConfig } from "vite";

import { ViteEjsPlugin } from "vite-plugin-ejs";
import glsl from "vite-plugin-glsl";

const pages = {
  assignments: [
    "2d-polygons-and-interpolation-part-1",
    "2d-polygons-and-interpolation-part-2",
    "colored-rotating-square",
    "wireframe-boxes",
  ],
  examples: [
    "triangle",
    "square",
    "2d-sierpinski-gasket",
    "3d-sierpinski-gasket",
    "rotating-square",
    "drawing",
    "rotating-cube",
  ],
};

export default defineConfig({
  build: {
    sourcemap: true,
    polyfillModulePreload: false,
    rollupOptions: {
      input: {
        index: new URL("./index.html", import.meta.url).pathname,
        404: new URL("./404.html", import.meta.url).pathname,
        ...generatePageUrls(),
      },
    },
  },
  plugins: [ViteEjsPlugin({ pages }), glsl({ compress: true })],
});

function generatePageUrls() {
  const urls = {};
  for (const folder in pages) {
    for (const page of pages[folder]) {
      urls[`${folder}/${page}`] = new URL(`./${folder}/${page}/index.html`, import.meta.url).pathname;
    }
  }
  return urls;
}
