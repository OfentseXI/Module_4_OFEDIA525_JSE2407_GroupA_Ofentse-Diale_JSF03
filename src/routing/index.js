import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue'; // Path to Home.vue
import ProductDetail from '../pages/ProductDetails.vue';
 // Path to ProductDetail.vue

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default routing;


