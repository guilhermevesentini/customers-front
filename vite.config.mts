// Plugins
<<<<<<< HEAD
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts-next";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
=======
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
<<<<<<< HEAD
      dts: "src/typed-router.d.ts",
=======
      dts: 'src/typed-router.d.ts',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    }),
    Layouts(),
    AutoImport({
      imports: [
<<<<<<< HEAD
        "vue",
        VueRouterAutoImports,
        {
          pinia: ["defineStore", "storeToRefs"],
        },
      ],
      dts: "src/auto-imports.d.ts",
=======
        'vue',
        VueRouterAutoImports,
        {
          'pinia': ['defineStore', 'storeToRefs'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
<<<<<<< HEAD
      dts: "src/components.d.ts",
=======
      dts: 'src/components.d.ts',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
<<<<<<< HEAD
        configFile: "src/shared/styles/settings.scss",
=======
        configFile: 'src/shared/styles/settings.scss',
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
      },
    }),
    Fonts({
      fontsource: {
        families: [
          {
<<<<<<< HEAD
            name: "Roboto",
            weights: [100, 300, 400, 500, 700, 900],
            styles: ["normal", "italic"],
=======
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
<<<<<<< HEAD
      "vuetify",
      "vue-router",
      "unplugin-vue-router/runtime",
      "unplugin-vue-router/data-loaders",
      "unplugin-vue-router/data-loaders/basic",
    ],
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
=======
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
<<<<<<< HEAD
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
=======
        api: 'modern-compiler',
      },
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
