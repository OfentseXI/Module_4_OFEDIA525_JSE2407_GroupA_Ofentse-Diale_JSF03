<template>
  <nav class="fixed w-full bg-gray-400 p-4 text-gray-50 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Brand name -->
      <a class="text-lg font-bold flex items-center" href="#">
        <img class="w-8 mr-2" src="../assets/online-shop.png" alt="SwiftCart">
        SwiftCart
      </a>
      
      <!-- Navigation links for larger screens -->
      <div class="hidden md:flex">
        <a href="/" class="mr-4 hover:underline">Wishlist</a>
        <a href="./cart" class="mr-4 hover:underline">Cart</a>
        <a v-if="!isAuthenticated" href="/login" class="mr-4 hover:underline">Login</a>
        <a v-else @click="logout" class="mr-4 hover:underline cursor-pointer">Logout</a>
      </div>
      
      <!-- Menu toggle button for smaller screens -->
      <button @click="toggleMenu" class="md:hidden text-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
      </button>
    </div>
    
    <!-- Mobile menu for smaller screens -->
    <div v-if="open" class="md:hidden mt-4 bg-gray-300">
      <a href="/" class="block p-2 hover:bg-gray-200">Wishlist</a>
      <a href="/cart" class="block p-2 hover:bg-gray-200">Cart</a>
      <a v-if="!isAuthenticated" href="/login" class="block p-2 hover:bg-gray-200">Login</a>
      <a v-else @click="logout" class="block p-2 hover:bg-gray-400 cursor-pointer">Logout</a>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Navbar',

  setup() {
    const open = ref(false);

    // Computed property to determine if the user is authenticated based on JWT in localStorage
    const isAuthenticated = computed(() => !!localStorage.getItem('jwt'));

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const logout = () => {
      localStorage.removeItem('jwt'); // Clear the JWT token
      window.location.href = '/login'; // Redirect to login page
    };

    return {
      open,
      toggleMenu,
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
