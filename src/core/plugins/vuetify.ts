/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
<<<<<<< HEAD
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VFileUpload } from "vuetify/labs/VFileUpload";
=======
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VFileUpload,
  },
  defaults: {
    VBtn: {
      //rounded: true,
<<<<<<< HEAD
      density: "comfortable",
    },
  },
  theme: {
    defaultTheme: "light",
  },
});
=======
      density: 'comfortable',
    },
  },
  theme: {
    defaultTheme: 'light',
  },
})
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
