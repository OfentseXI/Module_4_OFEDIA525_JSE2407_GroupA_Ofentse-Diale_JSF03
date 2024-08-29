<template>
  <header class="sticky z-50 top-0 w-full bg-blue-800 p-4 lg:mb-4 text-blue-300 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <a href="/"><img src='../assets/favicon.ico' alt='logo'>
        <div class="text-lg font-bold">
          myCart
        </div> 
      </a>  
      <div class="hidden md:flex">
        <a href="/compare" class="mr-4 hover:underline">compare</a>
        <a href="/wishlist" class="mr-4 hover:underline">
          wishlist <span v-if="isAuthenticated">({{ wishlistCount }})</span>
        </a>
        <a href="/cart" class="mr-4 hover:underline">
          cart <span v-if="isAuthenticated">({{ cartCount }})</span>
        </a>
        <a v-if="!isAuthenticated" href="/login" class="mr-4 hover:underline">Login</a>
        <a v-else @click="logout" class="mr-4 hover:underline cursor-pointer">Logout</a>
      </div>
      <button @click="toggleMenu" class="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
    <div v-if="open" class="md:hidden mt-4">
      <a href="/wishlist" class="block p-2">wishlist <span v-if="isAuthenticated">({{ wishlistCount }})</span></a>
      <a href="/cart" class="block p-2">cart <span v-if="isAuthenticated">({{ cartCount }})</span></a>
      <a v-if="!isAuthenticated" href="/login" class="block p-2">Login</a>
      <a v-else @click="logout" class="block p-2 cursor-pointer">Logout</a>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Navbar',
  setup() {
    const open = ref(false);
    const isAuthenticated = ref(!!localStorage.getItem('jwt'));

    const wishlistCount = ref(0);
    const cartCount = ref(0);

    const loadCounts = () => {
      const storedWishlist = JSON.parse(localStorage.getItem('favorites')) || [];
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

      wishlistCount.value = storedWishlist.length;
      cartCount.value = storedCart.length;
    };

    const updateCounts = (event) => {
      wishlistCount.value = event.detail.wishlistCount;
      cartCount.value = event.detail.cartCount;
    };

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const logout = () => {
      localStorage.removeItem('jwt');
      isAuthenticated.value = false;
      window.location.href = '/';
    };

    onMounted(() => {
      loadCounts();
      window.addEventListener('updateCounts', updateCounts);
    });

    onUnmounted(() => {
      window.removeEventListener('updateCounts', updateCounts);
    });

    return {
      open,
      isAuthenticated,
      wishlistCount,
      cartCount,
      toggleMenu,
      logout,
    };
  },
};
</script>
