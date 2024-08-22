import { createStore } from "vuex";

export default createStore({
  /**
   * State: Holds the state of the authentication token.
   * - authToken: The token retrieved from localStorage, or null if not present.
   */
  state() {
    return {
      authToken: localStorage.getItem("authToken") || null,
    };
  },

  /**
   * Mutations: Synchronous functions that directly modify the state.
   * - setAuth: Updates the authToken in the state and localStorage.
   */
  mutations: {
    /**
     * Set the authentication token.
     * 
     * @param {Object} state - The current state of the store.
     * @param {string|null} token - The authentication token to set.
     */
    setAuth(state, token) {
      state.authToken = token;
      if (token) {
        localStorage.setItem("authToken", token);
      } else {
        localStorage.removeItem("authToken");
      }
    },
  },

  /**
   * Actions: Asynchronous functions that can commit mutations.
   * - login: Commits the setAuth mutation to save the token.
   * - logout: Commits the setAuth mutation to remove the token.
   */
  actions: {
    /**
     * Login action that sets the authentication token.
     * 
     * @param {Function} commit - Vuex commit function to trigger mutations.
     * @param {string} token - The authentication token.
     */
    login({ commit }, token) {
      commit("setAuth", token);
    },

    /**
     * Logout action that removes the authentication token.
     * 
     * @param {Function} commit - Vuex commit function to trigger mutations.
     */
    logout({ commit }) {
      commit("setAuth", null);
    },
  },

  /**
   * Getters: Functions to access and manipulate state data.
   * - isLoggedIn: Returns a boolean indicating if the user is logged in.
   */
  getters: {
    /**
     * Check if the user is logged in.
     * 
     * @param {Object} state - The current state of the store.
     * @returns {boolean} True if authToken is set, false otherwise.
     */
    isLoggedIn: (state) => !!state.authToken,
  },
});
