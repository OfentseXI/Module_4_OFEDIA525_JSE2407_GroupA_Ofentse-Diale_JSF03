<template>
  <div class="m-10 relative p-4 bg-white shadow-md rounded-lg overflow-hidden">
    <!-- Table displaying cart items -->
    <table class="min-w-full divide-y divide-gray-200 my-4">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
          <th class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Loop through cart items and display each product -->
        <tr v-for="product in cartItems" :key="product.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ product.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <img :src="product.image" class="rounded w-20 h-20 object-contain" :alt="product.title" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">{{ product.title }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <!-- Increment and decrement product quantity -->
            <i @click="incrementQ(product)" class="bi bi-caret-up cursor-pointer text-blue-500"></i>
            <span class="mx-2">{{ product.quantity }}</span>
            <i @click="decrementQ(product)" class="bi bi-caret-down cursor-pointer text-blue-500"></i>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">${{ product.price }}</td>
          <td class="px-6 py-4 whitespace-nowrap">${{ product.price * product.quantity }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <!-- Remove product from cart -->
            <i @click="removeFromCart(product)" class="bi bi-cart-x cursor-pointer text-red-500"></i>
          </td>
        </tr>
        <!-- Display total row if there are items in the cart -->
        <tr v-if="cartItems.length > 0">
          <th colSpan="3" class="px-6 py-4 text-center text-gray-700">Total</th>
          <td colSpan="3" class="px-6 py-4 text-center">
            <span class="bg-red-500 text-white rounded-full px-3 py-1">
              ${{ total }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Display clear cart and checkout buttons if there are items in the cart -->
    <div v-if="cartItems.length > 0" class="flex flex-row justify-between items-center gap-4">
      <button 
        @click="clearCart" 
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        CLEAR CART
      </button>
      <button 
        class="bg-blue-800 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:ring-opacity-75 transition duration-200">
        CHECK OUT
      </button>
    </div>
    <!-- Message when cart is empty -->
    <p v-else class="text-gray-500 my-2 text-center">Your cart is empty.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';

/**
 * Reactive array to hold the cart items.
 * Loaded from localStorage on component mount.
 */
const cartItems = ref([]);

/**
 * Load cart items from localStorage when the component is mounted.
 */
onMounted(() => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart);
  }
});

/**
 * Increment the quantity of a product in the cart.
 * @param {Object} product - The product to increment the quantity for.
 */
const incrementQ = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
    Swal.fire('Success', 'Item quantity has been increased', 'success');
  }
};

/**
 * Decrement the quantity of a product in the cart.
 * If the quantity is more than 1, it will be decreased by 1.
 * @param {Object} product - The product to decrement the quantity for.
 */
const decrementQ = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1 && cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
    Swal.fire('Success', 'Item quantity has been decreased', 'success');
  }
};

/**
 * Remove a product from the cart.
 * @param {Object} product - The product to remove from the cart.
 */
const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
    Swal.fire('Success', 'Item has been removed from the cart', 'success');
  }
};

/**
 * Clear all items from the cart.
 */
const clearCart = () => {
  cartItems.value = [];
  localStorage.removeItem('cart');
  Swal.fire('Success', 'Cart has been cleared', 'success');
};

/**
 * Computed property to calculate the total price of all items in the cart.
 * @returns {Number} - The total price of all cart items.
 */
const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
