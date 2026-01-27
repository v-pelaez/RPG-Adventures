import { createApp } from 'vue'
import './style.css'
import router from './router/index.ts'
import App from './App.vue'
import { definePreset } from '@primeuix/themes';
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/material'
import Carousel from 'primevue/carousel'
import { i18n } from './plugins/i18n.ts'

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{violet.50}',
            100: '{violet.100}',
            200: '{violet.200}',
            300: '{violet.300}',
            400: '{violet.400}',
            500: '{violet.500}',
            600: '{violet.600}',
            700: '{violet.700}',
            800: '{violet.800}',
            900: '{violet.900}',
            950: '{violet.950}'
        }
    }
});


const app = createApp(App)
app.use(router)
app.use(PrimeVue, { 
  theme: { 
    preset: MyPreset 
  } 
})
app.component('Carousel', Carousel);
app.use(i18n)
app.mount('#app')
