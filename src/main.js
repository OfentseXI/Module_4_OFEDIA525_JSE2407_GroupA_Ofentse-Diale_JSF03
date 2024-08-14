import { createApp } from 'vue';
import App from './App.vue';
import routing from './router';
import { createPinia } from 'pinia'; 
import 'sweetalert2/dist/sweetalert2.min.css'

createApp(App)
    .use(routing)
    .mount('#app')
    .use(createPinia())
