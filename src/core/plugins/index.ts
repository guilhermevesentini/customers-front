/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
<<<<<<< HEAD
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia);
=======
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
}
