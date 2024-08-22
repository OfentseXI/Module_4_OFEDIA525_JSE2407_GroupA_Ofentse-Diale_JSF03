import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      authToken: localStorage.getItem("authToken") || null,
    };
  },
  mutations: {
    setAuth(state, token) {
      state.authToken = token;
      if (token) {
        localStorage.setItem("authToken", token);
      } else {
        localStorage.removeItem("authToken");
      }
    },
  },
  actions: {
    login({ commit }, token) {
      commit("setAuth", token);
    },
    logout({ commit }) {
      commit("setAuth", null);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
  },
});