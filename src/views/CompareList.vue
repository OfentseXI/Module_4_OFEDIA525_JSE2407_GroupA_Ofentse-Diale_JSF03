<template>
    <div class="container mx-auto p-8">
        <h2 class="text-2xl font-bold mb-6">Product Comparison</h2>
        
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
            <tr v-for="product in compareList" :key="product.id">
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
                    <button 
                        @click="removeFromCompareList(index)"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded my-4">
                        Remove
                    </button>
                    <button 
                        @click="removeFromCompareList(index)"
                        class="bg-blue-900 hover:bg-blue-300 text-white font-bold py-1 px-2 rounded my-4">
                        Add to cart
                    </button>
                </td>
              </tr>
          </tbody>
        </table>
        <button 
            v-if="compareList.length > 0"
            @click="clearCompareList"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">
            Clear Compare List
        </button>
        <p v-else class="text-gray-500 my-2">No products to compare. Please add products to the comparison list.</p>
      </div>
      <button></button>
</template>  

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CompareList',
  setup() {
    const compareList = ref([]);

    onMounted(() => {
      const storedCompareList = localStorage.getItem('compareList');
      if (storedCompareList) {
        compareList.value = JSON.parse(storedCompareList);
      }
    });

    const removeFromCompareList = (index) => {
      compareList.value.splice(index, 1);
      localStorage.setItem('compareList', JSON.stringify(compareList.value));
    };

    const clearCompareList = () => {
      compareList.value = [];
      localStorage.removeItem('compareList');
    };


    return {
      compareList,
      removeFromCompareList,
      clearCompareList
    };
  }
};
</script>