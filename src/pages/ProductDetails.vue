<template>
    <div>
      <!-- Display a loading spinner if data is still being fetched -->
      <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
        <div class="text-center py-8 bg-white p-4 rounded shadow-md">
          <svg class="w-16 h-16 mx-auto animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"></path>
          </svg>
          <p class="mt-4">Loading...</p>
        </div>
      </div>
  
      <!-- Display the product details once loading is complete -->
      <div v-else class="container flex justify-center items-center p-6 min-h-screen m-auto">
        <div v-if="product" class="bg-white p-6 rounded shadow-lg mt-5">
          <!-- Button to go back to the previous page -->
          <button @click="goBack" class="fixed bg-orange-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-75 transition duration-200">
            Go Back
          </button>
          <!-- Product image -->
          <div class="flex justify-center items-center mt-5">
            <img :src="product.image" :alt="product.title" class="w-400px h-64 object-cover mb-4 rounded" />
          </div>
          <!-- Product title, price, category, and description -->
          <h3 class="text-2xl font-bold mb-2">{{ product.title }}</h3>
          <p class="text-gray-700 mb-2">${{ product.price }}</p>
          <p class="text-gray-500 mb-2">Category: {{ product.category }}</p>
          <p class="text-gray-700 mb-2">
            Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </p>
          <p class="text-gray-700">{{ product.description }}</p>
          <!-- Buttons to toggle favorite status and add product to cart -->
          <div class="flex justify-evenly items-center mt-5">
            <!-- Toggle favorite status button -->
            <button @click="toggleFavorite(product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-red-500': isFavorite(product.id), 'text-gray-300': !isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <!-- Button to add product to cart (no functionality in this snippet) -->
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
  
  export default {
    name: 'ProductDetail',
    props: {
      params: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      // Define reactive state variables
      const product = ref(null);
      const loading = ref(true);
      const favorites = ref([]);
  
      // Function to fetch product data
      const fetchProduct = async () => {
        loading.value = true;
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${props.params.id}`);
          const data = await response.json();
          product.value = data;
        } catch (error) {
          console.error("Error fetching product data:", error);
        } finally {
          loading.value = false;
        }
      };
  
      // Function to load favorites from localStorage
      const loadFavorites = () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          favorites.value = JSON.parse(storedFavorites);
        }
      };
  
      // Function to navigate back in history
      const goBack = () => {
        window.history.back();
      };
  
      // Function to toggle a product's favorite status
      const toggleFavorite = (productId) => {
        const index = favorites.value.indexOf(productId);
        if (index > -1) {
          favorites.value.splice(index, 1); // Remove if already favorited
        } else {
          favorites.value.push(productId); // Add if not favorited
        }
        localStorage.setItem('favorites', JSON.stringify(favorites.value));
      };
  
      // Function to check if a product is in favorites
      const isFavorite = (productId) => {
        return favorites.value.includes(productId);
      };
  
      // Load data when the component is mounted
      onMounted(() => {
        fetchProduct();
        loadFavorites();
      });
  
      return {
        product,
        loading,
        toggleFavorite,
        goBack,
        isFavorite
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles here if needed */
  </style>
  