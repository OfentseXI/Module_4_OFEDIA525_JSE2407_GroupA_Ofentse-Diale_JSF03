import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductDetail from '../views/ProductDetails.vue';
import Wishlist from '../views/Wishlist.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/product/:id', component: ProductDetail, props: true, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory('/'),  // Updated to use a static base URL
  routes
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('jwt');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    localStorage.setItem('redirectPath', to.fullPath);
    next('/login');
  } else {
    next();
  }
});

export default router;

