const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/ImgToWebp.ts"),
      name: "ImgToWebp",
      fileName: (format) => `img-to-webp.${format}.js`,
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    //   external: ["vue"],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       vue: "Vue",
    //     },
    //   },
    // },
  },
});