<template>
    <div class="my-4 p-4 w-full bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
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
                <tr v-for="item in data.getCartItems" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img :src="item.image" class="rounded w-15 h-15 object-cover" :alt="item.name" />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <i @click="data.incrementQ(item)" class="bi bi-caret-up cursor-pointer text-blue-500"></i>
                    <span class="mx-2">{{ item.quantity }}</span>
                    <i @click="data.decrementQ(item)" class="bi bi-caret-down cursor-pointer text-blue-500"></i>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">${{ item.price }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">${{ item.price * item.quantity }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <i @click="data.removeFromCart(item)" class="bi bi-cart-x cursor-pointer text-red-500"></i>
                  </td>
                </tr>
                <tr>
                  <th colSpan="3" class="px-6 py-4 text-center text-gray-700">Total</th>
                  <td colSpan="3" class="px-6 py-4 text-center">
                    <span class="bg-red-500 text-white rounded-full px-3 py-1">${{ data.cartItems.reduce((acc, item) => acc += item.price * item.quantity, 0) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  </template>
  

<script setup>
    import { useShoppingStore } from "../stores/stores"
    const data = useShoppingStore();
</script>


<style>
</style>