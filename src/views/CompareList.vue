<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-bold mb-6">Product Comparison</h2>
    
    <!-- Product Comparison Table -->
    <table class="min-w-full bg-white" v-if="compareList.length > 0">
      <thead class="bg-gray-800 text-white font-bold rounded-lg">
        <tr>
          <th class="py-2 px-4">Image</th>
          <th class="py-2 px-4">Title</th>
          <th class="py-2 px-4">Rating</th>
          <th class="py-2 px-4">Price</th>
          <th class="py-2 px-4">Category</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterate over the compareList array to display each product -->
        <tr v-for="(product, index) in compareList" :key="product.id">
          <td class="py-4 px-6 border-b border-gray-200">
            <img :src="product.image" :alt="product.title" class="w-24 h-24 object-contain rounded" />
          </td>
          <td class="py-4 px-6 border-b border-gray-200 font-bold">
            {{ product.title }}
          </td>
          <td class="py-4 px-6 border-b border-gray-200">
            {{ product.rating.rate }} ({{ product.rating.count }} reviews)
          </td>
          <td class="py-4 px-6 border-b border-gray-200 font-bold text-gray-600">
            ${{ product.price }}
          </td>
          <td class="py-4 px-6 border-b border-gray-200">
            {{ product.category }}
          </td>
          <td class="py-4 px-6 border-b border-gray-200 items-center">
            <!-- Remove button to remove the product from comparison list -->
            <button 
              @click="removeFromCompareList(index)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded my-4">
              Remove
            </button>
            <!-- Add to cart button -->
            <button 
              @click="addToCart(product)"
              class="bg-blue-900 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded my-4 mx-2">
              Add to cart
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Clear Compare List Button -->
    <button 
      v-if="compareList.length > 0"
      @click="clearCompareList"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 my-4">
      Clear Compare List
    </button>

    <!-- Message displayed when the comparison list is empty -->
    <p v-else class="text-gray-500 my-2">No products to compare. Please add products to the comparison list.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default {
  name: 'CompareList',
  setup() {
    // Reactive reference for the compare list
    const compareList = ref([]);
    // Reactive reference for the shopping cart
    const cart = ref([]);

    /**
     * Loads the compare list and cart items from localStorage when the component is mounted.
     */
    onMounted(() => {
      // Load compare list from localStorage
      const storedCompareList = localStorage.getItem('compareList');
      if (storedCompareList) {
        compareList.value = JSON.parse(storedCompareList);
      }

      // Load cart items from localStorage
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        cart.value = JSON.parse(storedCart);
      }
    });

    /**
     * Removes a product from the comparison list.
     * @param {Number} index - The index of the product to remove from the compareList.
     */
    const removeFromCompareList = (index) => {
      // Remove product from the list based on the index
      compareList.value.splice(index, 1);
      localStorage.setItem('compareList', JSON.stringify(compareList.value));
      
      // Show success notification
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'The product has been removed from the comparison list.',
        timer: 1500,
        showConfirmButton: false,
      });
    };

    /**
     * Clears all products from the comparison list.
     */
    const clearCompareList = () => {
      compareList.value = [];
      localStorage.removeItem('compareList');

      // Show success notification
      Swal.fire({
        icon: 'success',
        title: 'Cleared!',
        text: 'The comparison list has been cleared.',
        timer: 1500,
        showConfirmButton: false,
      });
    };

    /**
     * Adds a product to the shopping cart.
     * @param {Object} product - The product object to add to the cart.
     */
    const addToCart = (product) => {
      const existingProduct = cart.value.find(item => item.id === product.id);

      if (existingProduct) {
        // Increment quantity if the product already exists in the cart
        existingProduct.quantity += 1;
      } else {
        // Add new product to the cart with quantity set to 1
        cart.value.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart.value));

      // Show success notification
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: 'The product has been added to your cart.',
        timer: 1500,
        showConfirmButton: false,
      });
    };

    return {
      compareList,
      removeFromCompareList,
      clearCompareList,
      addToCart,
    };
  },
};
</script>
