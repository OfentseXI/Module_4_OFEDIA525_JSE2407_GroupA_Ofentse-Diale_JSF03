import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: [],
  }),
  getters: {
    wishlistCount: (state) => state.wishlist.length,
  },
  actions: {
    setWishlist(products) {
      this.wishlist = products;
    },
    addToWishlist(product) {
      this.wishlist.push(product);
      localStorage.setItem('favorites', JSON.stringify(this.wishlist));
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter((p) => p.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(this.wishlist));
    },
    clearWishlist() {
      this.wishlist = [];
      localStorage.removeItem('favorites');
    },
    loadWishlist() {
      const storedWishlist = JSON.parse(localStorage.getItem('favorites')) || [];
      this.setWishlist(storedWishlist);
    },
  },
});
