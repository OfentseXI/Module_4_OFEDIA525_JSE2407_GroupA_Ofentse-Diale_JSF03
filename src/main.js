import { createApp } from 'vue';
import App from './App.vue';
import routing from './router';
import { createPinia } from 'pinia'; 
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(routing);
app.mount('#app');
