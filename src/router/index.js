import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductDetail from '../views/ProductDetails.vue';
import Wishlist from '../views/Wishlist.vue';
import Cart from '../views/Cart.vue';
import CompareList from '../views/CompareList.vue';

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: Home 
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login 
  },
  { 
    path: '/product/:id', 
    name: 'product', 
    component: ProductDetail, 
    props: true, 
  },
  { 
    path: '/wishlist', 
    name: 'wishlist', 
    component: Wishlist,
    meta: { requiresAuth: true }
  },
  { 
    path: '/cart', 
    name: 'cart', 
    component: Cart,
    meta: { requiresAuth: true }
  },
  { 
    path: '/compare', 
    name: 'compare', 
    component: CompareList,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  // Use a static base URL with HTML5 history mode
  history: createWebHistory('/'),  
  routes
});

/**
 * Global Navigation Guard
 * Redirects the user to the login page if they are not authenticated
 * and trying to access a route that requires authentication.
 * Stores the intended path for redirection after successful login.
 */
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('jwt'); // Check if the user is logged in

  // If the route requires authentication and the user is not logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    // Store the path the user was trying to access for later redirection
    localStorage.setItem('redirectPath', to.fullPath);
    next('/login'); // Redirect to the login page
  } else {
    next(); // Proceed to the route
  }
});

export default router;

