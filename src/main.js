import { createApp } from 'vue';
import App from './App.vue';
import routing from './router';
import { createPinia } from 'pinia'; 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/**
 * Initializes the Pinia store and adds the persisted state plugin.
 */
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/**
 * Creates the Vue application instance, attaches the Pinia store, 
 * the router, and mounts the app to the DOM element with the ID 'app'.
 */
const app = createApp(App);

app.use(pinia);
app.use(routing);
app.mount('#app');
