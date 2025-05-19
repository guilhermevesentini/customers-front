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
