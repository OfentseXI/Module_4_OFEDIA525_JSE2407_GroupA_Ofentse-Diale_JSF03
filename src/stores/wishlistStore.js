import { createStore } from 'vuex';

export default createStore({
  state: {
    wishlist: [],
  },
  getters: {
    wishlistCount: (state) => state.wishlist.length,
  },
  mutations: {
    setWishlist(state, products) {
      state.wishlist = products;
    },
    addToWishlist(state, product) {
      state.wishlist.push(product);
    },
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter((p) => p.id !== productId);
    },
    clearWishlist(state) {
      state.wishlist = [];
    },
  },
  actions: {
    loadWishlist({ commit }) {
      const storedWishlist = JSON.parse(localStorage.getItem('favorites')) || [];
      commit('setWishlist', storedWishlist);
    },
    addToWishlist({ commit }, product) {
      commit('addToWishlist', product);
      localStorage.setItem('favorites', JSON.stringify(state.wishlist));
    },
    removeFromWishlist({ commit }, productId) {
      commit('removeFromWishlist', productId);
      localStorage.setItem('favorites', JSON.stringify(state.wishlist));
    },
    clearWishlist({ commit }) {
      commit('clearWishlist');
      localStorage.removeItem('favorites');
    },
  },
});
