/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { pt } from "vuetify/locale";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VFileUpload,
  },
  defaults: {
    VBtn: {
      //rounded: true,
      density: "comfortable",
    },
  },
  theme: {
    defaultTheme: "light",
  },
  locale: {
    locale: "pt",
    fallback: "en",
    messages: { pt },
  },
});
