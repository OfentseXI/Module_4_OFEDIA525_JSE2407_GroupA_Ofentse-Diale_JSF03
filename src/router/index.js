import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductDetail from '../views/ProductDetails.vue';
import Wishlist from '../views/Wishlist.vue';
import Cart from '../views/Cart.vue';
import CompareList from '../views/CompareList.vue';
import store from '../stores/loginStore'


const routes = [
  { path: '/', name:'home', component: Home },
  { path: '/login', name:'login', component: Login },
  { path: '/product/:id', name:'product', component: ProductDetail, props: true, meta: { requiresAuth: true } },
  { path: '/wishlist', name:'wishlist', component: Wishlist, meta: { requiresAuth: true }},
  { path: '/cart', name:'cart', component: Cart, meta: { requiresAuth: true }},
  { path: '/compare', name:'compare', component: CompareList, meta: { requiresAuth: true }}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // Updated to use a static base URL
  routes
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }, 
    });
  } else {
    next();
  }
});

export default router;

