<template>
  <div class="container mx-auto p-6">
    <!-- Filters Section -->
    <div class="mt-4 flex justify-between items-center flex-wrap mb-4">
      <!-- Category Filter -->
      <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- Search Bar -->
      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
        />
        <button
          @click="searchProducts"
          class="bg-white text-black border border-l-0 p-2 rounded-r"
        >
          Search
        </button>
      </div>

      <!-- Sort By Price -->
      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>

    <!-- Loading Indicator -->
    <Loading v-if="loading" />

    <!-- Empty Wishlist Message -->
    <div v-if="favoriteProducts.length === 0" class="text-center text-gray-500">
      Your wishlist is empty.
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:border-black hover:-translate-y-1 hover:scale-102 duration-300 flex flex-col h-full"
      >
        <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
          <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
        </router-link>
        <div class="card-content p-4 flex flex-col flex-grow">
          <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
          <p class="text-gray-700 mb-2 font-bold">${{ product.price }}</p>
          <p class="text-blue-500">{{ product.category }}</p>
          <p class="text-gray-700 mb-4">
            Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </p>
          <div class="mt-auto flex justify-evenly items-center">
            <!-- Favorite Button -->
            <button @click="toggleFavorite(product.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                :class="{
                  'text-gray-300': !isFavorite(product.id),
                  'text-red-500': isFavorite(product.id),
                }"
                class="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
            <!-- Add to Cart Button -->
            <button
              @click="addToCart(product)"
              class="bg-blue-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Clear Favorites Button -->
    <div class="flex mb-4 my-4">
      <button
        @click="clearFavorites"
        v-if="favoriteProducts.length > 0"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200"
      >
        Clear Favorites
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../components/Loading.vue';

export default {
  name: 'Wishlist',
  components: {
    Loading,
  },
  setup() {
    const favoriteProducts = ref([]); // Holds the list of favorite products
    const categories = ref([]); // Holds the list of product categories
    const searchQuery = ref(''); // Holds the search query entered by the user
    const selectedCategory = ref(''); // Holds the selected category
    const sortOrder = ref(''); // Holds the selected sorting order
    const loading = ref(true); // Indicates if data is currently being loaded

    /**
     * Loads the favorite products from localStorage and fetches the product details.
     */
    const loadFavorites = async () => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        const favoriteIds = JSON.parse(storedFavorites);
        favoriteProducts.value = await fetchProductsByIds(favoriteIds);
      }
      loading.value = false;
    };

    /**
     * Fetches products by their IDs from the API.
     * @param {Array} ids - Array of product IDs to fetch.
     * @returns {Array} - Array of product objects.
     */
    const fetchProductsByIds = async (ids) => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const allProducts = response.data;
        return allProducts.filter(product => ids.includes(product.id));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
      }
    };

    /**
     * Fetches the product categories from the API.
     */
    const fetchCategories = async () => {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      categories.value = response.data;
    };

    /**
     * Triggers a search of the products based on the search query.
     */
    const searchProducts = () => {
      // This will trigger the computed property to recalculate
    };

    /**
     * Computed property that filters and sorts the products based on the selected category, sort order, and search query.
     */
    const filteredProducts = computed(() => {
      let prods = favoriteProducts.value;

      if (selectedCategory.value) {
        prods = prods.filter(product => product.category === selectedCategory.value);
      }
      if (sortOrder.value === 'asc') {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'default') {
        prods = prods.sort((a, b) => a.id - b.id);
      }

      if (searchQuery.value) {
        prods = prods.filter(product =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return prods;
    });

    /**
     * Toggles the favorite status of a product by adding or removing it from localStorage.
     * @param {Number} productId - The ID of the product to toggle.
     */
    const toggleFavorite = (productId) => {
      let favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
      if (favoriteIds.includes(productId)) {
        favoriteIds = favoriteIds.filter(id => id !== productId);
      } else {
        favoriteIds.push(productId);
      }
      localStorage.setItem('favorites', JSON.stringify(favoriteIds));
      loadFavorites();
    };

    /**
     * Checks if a product is in the user's favorites.
     * @param {Number} productId - The ID of the product to check.
     * @returns {Boolean} - True if the product is a favorite, false otherwise.
     */
    const isFavorite = (productId) => {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
      return favoriteIds.includes(productId);
    };

    /**
     * Adds a product to the shopping cart.
     * @param {Object} product - The product object to add to the cart.
     */
    const addToCart = (product) => {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cartItems.findIndex(item => item.id === product.id);
      if (index === -1) {
        cartItems.push({ ...product, quantity: 1 });
      } else {
        cartItems[index].quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    /**
     * Clears all favorite products from the user's wishlist and shows a confirmation message.
     */
    const clearFavorites = () => {
      favoriteProducts.value = [];
      localStorage.removeItem('favorites');

      Swal.fire({
        icon: 'success',
        title: 'Cleared!',
        text: 'Your wishlist has been cleared.',
        timer: 1500,
        showConfirmButton: false,
      });
    };

    onMounted(() => {
      loadFavorites();
      fetchCategories();
    });

    return {
      favoriteProducts,
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts,
      toggleFavorite,
      isFavorite,
      addToCart,
      clearFavorites,
    };
  },
};
</script>
