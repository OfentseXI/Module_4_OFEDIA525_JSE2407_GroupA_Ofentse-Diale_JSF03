<template>
    <div class="m-10 relative p-4 bg-white shadow-md rounded-lg overflow-hidden">
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
          <tr v-for="product in cartItems" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ product.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="product.image" class="rounded w-15 h-15 object-cover" :alt="product.title" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <i @click="incrementQ(product)" class="bi bi-caret-up cursor-pointer text-blue-500"></i>
              <span class="mx-2">{{ product.quantity }}</span>
              <i @click="decrementQ(product)" class="bi bi-caret-down cursor-pointer text-blue-500"></i>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">${{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap">${{ product.price * product.quantity }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <i @click="removeFromCart(product)" class="bi bi-cart-x cursor-pointer text-red-500"></i>
            </td>
          </tr>
          <tr>
            <th colSpan="3" class="px-6 py-4 text-center text-gray-700">Total</th>
            <td colSpan="3" class="px-6 py-4 text-center">
              <span class="bg-red-500 text-white rounded-full px-3 py-1">
                ${{ cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  
  const cartItems = ref([]);

  onMounted(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      cartItems.value = JSON.parse(storedCart);
    }
  });
  
  // Computed properties to access store state and methods
  const cartItems = computed(() => store.cartItems);
  const incrementQ = store.incrementQ;
  const decrementQ = store.decrementQ;
  const removeFromCart = store.removeFromCart;
  </script>
  
  <style scoped>
  </style>
  