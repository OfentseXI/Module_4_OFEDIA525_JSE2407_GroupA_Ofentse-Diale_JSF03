<template>
    <div class="container mx-auto p-8">
        <h2 class="text-2xl font-bold mb-6">Product Comparison</h2>
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="py-2 px-4">Image</th>
              <th class="py-2 px-4">Description</th>
              <th class="py-2 px-4">Rating</th>
              <th class="py-2 px-4">Price</th>
              <th class="py-2 px-4">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in compareList" :key="product.id">
              <td class="py-4 px-6 border-b border-gray-200">
                <img :src="product.image" :alt="product.title" class="w-24 h-24 object-cover rounded" />
              </td>
              <td class="py-4 px-6 border-b border-gray-200">
                {{ product.title }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </td>
              <td class="py-4 px-6 border-b border-gray-200">
                ${{ product.price }}
              </td>
              <td class="py-4 px-6 border-b border-gray-200">
                {{ product.category }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>  

<script>

</script>