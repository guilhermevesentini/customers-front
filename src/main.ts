<<<<<<< HEAD
import { registerPlugins } from "@/core/plugins";
import App from "./App.vue";
import { createApp } from "vue";
import "unfonts.css";
import { vMaska } from "maska";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

registerPlugins(app);

app.component("VueDatePicker", VueDatePicker);

app.directive("maska", vMaska);
app.mount("#app");
=======
import { registerPlugins } from '@/core/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import 'unfonts.css'
import { vMaska } from 'maska'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

registerPlugins(app)

app.component('VueDatePicker', VueDatePicker);

app.directive('maska', vMaska)
app.mount('#app')
>>>>>>> d1b1fd48a20475537a0cd78cf6d3c747f9b8ac43
