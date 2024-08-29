<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="product in products" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-102 duration-300 flex flex-col h-full">
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
          <button @click="toggleFavorite(product.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="{'text-gray-300': !isFavorite(product.id), 'text-red-500': isFavorite(product.id)}" class="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <button 
            @click="addToCart(product)"
            class="bg-blue-900 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
            Add To Cart
          </button>
        </div> 
        <button 
            @click="addToCompare(product)"
            class="bg-blue-900 hover:bg-blue-300 text-white mt-6 w-[80%] mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200 text-center">
            Compare
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useShoppingStore } from '../stores/stores';
import Swal from 'sweetalert2';

export default {
  name: 'ProductGrid',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    // Initialize reactive references
    const favorites = ref([]);
    const cart = ref([]);
    const compareList = ref([]);

    // Lifecycle hook to load data from localStorage when component is mounted
    onMounted(() => {
      // Load favorites from localStorage
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites);
      }

      // Load cart from localStorage
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cart.value = JSON.parse(storedCart);
      }

      // Load compare list from localStorage
      const storedCompareList = localStorage.getItem('compareList');
      if (storedCompareList) {
        compareList.value = JSON.parse(storedCompareList);
      }
    });

    /**
     * Toggle a product's favorite status and update the wishlist count
     * @param {number} productId - The ID of the product to toggle
     */
     const toggleFavorite = (productId) => {
      const store = useShoppingStore();
      if (!store.isLoggedIn) {
        Swal.fire({
          icon: 'info',
          title: 'Please Log In',
          text: 'You need to log in to add items to your wishlist.',
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      const index = favorites.value.indexOf(productId);
      if (index > -1) {
        favorites.value.splice(index, 1);
      } else {
        favorites.value.push(productId);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
      
      // Update wishlist count
      updateCounts();
    };

    /**
     * Check if a product is in the favorites list
     * @param {number} productId - The ID of the product to check
     * @returns {boolean} True if the product is a favorite, false otherwise
     */
    const isFavorite = (productId) => {
      return favorites.value.includes(productId);
    };

    /**
     * Add a product to the cart or increment its quantity if already present
     * @param {Object} product - The product to add to the cart
     */
     const addToCart = (product) => {
        const store = useShoppingStore();
        if (!store.isLoggedIn) {
          Swal.fire({
            icon: 'info',
            title: 'Please Log In',
            text: 'You need to log in to add items to your cart.',
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }

        const index = cart.value.findIndex(item => item.id === product.id);
        if (index === -1) {
          cart.value.push({ ...product, quantity: 1 });
          store.showNotification('success', 'Your item has been added to the cart');
        } else {
          cart.value[index].quantity += 1;
          store.showNotification('success', 'Your item has been updated');
        }

        localStorage.setItem('cart', JSON.stringify(cart.value));
        
        // Update cart count
        updateCounts();
      };

    /**
     * Add a product to the compare list if not already present, and if the list is below the limit of 4 items
     * @param {Object} product - The product to add to the compare list
     */
    const addToCompare = (product) => {
      const store = useShoppingStore();
      if (!store.isLoggedIn) {
        Swal.fire({
          icon: 'info',
          title: 'Please Log In',
          text: 'You need to log in to add items to your comparison list.',
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }
      if (compareList.value.length >= 4) {
        Swal.fire({
          icon: 'warning',
          title: 'Limit Reached',
          text: 'You can only compare up to 4 products.',
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      const index = compareList.value.findIndex(item => item.id === product.id);
      if (index === -1) {
        compareList.value.push(product);
        localStorage.setItem('compareList', JSON.stringify(compareList.value));
        
        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Added to Compare List!',
          text: 'The product has been added to your comparison list.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Already in List',
          text: 'This product is already in your comparison list.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    };

    /**
     * Update the wishlist and cart counts
     */
    const updateCounts = () => {
      const wishlistCount = favorites.value.length;
      const cartCount = cart.value.reduce((total, item) => total + item.quantity, 0);

      // Dispatch a custom event to update the counts in the Navbar
      window.dispatchEvent(new CustomEvent('updateCounts', {
        detail: { wishlistCount, cartCount }
      }));
    };

    // Return the methods to be used in the template
    return {
      toggleFavorite,
      isFavorite,
      addToCart,
      addToCompare
    };
  }
};
</script>