<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in filteredProducts" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
          <img :src="product.image" :alt="product.title" class="w-400px h-48 object-cover mb-5 rounded" />
        </router-link>
        <div class="card-content p-4 flex flex-col flex-grow">
          <!-- Title -->
          <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
          <!-- Price -->
          <p class="text-gray-700 mb-2">${{ product.price }}</p>
          <!-- Category -->
          <p class="text-gray-500">{{ product.category }}</p>
          <!-- Rating and Reviews -->
          <p class="text-gray-700 mb-4">
            Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </p>
          <!-- Actions: Toggle favorite and Add to Cart buttons -->
          <div class="mt-auto flex justify-evenly items-center">
            <!-- Toggle favorite status button -->
            <button @click="toggleFavorite(product.id)" class="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <!-- Button to add the product to the cart (no functionality in this snippet) -->
            <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200">
              Add To Cart +
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router'; // Import vue-router to handle routing
  
  export default {
    name: 'ProductList',
    props: {
      filteredProducts: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      // Initialize an array to hold favorite product IDs
      const favorites = ref([]);
  
      // Lifecycle function to run when the component mounts
      onMounted(() => {
        // Retrieve favorites from localStorage
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          // Parse and set the favorites array if data exists
          favorites.value = JSON.parse(storedFavorites);
        }
      });
  
      // Function to toggle a product's favorite status
      const toggleFavorite = (productId) => {
        const index = favorites.value.indexOf(productId);
        if (index > -1) {
          // Remove from favorites if already present
          favorites.value.splice(index, 1);
        } else {
          // Add to favorites if not present
          favorites.value.push(productId);
        }
        // Save the updated favorites list to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites.value));
      };
  
      // Function to check if a product is in favorites
      const isFavorite = (productId) => {
        return favorites.value.includes(productId); // Return true if the productId is in the favorites list
      };
  
      return {
        favorites,
        toggleFavorite,
        isFavorite
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles here if needed */
  </style>
  